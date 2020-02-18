/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
async function loadTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
        response = await fetch(url);
    if (response.ok) {
        let cities = await response.json();

        cities.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }

            return 0;
        });

        return Promise.resolve(cities);
    } else {
        return Promise.reject('Не удалось загрузить города');
    }
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let regepx = new RegExp(chunk, 'i');

    return regepx.test(full);
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let fragment = document.createDocumentFragment(),
    retryButton = document.createElement('button'),
    towns;

retryButton.textContent = 'Повторить';
homeworkContainer.appendChild(retryButton);

(async function getTowns() {
    try {
        towns = await loadTowns();
        filterBlock.style.display = 'block';
        loadingBlock.style.display = 'none';
    } catch (error) {
        loadingBlock.innerHTML = `${error}`;
        retryButton.style.display = 'block';
    }
})();

retryButton.addEventListener('click', async () => {
    filterBlock.style.display = 'none';
    loadingBlock.style.display = 'block';
    loadingBlock.innerHTML = 'Загрузка...';
    retryButton.style.display = 'none';

    await getTowns();
});

filterInput.addEventListener('keyup', () => {
    // это обработчик нажатия кливиш в текстовом поле
    let value = filterInput.value;

    filterResult.innerHTML = '';

    if (value !== '') {
        towns.forEach(town => {
            if (isMatching(town.name, value)) {
                let li = document.createElement('li');

                li.textContent = town.name;
                fragment.appendChild(li);
            }
        });
        filterResult.appendChild(fragment);
    }

});

export {
    loadTowns,
    isMatching
};
/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    getCookie();
});

addButton.addEventListener('click', function() {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    getCookie();
});

function getCookie() {
    listTable.innerHTML = '';

    if (document.cookie) {
        let array = document.cookie.split('; ');

        array.forEach(function(elem) {
            return listCookie(elem.split('='));
        });
    }
}

function addCookie(cookie) {
    let tr = document.createElement('tr'),
        tdName = document.createElement('td'),
        tdValue = document.createElement('td'),
        tdBtn = document.createElement('td'),
        removeBtn = document.createElement('button'),
        fragment = document.createDocumentFragment(),
        [name, value] = cookie;

    tdName.innerText = name;
    tdValue.innerText = value;
    removeBtn.innerText = 'Удалить';

    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tdBtn.appendChild(removeBtn);
    tr.appendChild(tdBtn);
    fragment.appendChild(tr);
    listTable.appendChild(fragment);

    removeBtn.addEventListener('click', function (event) {
        removeCookie(event.target);
    });
}

function removeCookie(target) {
    let tr = target.closest('tr');
    let name = tr.querySelector('td:first-child').textContent;
    let value = tr.querySelector('td:nth-child(2)').textContent;

    tr.remove();
    document.cookie = `${name}=${value};expires='Thu, 01 Jan 1970 00:00:01 GMT'`;
}

function isMatching(full, chunk) {
    let regepx = new RegExp(chunk, 'i');

    return regepx.test(full);
}

function listCookie(cookie) {
    if (filterNameInput.value) {
        for (const key of cookie) {
            if (isMatching(key, filterNameInput.value) || isMatching(cookie[key], filterNameInput.value)) {
                addCookie(cookie);

                return;
            }
        }
    } else {
        addCookie(cookie);
    }
}
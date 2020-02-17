/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let resultArray = [];

    for (let i = 0; i < array.length; i++) {
        resultArray[i] = fn(array[i], i, array);
    }

    return resultArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = initial ? 0 : 1,
        previousValue = initial ? initial : array[0];

    for (i; i < array.length; i++) {
        previousValue = fn(previousValue, array[i], i, array);
    }

    return previousValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let resultArray = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            resultArray.push(key.toUpperCase());
        }
    }

    return resultArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let resultArray = [];

    from = (from < 0) ? Math.max(array.length + from, 0) : Math.min(array.length, from);
    to = (to < 0) ? Math.max(array.length + to, 0) : Math.min(array.length, to);

    for (let i = from; i < to; i++) {
        resultArray.push(array[i]);
    }

    return resultArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(obj, property, value) {
            obj[property] = value ** 2;

            return obj;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
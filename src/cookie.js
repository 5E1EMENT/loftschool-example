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

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

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

let cookie = document.cookie;

let cookieObj = cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');

    prev[name] = value;

    return prev;
}, {});

filterNameInput.addEventListener('keyup', function() {
    //Предварительно очищаем таблицу от всех куки
    listTable.innerHTML = '';

    let cookieValue = addValueInput.value.trim();

    //Обновляем переменную куки при каждом нажатии
    let cookies = document.cookie;
    let cookieObj = cookies.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    //Считываем значение инпута
    var inputValue = filterNameInput.value;
    console.log(cookieObj);

    //Проходимся циклом по всем куки в объекте
    for(var cookie in cookieObj) {

        //Для убдобства присваиваем куки новую переменную
        var cookieName = cookie;

        console.log(isMatching(cookieName, inputValue));

        //Если совпадает имя куки с символом в поиске
        if(isMatching(cookieName, inputValue) ) {

            //То создаем для каждого совпавшего варианта tr в таблице
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdValue = document.createElement('td');
            let tdDelete = document.createElement('td');
            tdName.textContent = cookieName;
            tdName.classList.add('cookieName');
            tdValue.textContent = cookieObj[cookie];
            tdValue.classList.add('cookieValue');
            tdDelete.innerHTML = '<button class="delete-btn">Удалить куку</button>';
            tdName.setAttribute('data-name', cookieName);


            //Если имя добавляемой куки уже есть в таблице
            if (cookieName == cookie) {

            }
            tr.appendChild(tdName);
            tr.appendChild(tdValue);
            tr.appendChild(tdDelete);
            listTable.appendChild(tr);
        }

    }
    //А если очищаем поиск, то повторно создаем таблицу
    if (inputValue == '') {
        listTable.innerHTML = '';
        createTable();
    }

});


//Функция создания таблицы
function createTable() {

//Обновляем данные куки
    let cookie = document.cookie;

    let cookieObj = cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    //Проходимся циклом по всем куки в объекте
    for ( let i in cookieObj) {

        //Для каждого создаем tr
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdValue = document.createElement('td');
        let tdDelete = document.createElement('td');
        let cookieName = i;
        let cookieValue = cookieObj[i];
        tdName.textContent = cookieName;
        tdName.classList.add('cookieName');
        tdValue.textContent = cookieValue;
        tdValue.classList.add('cookieValue');
        tdDelete.innerHTML = '<button class="delete-btn">Удалить куку</button>';
        tdName.setAttribute('data-name', cookieName);
        tr.dataset.name = `${cookieName}`;
        //console.log(cookieName);
        //Если куки не равна пустому месту, то прикрепляем созданные элементы к таблице
        if (cookie != '') {
            tr.appendChild(tdName);
            tr.appendChild(tdValue);
            tr.appendChild(tdDelete);
            listTable.appendChild(tr);
        }

    }

}
//Первичное создание таблицы
createTable();

//Функция удаления куки
function delCookie (name) {
    let cookieDate = new Date(); // Текущая дата и время
    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = name += '=; expires=' + cookieDate.toGMTString();
}

//Функция проверки на совпадение элементов
function isMatching(full, chunk) {

    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {

        return true;
    } else {

        return false;
    }

}

//Функция удаления куки
listTable.addEventListener('click', event => {
    let target = event.target;

    if (target.tagName === 'BUTTON') {
        let tr = target.closest('tr');
        let name = tr.firstElementChild.getAttribute('data-name');
        //console.log(name);
        delCookie(name);
        tr.remove();
    }
});

//По клику на кнопку добавить куки
addButton.addEventListener('click', () => {
    var inputValue = filterNameInput.value;

    //Обращаемся к новым кукам
    let cookie = document.cookie;
    let cookieObjNew = cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    //Добавляем строку в таблицу
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdValue = document.createElement('td');
    let tdDelete = document.createElement('td');
    let cookieName = addNameInput.value.trim();
    let cookieValue = addValueInput.value.trim();

    //Проходим циклом по всем куки из новых кук
    for ( let cookie in cookieObjNew) {

        //Добавим куку если не пустые значения
        if (cookieName !='' && cookieValue !='' ) {
            document.cookie = `${cookieName}=${cookieValue}`;
            tdName.textContent = `${cookieName}`;
            tdName.dataset.name = `${cookieName}`;
            tr.dataset.name = `${cookieName}`;
            tdValue.textContent = `${cookieValue}`;
            tdValue.classList.add('cookieValue');
            tdDelete.innerHTML = '<button class="delete-btn">Удалить куку</button>';

            //Если имя добавляемой куки уже есть в таблице
            if (cookieName == cookie) {
                cookieObj[cookie] = cookieValue;
                let AllTr = document.querySelectorAll('tbody tr');

                //Проходимся циклом по всем строкам в таблице и удалим, первый попавшийся

                for(let tr of AllTr) {
                    if(tr.dataset.name == `${cookieName}`) {
                        tr.remove();
                    }

                }
                // let name = tr.firstElementChild.getAttribute('data-name');
                // tr.remove();

            }

            //Проверка на совпадение элементов
            if(isMatching(cookieName, inputValue) ) {
                tr.appendChild(tdName);
                tr.appendChild(tdValue);
                tr.appendChild(tdDelete);
                listTable.appendChild(tr);
            }
        }

    }

    //В конце очищаем поля
    addNameInput.value = '';
    addValueInput.value = '';

});


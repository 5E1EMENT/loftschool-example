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

filterNameInput.addEventListener('keyup', function() {
    var inputValue = filterNameInput.value;
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    createTable().then((cookies) =>{
        listTable.innerHTML = '';
            console.log(cookies);

        for(var cookie in cookies) {
            var cookieName = cookie;

            console.log(isMatching(cookieName, inputValue));

            if(isMatching(cookieName, inputValue) && inputValue != '') {

                createTable();

            }

        }

    }
    );
});

let cookie = document.cookie;
let cookieObj = cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');

    prev[name] = value;

    return prev;
}, {});

function createTable() {
    return new Promise((resolve, reject) => {
        for ( let i in cookieObj) {
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

            if (cookie != '') {
                tr.appendChild(tdName);
                tr.appendChild(tdValue);
                tr.appendChild(tdDelete);
                listTable.appendChild(tr);
            }
            resolve(cookieObj)
        }
    })
}
createTable();
function delCookie (name) {
    let cookieDate = new Date(); // Текущая дата и время
    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = name += '=; expires=' + cookieDate.toGMTString();
}

function isMatching(full, chunk) {

    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {

        return true;
    } else {

        return false;
    }

}
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

addButton.addEventListener('click', () => {

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
                for (let i of AllTr) {
                    let tr = AllTr[0];
                    let name = tr.firstElementChild.getAttribute('data-name');
                    tr.remove();
                }
            }
            tr.appendChild(tdName);
            tr.appendChild(tdValue);
            tr.appendChild(tdDelete);
            listTable.appendChild(tr);

        }

    }

    addNameInput.value = '';
    addValueInput.value = '';

});


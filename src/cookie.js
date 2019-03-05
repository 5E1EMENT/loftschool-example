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

    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

let cookie = document.cookie;

let cookieObj = cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');

    prev[name] = value;

    return prev;
}, {});

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
    tdDelete.setAttribute('data-name', cookieName);

    if (cookie != '') {
        tr.appendChild(tdName);
        tr.appendChild(tdValue);
        tr.appendChild(tdDelete);
        listTable.appendChild(tr);
    }

}
let btnDelete = document.querySelectorAll('.delete-btn');

var functionDelete = (cookies) => {

    for ( var btn of btnDelete) {
        let btnParentTr = btn.closest("tr");
        let btnParentTd = btn.closest("td");
        let btnParentAttr = btnParentTd.getAttribute('data-name');

        btn.addEventListener('click', function () {

            for ( let i in cookieObj) {
                let cookieName = i;

                console.log(cookies);
                console.log(cookieName);
                if (cookieName == btnParentAttr) {
                    let cookieDate = new Date ();  // Текущая дата и время

                    cookieDate.setTime ( cookieDate.getTime() - 1 );
                    cookies = cookieName += "=; expires=" + cookieDate.toGMTString();
                    btnParentTr.remove();
                }

            }

        })
    }
}
functionDelete(cookie);

addButton.addEventListener('click', () => {

    let btnDelete = document.querySelectorAll('.delete-btn');
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdValue = document.createElement('td');
    let tdDelete = document.createElement('td');
    let cookieName = addNameInput.value.trim();
    let cookieValue = addValueInput.value.trim();

    if (cookieName !='' && cookieValue !='') {
        document.cookie = `${cookieName}=${cookieValue}`;

        tdName.textContent = `${cookieName}`;
        tdName.classList.add('cookieName');
        tdValue.textContent = `${cookieValue}`;
        tdValue.classList.add('cookieValue');
        tdDelete.innerHTML = '<button class="delete-btn">Удалить куку</button>';
        tr.appendChild(tdName);
        tr.appendChild(tdValue);
        tr.appendChild(tdDelete);
        listTable.appendChild(tr);
    }
    let newcookie = document.cookie;
    console.log(newcookie);
    functionDelete(newcookie);

    addNameInput.value = '';
    addValueInput.value = '';

});



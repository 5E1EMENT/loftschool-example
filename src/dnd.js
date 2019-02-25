/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

// использование Math.round() даст неравномерное распределение!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randColor() {
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

newBtn.addEventListener('click', function(){
    const newDiv = document.createElement('div');
    newDiv.style.width = getRandomInt(50,150) + 'px';
    newDiv.style.height = getRandomInt(50,150) + 'px';
    newDiv.style.background = randColor();
    newDiv.style.position = 'absolute';
    newDiv.style.top = getRandomInt(50,250) + 'px';
    newDiv.style.left = getRandomInt(50,250) + 'px';
    homeworkContainer.appendChild(newDiv);
    //Drag

    var dragObj = null; //object to be moved
    var xOffset = 0; //used to prevent dragged object jumping to mouse location
    var yOffset = 0;


    newDiv.addEventListener("mousedown", startDrag, true);
    newDiv.addEventListener("touchstart", startDrag, true);

    function startDrag(e)
    /*sets offset parameters and starts listening for mouse-move*/
    {
        e.preventDefault();
        e.stopPropagation();
        dragObj = e.target;
        dragObj.style.position = "absolute";
        var rect = dragObj.getBoundingClientRect();

        if(e.type=="mousedown")
        {
            xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
            yOffset = e.clientY - rect.top;
            window.addEventListener('mousemove', dragObject, true);
        }
        else if(e.type=="touchstart")
        {
            xOffset = e.targetTouches[0].clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
            yOffset = e.targetTouches[0].clientY - rect.top;
            window.addEventListener('touchmove', dragObject, true);
        }
    }

    function dragObject(e)
    /*Drag object*/
    {
        e.preventDefault();
        e.stopPropagation();

        if(dragObj == null) return; // if there is no object being dragged then do nothing
        else if(e.type=="mousemove")
        {
            dragObj.style.left = e.clientX-xOffset +"px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.clientY-yOffset +"px";
        }
        else if(e.type=="touchmove")
        {
            dragObj.style.left = e.targetTouches[0].clientX-xOffset +"px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.targetTouches[0].clientY-yOffset +"px";
        }
    }

    document.onmouseup = function(e)
        /*End dragging*/
    {
        if(dragObj)
        {
            dragObj = null;
            window.removeEventListener('mousemove', dragObject, true);
            window.removeEventListener('touchmove', dragObject, true);
        }
    }

});
/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randColor() {
        var r = Math.floor(Math.random() * (256)),
            g = Math.floor(Math.random() * (256)),
            b = Math.floor(Math.random() * (256));

        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }

    const newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');
    newDiv.style.width = getRandomInt(document.documentElement.clientWidth,document.documentElement.clientHeight) + 'px';
    newDiv.style.height = getRandomInt(document.documentElement.clientWidth,document.documentElement.clientHeight) + 'px';
    newDiv.style.background = randColor();
    newDiv.style.position = 'absolute';
    newDiv.style.top = getRandomInt(document.documentElement.clientWidth,document.documentElement.clientHeight) + 'px';
    newDiv.style.left = getRandomInt(document.documentElement.clientWidth,document.documentElement.clientHeight) + 'px';

    return newDiv;

}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

    var xOffset;
    var yOffset;

    target.addEventListener('dragstart', function (e) {
        target.style.position = 'absolute';
        xOffset = e.offsetX;
        yOffset = e.offsetY;
    });

    target.addEventListener('dragend', function (e) {
        target.style.position = 'absolute';
        target.style.top = (e.pageY - xOffset) + 'px';
        target.style.left = (e.pageX - yOffset) + 'px';
    })

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

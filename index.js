const region = [
    {name: "Алтайский край", value: 1},
    {name: "Амурская область", value: 2},
    {name: "Архангельская область", value: 3},
    {name: "Астраханская область", value: 4}
    ]

const dropdownZero = document.querySelector('.dropdown-zero')

const listVisible = 'js-dropdown__list-visible'
const selectorDrop = '.js-drop'
const selectorDropDownList = '.js-dropdown__list'
const selectorDropDownListItem = '.js-dropdown__item'




/**
 * Класс для создания выпадающих списков 
 */
class Select {
    /**
    *  конструктор класса для создания выпадающего списка
    * @constructor
    * @param {object} array массив объектов с элементами выпадающего списка
    */
    constructor(array) {
        try {
            if (!Array.isArray(array)) { // проверка параметра на массив
                throw Error('аргумент ' + array + ' не является массивом')
            }
            this.array = array     
        } catch (err) {
            console.error(err)          
        }       
    }

    /**
    * метод инициализации компонента
    * @param {element} domElement Dom элемент для инициализации
    */
    init(domElement){ 
        try{
            if (!(domElement instanceof Element)) {// проверка параметра на DOM элемент
                throw Error(domElement + ' не является DOM элементом')
            }
            if (!(Array.isArray(this.array))) {
                throw Error('аргумент ' + this.array + ' не является массивом')
            }
            let clone = domElement.cloneNode(true);// создаю клон DOM элемента
            clone.classList.add('js-drop')// добавляю клону класс drop, чтобы можно было добавлять текст из элементов списка
            let divWrapper = document.createElement('div');// создаю див обвёрту для клона
            divWrapper.className = "js-dropdown " // присваиваю обёртке класс dropdown , для того чтобы можно было отслеживать все выпадающие списки
            divWrapper.className += domElement.classList + '-wrapper' // присваиваю обёртке еще один класс, индивидуальный, 
            // для того чтобы можно было позиционировать весь элемент на странице
            domElement.after(divWrapper)// добавляю после самого параметра элемента DOM обвёртку
            divWrapper.appendChild(clone)// добавляю внутрь обвёртки клонированный DOM элемент
            domElement.remove()// удаляю параметр
            divWrapper.innerHTML += `<div class="js-dropdown__list"></div>`// добавляю внутрь обёртки сам блок выпадающего списка
            this.array.forEach((el) => {// прохожу по самому массиву методом forEach
            divWrapper.querySelector('.js-dropdown__list').innerHTML += `<div class="js-dropdown__item" >${ el.name}</div>`})// добавляю в блок выпадающего списка сами элемента массива            
            this._initHandlers(divWrapper)
        } catch (Err) {
            console.error(Err) 
        }        
    }

    /**
    * Метод обработки инициализации
    * @param {element} dropDownWrapper DOM элемент, внутри которого будут отлавливаться события 'click' 
    */
    _initHandlers(dropDownWrapper) {
               
        const drop = dropDownWrapper.querySelector(selectorDrop)
        const dropDownList = dropDownWrapper.querySelector(selectorDropDownList)
        const dropDownListItems = dropDownList.querySelectorAll(selectorDropDownListItem)
        
        // клик по кнопке, отрыть/закрыть
        dropDownWrapper.addEventListener('click', () => {
            this._switchSpisok(dropDownList, listVisible)
        })
     
        // клик по списку, подстановка текста , закрыть select 
        dropDownListItems.forEach( (listItem) => { 
            listItem.addEventListener('click', () => {
                this._addTextInDomElement(drop, listItem)// добавляем элементу с селектором drop текст одного из элементов списка
                this._removeDropDownList(dropDownList, listVisible)// закрываем выпадающий список при выборе элемента списка 
            })
        })
        
        // закрытие dropdown при клике по странице, не внутри dropdown!!!
        document.addEventListener('click', (e) => { 
            if (e.target !== drop) {//если клик происходит не по элементу DOM с классом drop
                this._removeDropDownList(dropDownList, listVisible)// то выпадающий список закрывается
            } 
        })
        
        // нажатие на Tab чтобы закрыть dropdown
        document.addEventListener('keydown', () => {  
            this._removeDropDownList(dropDownList, listVisible)
        })
    }

    /**
    * Метод переключения выпадающего списка
    * @param {element} dropDownList DOM элемент в котором необходимо добавлять/удалять селектор 
    * @param {string} listVisible название класса, который необходимо добавлять/удалять
    */
    _switchSpisok(dropDownList, listVisible) {
        dropDownList.classList.toggle(listVisible)
    }

    /**
    * Метод добавления текста в DOM элемент
    * @param {element} drop DOM элемент в который необходимо добавлять текст
    * @param {element} listItem DOM элемент из которого необходимо взять текст
    */
    _addTextInDomElement(drop, listItem) {
        drop.innerText = listItem.innerText
    }

    /**
    * Метод скрытия выпадающего списка
    * @param {element} dropDownList DOM элемент в котором необходимо удалить селектор 
    * @param {string} listVisible название селектора, который необходимо удалить
    */
    _removeDropDownList(dropDownList, listVisible) {
        dropDownList.classList.remove(listVisible)
    } 
}






const selectInstanceZero = new Select(region) // создание экземпляра класса, с массивом ввиде аргумента
    
selectInstanceZero.init(dropdownZero) // вызов метода init с аргументом ввиде DOM элемента


// const selectInstance = new Select([
//     {name: "Капля", value: 1},
//     {name: "Лужа", value: 2},
//     {name: "Озеро", value: 3},
//     {name: "Море", value: 4}
//     ])

// selectInstance.init(document.querySelector('.dropdown-one'))


// const selectInstanceTwo = new Select([
//     {name: "край", value: 1},
//     {name: "область", value: 2},
//     {name: "страна", value: 3},
//     {name: "континент", value: 4}
//     ])

// selectInstanceTwo.init(document.querySelector('.dropdown-two'))


 


 
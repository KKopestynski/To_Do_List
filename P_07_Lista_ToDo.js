let $todoInput;     //użytkownik wpisuje tutaj treść
let $alertInfo;     //info o braku zadań / konieczności dodania tekstu
let $addBtn;        //przycisk ADD - dodaje nowe elementy do listy
let $ulList;        //lista zadań, tagi <ul></ul>
let $newTask;       //nowy dodany LI, nowe zadanie

let $popup;         //pobrany popup
let $popupInfo;     //alert w popupie, jak sie doda pusty element
let $editedTodo;    //edytowany Todo
let $popupInput;    //tekst wpisany w input w popup'ie
let $addPopupBtn;   //przycisk "zatwierdź" w popup'ie
let $closeTodoBtn;  //przycisk do zamykania popup'a

let $idNumber = 0;

let $allTask;


const main = () =>{
    prepareDOMElements();
    prepareDOMEvents();    
}


// ------------------------------------------------pobieranie elementów -------------------------------------------------
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTask = document.getElementsByTagName('li');
};

// ------------------------------------------------nadawanie nasłuchiwania------------------------------------------------
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};

// ------------------------------------------------dodawanie nowego elementu do listy--------------------------------------
const addNewTask = () => {
    if($todoInput.value !== ''){
        $idNumber ++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $todoInput.value ='';
        $alertInfo.innerText = '';
        createToolsArea();
    }else{
        $alertInfo.innerText = 'Wpisz treść zadania!';
    }
}

const enterCheck = () =>{
    if(event.keyCode === 13) {   // 13 -> keycode === enter || `KeyboardEvent: key='${event.key}//
        addNewTask();
    }
}


// ------------------------------------------------ dodawanie przycisków wraz z ikonkami do li ------------------------------------------------
const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
}

//------------------------------------------------ odhaczenie zadania ------------------------------------------------
const checkClick = (e) => {
    if(e.target.closest('button').classList.contains('complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');

    }else if(e.target.closest('button').className=== 'edit'){
        console.log('clicknelo sie edit');
        editTask(e);

    }else if(e.target.closest('button').className === 'delete'){
        console.log('clicknelo sie delete');
        deleteTask(e);
};
};

//------------------------------------------------ edytowanie zadania w liście ------------------------------------------------
const editTask = (e) => {
    // console.log(e);
    // console.log(e.target.closest('li'));
    const oldTodo = e.target.closest('li').id;
    console.log(oldTodo);
    $editedTodo = document.getElementById(oldTodo);
    console.log($editedTodo);
    $popupInput.value = $editedTodo.firstChild.textContent; //bez firstchilda nadpisujemy diva

    $popup.style.display = 'flex';
};

//------------------------------------------------ zamiana tekstu w popupie ------------------------------------------------
const changeTodo = () => {
    if ($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    }else{
        $popupInfo.innerText = 'Proszę podać zadanie'
    }
}
//------------------------------------------------ zamykanie zadania ------------------------------------------------
const deleteTask =(e) => {
    const deleteToDo = e.target.closest('li');
    deleteToDo.remove();
    if($allTask.length ===0){
        $alertInfo.innerText = 'Brak zdań na liście';
    }
}
//------------------------------------------------ zamykanie popup'a ------------------------------------------------
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
}

document.addEventListener('DOMContentLoaded', main);

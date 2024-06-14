const todoListOne = [];
const todoListTwo = [];
const storedData = localStorage.getItem('todoList'); // will check to make sure localStorage is not empty
const todoListThree = storedData ? JSON.parse(storedData) : []; // JSON.parse(empty localStorage) is not good practice

function renderTodoListTwo(){
    let todoListHTML = '';
    for (let i = 0; i < todoListTwo.length; i++){
        const todo = todoListTwo[i];
        const html = `<p>
                              ${todo}
                             </p>`; // generating the HTML
        todoListHTML += html;
    }
    // display all items in our list
    document.querySelector(".js-todo-list")
        .innerHTML = todoListHTML;
}

function renderTodoListThree(){
    let todoListHTML = '';
    for (let i = 0; i < todoListThree.length; i++){
        const todoObject = todoListThree[i];
        // const name = todoObject.name;
        // const dueDate = todoObject.dueDate;
        const {name, dueDate} = todoObject; // easy way to grab object attributes
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button onclick="
              todoListThree.splice(${i}, 1);
              renderTodoListThree();
			  saveToStorage();
            " class="delete-todo-button">Delete</button>
        `;
        todoListHTML += html;
    }
    // display all items in our list
    document.querySelector(".js-todo-list-date")
        .innerHTML = todoListHTML;
}

function addTodoOne(){
    const inputElement = document.querySelector(".js-name-input-1");
    const todo = inputElement.value; // grab the value inside the input box
    todoListOne.push(todo);
    console.log(todoListOne);
    
    inputElement.value = ''; // reset textbox
}

function addTodoTwo(){
    const inputElement = document.querySelector(".js-name-input-2");
    const todo = inputElement.value; // grab the value inside the input box
    todoListTwo.push(todo);
    
    inputElement.value = ''; // reset textbox
    
    renderTodoListTwo();
}

function addTodoThree(){
    const inputElement = document.querySelector(".js-name-input-3");
    const name = inputElement.value; // grab the value inside the input box
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
    todoListThree.push({
        name: name,
        dueDate: dueDate
    });
    
    inputElement.value = ''; // reset textbox
    renderTodoListThree();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('todoList', JSON.stringify(todoListThree));
}
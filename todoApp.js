/* -------- TODOS -------- */
let todos = [
    {
        todoID: 0,
        todoName: 'Wash dishes',
        done: false
    },
    {
        todoID: 1,
        todoName: 'Walk the dog',
        done: true
    }
];

const todoList = document.querySelector('.todoList');
let todoInput = document.querySelector('.userInputTodo');
let addBtnTodo = document.querySelector('.addBtnTodo');
let clear = document.querySelector('.clearTodo');
let pending = document.querySelector('.pending');

todoList.addEventListener('click', event => {
    if(!event.target.dataset.todoid) {
        event.path.forEach(tag => {
            if(tag.localName == 'li') {
                deleteTodo(tag.dataset.todoid);
            };
        })
    }
    else {
        completeTodo(event.target.dataset.todoid);
    }
})

addBtnTodo.addEventListener('click', event => {
    if(todoInput.value == '') return;
    addTodo(todoInput.value);

    pending.innerHTML = getPendingTasks();
    loadTodos();
})

todoInput.addEventListener('keypress', event => {
    if(event.key == 'Enter') {
        if(todoInput.value == '') return;
        addTodo(todoInput.value);

        pending.innerHTML = getPendingTasks();
        loadTodos();
    }
})

clear.addEventListener('click', event => {
    clearDone();
})


function completeTodo(idx) {
    let todoIdx = todos.findIndex(todo => todo.todoID == idx);

    todos[todoIdx].done = !todos[todoIdx].done;

    pending.innerHTML = getPendingTasks();
    loadTodos();
}

function addTodo(name) {
    let duplicateName = false;
    todos.forEach(todo => {
        if(todo.todoName.toLowerCase() == todoInput.value.toLowerCase()) {
            alert('That task already exists');
            duplicateName = true;
        }
    })
    todoInput.value = '';
    if(duplicateName) return;
    let newTodo = {
        todoID: todos.length,
        todoName: name,
        done: false
    }
    todos.push(newTodo);

    pending.innerHTML = getPendingTasks();
    loadTodos();
}

function deleteTodo(idx) {
    todos.splice(idx, 1);

    reassignIDs();
    pending.innerHTML = getPendingTasks();
    loadTodos();
}

function clearDone() {
    let i = todos.length
    while (i--) {
        if (todos[i].done) { 
            todos.splice(i, 1);
        } 
    }

    pending.innerHTML = getPendingTasks();
    loadTodos();
}

function reassignIDs() {
    for(let i = 0; i < todos.length; i++) {
        todos[i].todoID = i;
    }
}

function getPendingTasks() {
    let count = 0;
    todos.forEach(todo => {
        if(!todo.done) count++;
    })
    return count;
}


function loadTodos() {

    todoList.innerHTML = '';

    todos.forEach(todo => {
        let done = todo.done ? 'done' : '';
        let todoElement = `<li class="${done}" data-todoID='${todo.todoID}'>
                        ${todo.todoName}<span> <i class="fa fa-trash"></i></span>
                    </li>`;
        todoList.insertAdjacentHTML('beforeend', todoElement);

    })

}

pending.innerHTML = getPendingTasks();
loadTodos();

/*-------- CATEGORIES --------*/
let cats = [
    {
        catID: 0,
        catName: 'House chores',
    },
    {
        catID: 1,
        catName: 'Homework',
    }
];

const catList = document.querySelector('.catList');
let catInput = document.querySelector('.userInputCat');
let addBtnCat = document.querySelector('.addBtnCat');

addBtnCat.addEventListener('click', event => {
    if(catInput.value == '') return;
    addCat(catInput.value);

    loadCats();
})

function addCat(name) {
    let duplicateName = false;
    cats.forEach(cat => {
        if(cat.catName.toLowerCase() == catInput.value.toLowerCase()) {
            alert('That task already exists');
            duplicateName = true;
        }
    })
    catInput.value = '';
    if(duplicateName) return;
    let newCat = {
        catID: cats.length,
        catName: name,
    }
    cats.push(newCat);

    loadCats();
}


function loadCats() {
    catList.innerHTML = '';

    cats.forEach(cat => {
        let catElement = `<li data-catID='${cat.catID}'>
                        ${cat.catName}<span> <i class="fa fa-trash"></i></span>
                    </li>`;
        catList.insertAdjacentHTML('beforeend', catElement);

    })

}

loadCats();
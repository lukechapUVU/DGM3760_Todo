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
let input = document.querySelector('.userInput');
let addBtn = document.querySelector('.addBtn');
let pending = document.querySelector('.pending');

todoList.addEventListener('click', event => {
    if(!event.target.dataset.todoid) {
        event.path.forEach(tag => {
            if(tag.localName == 'li') {
                console.log(tag.dataset.todoid)
                deleteTodo(tag.dataset.todoid);
            };
        })
    }
    else {
        completeTodo(event.target.dataset.todoid);
    }
})

addBtn.addEventListener('click', event => {
    if(input.value == '') return;
    addTodo(input.value);

    pending.innerHTML = getPendingTasks();
    loadTodos();
})

input.addEventListener('keypress', event => {
    if(event.key == 'Enter') {
        if(input.value == '') return;
        addTodo(input.value);

        pending.innerHTML = getPendingTasks();
        loadTodos();
    }
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
        if(todo.todoName.toLowerCase() == input.value.toLowerCase()) {
            alert('That task already exists');
            duplicateName = true;
        }
    })
    input.value = '';
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
    console.log(todos);
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
        let todoLI = `<li class="${done}" data-todoID='${todo.todoID}'>
                        ${todo.todoName}<span> <i class="fa fa-trash"></i></span>
                    </li>`;
        todoList.insertAdjacentHTML('beforeend', todoLI);

    })

}

pending.innerHTML = getPendingTasks();
loadTodos();


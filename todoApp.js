const todoParent = document.getElementsByClassName('todoList')[0]
let todoList = todoParent.children;

function lookupTodoIdx(todoName) {
    for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].innerText == todoName) {
            return i;
        }
    }
    return -1;
}

function editTodoName(idx, newName) {
    todoList[idx].innerText = newName;
    return newName;
}

function completeTodo(idx) {
    todoList[idx].className = 'done';
}

function addTodo(name) {
    let newTodo = document.createElement('li');
    newTodo.innerText = name;
    todoParent.appendChild(newTodo);
}

function deleteTodo(idx) {
    return todoParent.removeChild(todoList[idx]);
}

function getPendingTasks() {
    let count = 0;
    for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].className != 'done') {
            count++;
        }
    }
    return count;
}

function clearDone() {
    for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].className == 'done') {
            todoParent.removeChild(todoList[i]);
            i--;
        }
    }
    return;
}
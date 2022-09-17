const todoParent = document.getElementsByClassName('todoList')[0]
let todoList = todoParent.children;
let input = document.getElementsByTagName('input')[0];

let pending = document.getElementsByClassName('pending')[0];
setInterval(function() {
    for(let i = 0; i < todoList.length; i++) {
        todoList[i].addEventListener('click', function () {
            completeTodo(i);
        });
    }
    pending.textContent = getPendingTasks();
}, 500);

function editTodoName(idx, newName) {
    todoList[idx].innerText = newName;
    return newName;
}

function completeTodo(idx) {
    todoList[idx].className = 'done';
}

function addTodo() {
    input.value = 'test';
    if(input.value == '') {
        alert('No value was given!');
        return;
    }
    let newTodo = document.createElement('li');
    newTodo.innerText = input.value;
    input.value = '';
    newTodo = appendElements(newTodo);
    todoParent.appendChild(newTodo);
    /*for(let i = 0; i < todoList.length; i++) {
        todoList[i].children[0].addEventListener('click', function () {
            deleteTodo(i);
        })
    }*/
}

function appendElements(newTodo) {
    let trashSpan = document.createElement('span');
    let trashIcon = document.createElement('i');
    trashIcon.className = 'fa fa-trash';
    trashSpan.appendChild(trashIcon);
    newTodo.appendChild(trashSpan);
    return newTodo;
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
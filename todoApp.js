/* -------- TODOS -------- */
let todos = [
    {
        todoID: 0,
        todoName: 'Wash dishes',
        done: false,
        categoryID: 2
    },
    {
        todoID: 1,
        todoName: 'Walk the dog',
        done: true,
        categoryID: 0
    }
];

const todoList = document.querySelector('.todoList');
let todoInput = document.querySelector('.userInputTodo');
let addBtnTodo = document.querySelector('.addBtnTodo');
let clear = document.querySelector('.clearTodo');
let pending = document.querySelector('.pending');
const catSelect = document.querySelector('#cats');

console.log(catSelect.children);

catSelect.childNodes[0].addEventListener('click', event => {
    console.log(event.target);
})
catSelect.addEventListener('click', event => {
    console.log(event.pointerId);
    //console.log(event.target.children[2].value);
})

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
    for(let i = 0; i < cats.length; i++) {
        cats[i].catID = i;
    }
}

function getPendingTasks() {
    let count = 0;
    todos.forEach(todo => {
        if(!todo.done) count++;
    })
    return count;
}

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

function loadTodos() {

    todoList.innerHTML = '';

    todos.forEach(todo => {
        let done = todo.done ? 'done' : '';
        let todoElement = `<li class="${done}" data-todoID='${todo.todoID}'>
                        ${todo.todoName} > Category: ${categoryLookup(todo.categoryID)}<span> <i class="fa fa-trash"></i></span>
                    </li>`;
        todoList.insertAdjacentHTML('beforeend', todoElement);

    })

}

pending.innerHTML = getPendingTasks();
loadTodos();

/*-------- CATEGORIES --------*/
const catList = document.querySelector('.catList');
let catInput = document.querySelector('.userInputCat');
let addBtnCat = document.querySelector('.addBtnCat');

catList.addEventListener('click', event => {
    if((event.path[0].localName == 'i' || event.path[0].localName == 'span')) {
        event.path.forEach(tag => {
            if(tag.localName == 'li') {
                deleteCat(tag.dataset.catid);
            };
        })
    }
    else if(event.path[0].localName == 'p') {
        editCat(event.target);
    }
})

addBtnCat.addEventListener('click', event => {
    if(catInput.value == '') return;
    addCat(catInput.value);

    loadCats();
})

catInput.addEventListener('keypress', event => {
    if(event.key == 'Enter') {
        if(catInput.value == '') return;
        addCat(catInput.value);

        loadCats();
    }
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

function editCat(pTag) {
    const input = document.createElement('input');
    input.className = 'catEditInput';
    input.setAttribute('value', pTag.textContent.trim());
    pTag.replaceWith(input);

    input.addEventListener('keypress', event => {
        if(event.key == 'Enter') {
            const newPTag = document.createElement('p');
            newPTag.textContent = event.target.value;
            input.replaceWith(newPTag);
            cats[event.path[1].dataset.catid].catName = newPTag.textContent;
            loadTodos();
        }
    })

    
}

function deleteCat(idx) {
    cats.splice(idx, 1);

    reassignIDs();
    loadCats();
}

function categoryLookup(categoryID) {
    return (cats.at(categoryID) ? cats.at(categoryID).catName : 'none')
}

function loadCats() {
    catList.innerHTML = '';

    cats.forEach(cat => {
        let catElement = `<li class="category-list-item" data-catid='${cat.catID}'><p data-editable>
                        ${cat.catName}<span id="delete"> <i id="delete" class="fa fa-trash"></i></span></p>
                    </li>`;
        catList.insertAdjacentHTML('beforeend', catElement);

    })

    cats.forEach(cat => {
        let catOption = `<option value="${cat.catID}" id="${cat.catName}">${cat.catName}</option>`;
        catSelect.insertAdjacentHTML('beforeend', catOption);
    })

    loadTodos();
}

loadCats();
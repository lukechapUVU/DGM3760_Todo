/* -------- TODOS -------- */
let todos = [
    {
        todoID: 0,
        todoName: 'Wash dishes',
        done: false,
        hide: false,
        categoryID: null
    },
    {
        todoID: 1,
        todoName: 'Walk the dog',
        done: true,
        hide: false,
        categoryID: 0
    }
];

const todoList = document.querySelector('.todoList');
let todoInput = document.querySelector('.userInputTodo');
let addBtnTodo = document.querySelector('.addBtnTodo');
let clear = document.querySelector('.clearTodo');
let pending = document.querySelector('.pending');
const catSelect = document.querySelector('#cats');
const catFilter = document.querySelector('#catsFilter')

catFilter.addEventListener('change', event => {
    //console.log(event.target.value);
    if(event.target.value == '' || event.target.value == 'all') {
        displayCategorizedTodos(null);
    }
    else {
        displayCategorizedTodos(event.target.value);
    }
    
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
    if(catSelect.value == '' || catSelect.value == 'none') {
        addTodo(todoInput.value, null);
    }
    else {
        addTodo(todoInput.value, catSelect.value);
    }

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

function displayCategorizedTodos(catID) {
    if(catID == null) {
        for(let i = 0; i < todoList.children.length; i++) {
            if(todoList.children[i].id == 'hide') {
                todoList.children[i].id = '';
            }
        }
    }
    else {
        todos.forEach(todo => {
            if(todo.categoryID == catID) {
                if(todo.hide == true) {
                    todo.hide = false;
                }
            }
            else {
                console.log(todo.categoryID);
                if(todo.hide == false) {
                    todo.hide = true;
                }
            }
            
            /*
            if(todo.categoryID == catID) {
                
                for(let i = 0; i < todoList.children.length; i++) {
                    console.log(todoList.children[i])
                    if(todoList.children[i].dataset.todoid == todo.todoID) {
                        if(todoList.children[i].id == 'hide') {
                            todoList.children[i].id = '';
                        }
                    }
                    else {
                        //TODO
                        todoList.children[i].id = 'hide';
                    }
                }
               
            }
            else {
                for(let i = 0; i < todoList.children.length; i++) {
                    todoList.children[i].id = 'hide';
                }
            }
             */
        })
        loadTodos();
    }
}

function completeTodo(idx) {
    let todoIdx = todos.findIndex(todo => todo.todoID == idx);

    todos[todoIdx].done = !todos[todoIdx].done;

    pending.innerHTML = getPendingTasks();
    loadTodos();
}

function addTodo(name, category) {
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
        done: false,
        hide: false,
        categoryID: category
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
        let hide = false;
        let todoElement = `<li id="${hide}" class="${done}" data-todoID='${todo.todoID}'>
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
            loadCats();
        }
    })
    
}

function deleteCat(idx) {
    cats.splice(idx, 1);

    reassignIDs();
    loadCats();
}

function categoryLookup(categoryID) {
    if(categoryID == null || categoryID == NaN) {
        return 'none';
    }
    return (cats.at(categoryID) ? cats.at(categoryID).catName : 'none')
}

function loadCats() {
    catList.innerHTML = '';
    catFilter.innerHTML = '';
    catSelect.innerHTML = '';

    cats.forEach(cat => {
        let catElement = `<li class="category-list-item" data-catid='${cat.catID}'><p data-editable>
                        ${cat.catName}<span id="delete"> <i id="delete" class="fa fa-trash"></i></span></p>
                    </li>`;
        catList.insertAdjacentHTML('beforeend', catElement);

    })

    let presentSelect = `<option value="" disabled selected>Category</option>
    <option value="none" id="none">None</option>`
    catSelect.insertAdjacentHTML('beforeend', presentSelect)
    cats.forEach(cat => {
        let catOption = `<option value="${cat.catID}" id="${cat.catName}">${cat.catName}</option>`;
        catSelect.insertAdjacentHTML('beforeend', catOption);
    })

    let presetFilter = `<option value="" disabled selected>Filter by Category</option>
          <option value="all" id="all">All</option>`
    catFilter.insertAdjacentHTML('beforeend', presetFilter)
    cats.forEach(cat => {
        let catOption = `<option value="${cat.catID}" id="${cat.catName}">${cat.catName}</option>`;
        catFilter.insertAdjacentHTML('beforeend', catOption);
    })

    loadTodos();
}

loadCats();
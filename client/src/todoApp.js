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
/* -------- TODOS -------- */
let todoArr;

const todoList = document.querySelector('.todoList');
let todoInput = document.querySelector('.userInputTodo');
let addBtnTodo = document.querySelector('.addBtnTodo');
let clear = document.querySelector('.clearTodo');
let pending = document.querySelector('.pending');
const catSelect = document.querySelector('#cats');
const catFilter = document.querySelector('#catsFilter')

async function getTodos() {
    let response = await fetch('/todos');
    let data = await response.json();

    return data;
}

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
        getTodos().then(todos => {
            addTodo(todos, todoInput.value, null);
        })
    }
    else {
        getTodos().then(todos => {
            addTodo(todos, todoInput.value, catSelect.value);
        })
    }

    getTodos().then(todos => {
        loadTodos(todos);
    })
    pending.innerHTML = getPendingTasks();
})

todoInput.addEventListener('keypress', event => {
    if(event.key == 'Enter') {
        if(todoInput.value == '') return;
        getTodos().then(todos => {
            addTodo(todos, todoInput.value);
        })
        getTodos().then(todos => {
            loadTodos(todos);
        })
        pending.innerHTML = getPendingTasks();
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
        todoArr.forEach(todo => {
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
        getTodos().then(todos => {
            loadTodos(todos);
        })
    }
}

function completeTodo(idx) {
    let todoIdx = todoArr.findIndex(todo => todo.todoID == idx);
    console.log(todoArr[todoIdx].done)
    todoArr[todoIdx].done = !todoArr[todoIdx].done;
    console.log(todoArr[todoIdx].done)
    getTodos().then(todos => {
        loadTodos(todos);
    })
    pending.innerHTML = getPendingTasks();
}

function addTodo(todos, name, category) {
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
        todoID: todoArr.length,
        todoName: name,
        done: false,
        hide: false,
        categoryID: category
    }
    //post here
    todos.push(newTodo);

    getTodos().then(todos => {
        loadTodos(todos);
    })
    pending.innerHTML = getPendingTasks();
}

function deleteTodo(idx) {
    todoArr.splice(idx, 1);

    reassignIDs();
    getTodos().then(todos => {
        loadTodos(todos);
    })
    pending.innerHTML = getPendingTasks();
}

function clearDone() {
    let i = todoArr.length
    while (i--) {
        if (todoArr[i].done) { 
            todoArr.splice(i, 1);
        } 
    }

    getTodos().then(todos => {
        loadTodos(todos);
    })
    pending.innerHTML = getPendingTasks();
}

function reassignIDs() {
    for(let i = 0; i < todoArr.length; i++) {
        todoArr[i].todoID = i;
    }
    for(let i = 0; i < cats.length; i++) {
        cats[i].catID = i;
    }
}

function getPendingTasks() {
    let count = 0;
    /*todoArr.forEach(todo => {
        if(!todo.done) count++;
    })*/
    return count;
}



function loadTodos(todos) {
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

getTodos().then(todos => {
    loadTodos(todos);
})
pending.innerHTML = getPendingTasks();


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
            getTodos().then(todos => {
                loadTodos(todos);
            })
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

    getTodos().then(todos => {
        loadTodos(todos);
    })
}

loadCats();

fetch('/todo', {
    method: 'POST',
    body: JSON.stringify({"todoName": "todo from app"}),
    headers: {
        'Content-Type': 'application/json',
    }
})
.then(res => json())
.then(data => console.log(data))
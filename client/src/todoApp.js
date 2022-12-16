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
        addTodo(todoInput.value, null);
    }
    else {
        addTodo(todoInput.value, catSelect.value);
    }

    getTodos().then(todos => {
        loadTodos()
    })
})

todoInput.addEventListener('keypress', event => {
    if(event.key == 'Enter') {
        if(todoInput.value == '') return;
        addTodo(todoInput.value);
        getTodos().then(todos => {
            loadTodos()
        })
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
            loadTodos()
        })
    }
}

function completeTodo(idx) {
    getTodos().then(todos => {
        fetch('/todo', {
            method: 'PUT',
            body: JSON.stringify({"id": idx}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
    })
    .then(res => json())
    getTodos().then(todos => {
        loadTodos()
    })
    /*
    let todoIdx = todoArr.findIndex(todo => todo.todoID == idx);
    console.log(todoArr[todoIdx].done)
    todoArr[todoIdx].done = !todoArr[todoIdx].done;
    console.log(todoArr[todoIdx].done)
    getTodos().then(todos => {
        loadTodos()
    })
    pending.innerHTML = getPendingTasks();
    */
}

function addTodo(name, category) {
    fetch('/todo', {
        method: 'POST',
        body: JSON.stringify({"todoName": name, "catID": category}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => json())
    getTodos().then(todos => {
        loadTodos()
    })
    /*
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
        loadTodos()
    })
    pending.innerHTML = getPendingTasks();
    */
}

function deleteTodo(idx) {
    fetch('/todo', {
        method: 'DELETE',
        body: JSON.stringify({"id": idx}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    getTodos().then(todos => {
        reassignTodoIDs(todos);
        loadTodos()
        
    })
    .then(res => json())
    /*
    todoArr.splice(idx, 1);

    reassignIDs();
    getTodos().then(todos => {
        loadTodos()
    })
    pending.innerHTML = getPendingTasks();
    */
}

function clearDone() {
    getTodos().then(todos => {
        let i = todos.length
        while (i--) {
            if (todos[i].done) { 
                deleteTodo(i);
            } 
        }

        loadTodos()
    })
}

function reassignTodoIDs(todos) {
    for(let i = 0; i < todos.length; i++) {
        todos[i].todoID = i;
    }
    /*for(let i = 0; i < cats.length; i++) {
        cats[i].catID = i;
    }*/
}


function loadTodos() {
    
    getTodos().then(todos => {
    
        todoList.innerHTML = '';
        let count = 0;
        todos.forEach(todo => {
            let done = todo.done ? 'done' : '';
            let hide = false;
            let todoElement = `<li id="${hide}" class="${done}" data-todoID='${todo.todoID}'>
                            ${todo.todoName} > Category: ${categoryLookup(todo.categoryID)}<span> <i class="fa fa-trash"></i></span>
                        </li>`;
            todoList.insertAdjacentHTML('beforeend', todoElement);

            
            if(!todo.done) count++;
            pending.innerHTML = count;
        })  
    })
}

getTodos().then(todos => {
    loadTodos()
})


/*-------- CATEGORIES --------*/
const catList = document.querySelector('.catList');
let catInput = document.querySelector('.userInputCat');
let addBtnCat = document.querySelector('.addBtnCat');

let catArr = [
    {
        catID: 0,
        catName: 'House chores',
    },
    {
        catID: 1,
        catName: 'Homework',
    }
];

async function getCats() {
    let response = await fetch('/cats');
    let data = await response.json();

    return data;
}

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
    fetch('/cat', {
        method: 'POST',
        body: JSON.stringify({"catName": name}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => json())
    getCats().then(cats => {
        loadCats(cats);
    })
    catObj = {catID: catArr.length, catName: name}
    catArr.push(catObj)
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
            fetch('/cat', {
                method: 'PUT',
                body: JSON.stringify({"id": event.path[1].dataset.catid, "catName": newPTag.textContent}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => json())
            getCats().then(cats => {
                loadCats(cats);
            })
            catArr[event.path[1].dataset.catid].catName = newPTag.textContent
            getTodos().then(todos => {
                loadTodos()
            })
        }
    })
    
}

function deleteCat(idx) {
    fetch('/cat', {
        method: 'DELETE',
        body: JSON.stringify({"id": idx}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    getCats().then(cats => {
        reassignCatIDs(cats);
        loadCats(cats);
        
    })
    .then(res => json())
    catArr.splice(idx, 1);
}

function categoryLookup(categoryID) {
    if(categoryID == null || categoryID == NaN) {
        return 'none';
    }
    else {
        return catArr[categoryID] ? catArr[categoryID].catName : 'none';
    }
}

function reassignCatIDs(cats) {
    for(let i = 0; i < cats.length; i++) {
        cats[i].catID = i;
    }
}

function loadCats(cats) {
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
        loadTodos()
    })
}

getCats().then(cats => {
    loadCats(cats);
})


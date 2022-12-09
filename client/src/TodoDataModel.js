let todos = [
    {
        id: 0,
        name: 'DGM 3760',
        done: false,
        dueDate: 'Sep 30',
        categoryID: 1,
    },
    {
        id: 1,
        name: 'Dishes',
        done: true,
        dueDate: null,
        categoryID: null,
    },
    {
        id: 2,
        name: 'Water plants',
        done: true,
        dueDate: 'Sep 21',
        categoryID: 0,
    }
];

let categories = [
    {
        id: 0,
        name: 'Housework',
    },
    {
        id: 1,
        name: 'Homework',
    }
];

function listTodos() {
    return todos;
}

function addTodo(todoObj) {
    todos.push(todoObj);
    return todos;
}

function completeTodo(idx) {
    todos[idx].done = true;
    return todos;
}

function deleteTodo(idx) {
    todos.splice(idx, 1);
    return todos;
}

function deleteCategory(idx) {
    categories.splice(idx, 1);
    return categories;
}

function editDueDate(idx, date) {
    todos[idx].dueDate = date;
    return todos;
}

function editTodoCategory(idx, category) {
    for(let i = 0; i < categories.length; i++) {
        if(categories[i].name == category) {
            todos[idx].categoryID = i;
            return todos;
        }
    }
    return 'Error: Category not found';
}

function totalComplete() {
    let count = 0;
    todos.forEach(td => {
        if(td.done) {
            count++;
        }
    })
    return count;
}

function categoryComplete(categoryID) {
    let count = 0;
    todos.forEach(td => {
        if((td.categoryID == categoryID) && (td.done)) {
            count++;
        }
    })
    return count;
}

function totalLeft() {
    let count = 0;
    todos.forEach(td => {
        if(!td.done) {
            count++;
        }
    })
    return count;
}

function categoryLeft(categoryID) {
    let count = 0;
    todos.forEach(td => {
        if((td.categoryID == categoryID) && (!td.done)) {
            count++;
        }
    })
    return count;
}

function editTodoName(idx, newName) {
    todos[idx].name = newName;
    return todo;
}

function editCategory(idx, newName) {
    categories[idx].name = newName;
    return categories;
}

function editDueDate(idx, newDate) {
    todos[idx].dueDate = newDate;
    return todos;
}

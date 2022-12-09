const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

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


app.get('/todos', (req, res) => {
    res.send(todos)
})

app.get('/todosByCat', (req, res) => {
    let todosByCatArr = [];
    todos.forEach(todo => {
        if(todo.categoryID == req.query.catID) {
            todosByCatArr.push(todo)
        }
    })
    res.send(todosByCatArr);
})

app.get('/cats', (req, res) => {
    res.send(cats);
})

app.post('/todo', (req, res) => {
    todos.push({
        todoID: todos.length,
        todoName: req.query.todo,
        done: false,
        hide: false,
        categoryID: 0
    })
    res.send(todos)
})

app.post('/cat', (req, res) => {
    cats.push({
        catID: cats.length,
        catName: req.query.cat
    })
    res.send(cats)
})

app.put('/todo', (req, res) => {
    todos[req.query.id].todoName = (req.query.todoName != null) ? req.query.todoName : todos[req.query.id].todoName
    todos[req.query.id].done = (req.query.done != null) ? req.query.done : todos[req.query.id].done
    todos[req.query.id].categoryID = (req.query.categoryID != null) ? parseInt(req.query.categoryID) : todos[req.query.id].categoryID

    res.send(todos)
})

app.put('/cat', (req, res) => {
    cats[req.query.id].catName = (req.query.catName != null) ? req.query.catName : cats[req.query.id].catName

    res.send(cats)
})

app.delete('/todo', (req, res) => {
    todos.splice(req.query.id, 1)

    res.send(todos)
})

app.delete('/cat', (req, res) => {
    cats.splice(req.query.id, 1)

    res.send(cats)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

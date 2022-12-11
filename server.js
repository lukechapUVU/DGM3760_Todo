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
        todoName: req.body.todoName,
        done: false,
        hide: false,
        categoryID: req.body.catID
    })
    res.send(todos)
})

app.post('/cat', (req, res) => {
    cats.push({
        catID: cats.length,
        catName: req.body.catName
    })
    res.send(cats)
})

app.put('/todo', (req, res) => {
    console.log(req.body)
    
    //todos[req.body.id].todoName = (req.body.todoName != undefined) ? req.body.todoName : todos[req.body.id].todoName
    todos[req.body.id].done = (req.body.done != undefined) ? req.body.done : todos[req.body.id].done
    //todos[req.body.id].categoryID = (req.body.categoryID != undefined) ? parseInt(req.body.categoryID) : todos[req.body.id].categoryID
    console.log(todos)
    res.send(todos)
})

app.put('/cat', (req, res) => {
    cats[req.body.id].catName = (req.body.catName != null) ? req.body.catName : cats[req.body.id].catName

    res.send(cats)
})

app.delete('/todo', (req, res) => {
    console.log(req.body)
    todos.splice(req.body.id, 1)

    res.send(todos)
})

app.delete('/cat', (req, res) => {
    cats.splice(req.query.id, 1)

    res.send(cats)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

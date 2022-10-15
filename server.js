const express = require('express')
const app = express()
const port = 8000

app.use(express.static('client'))

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


app.get('/todos', (req, res) => {
    res.send(todos)
})

app.post('/todo', (req, res) => {
    console.log(res)
    todos.push({
        id: 4,
        todo: req.query.todo,
        complete: false,
        category: "none"
    })
    res.send(todos)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
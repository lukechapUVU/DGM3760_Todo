const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//DB STUFF
const mongoose = require('mongoose');
const uri = "mongodb://dbAdmin:Iw6v3X2BaQ6pUyXR@ac-ksfv6wp-shard-00-00.k1pmhlq.mongodb.net:27017,ac-ksfv6wp-shard-00-01.k1pmhlq.mongodb.net:27017,ac-ksfv6wp-shard-00-02.k1pmhlq.mongodb.net:27017/?ssl=true&replicaSet=atlas-f6zght-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set('strictQuery', true)
mongoose.connect(
    uri,
    {
        useNewUrlParser: true
    }
)
.then(e => console.log('MongoDB Ready!'))
.catch(console.error)

//const NewTodo = require('./database/create')
const Todo = require('./database/todo')
const Category = require('./database/category')

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    }
    catch {
        res.json({message:err})
    }
})

/* app.get('/todosByCat', (req, res) => {
    let todosByCatArr = [];
    todos.forEach(todo => {
        if(todo.categoryID == req.query.catID) {
            todosByCatArr.push(todo)
        }
    })
    res.send(todosByCatArr);
}) */

app.get('/cats', async (req, res) => {
    try {
        const cats = await Category.find()
        res.json(cats)
    }
    catch {
        res.json({message:err})
    }
})

app.post('/todo', async (req, res) => {
    const todosDB = await Todo.find()
    const newTodo = new Todo({
        todoID: todosDB.length,
        todoName: req.body.todoName,
        done: false,
        hide: false,
        categoryID: req.body.catID
    }); 
    try {
        const savedTodo = await newTodo.save()
        res.json(savedTodo)
    }
    catch (err) {
        res.json({message: err})
    }
})

app.post('/cat', async (req, res) => {
    const catsDB = await Category.find()
    const newCategory = new Category({
        catID: catsDB.length,
        catName: req.body.catName,
    }); 
    try {
        const savedCat = await newCategory.save()
        res.json(savedCat)
    }
    catch (err) {
        res.json({message: err})
    }
})

app.put('/todo', async (req, res) => {
    const todo = await Todo.findOne({ todoID: { $eq: req.body.id } })
    console.log(req.body.id)
    console.log(todo)
    if(!todo) {
        throw new Error('Todo not found')
    }

    todo.done = !todo.done

    try {
        const result = await todo.save()
        res.json(result)
    }
    catch (err) {
        res.json({message: err})
    }
})

app.put('/cat', async (req, res) => {
    const category = await Category.findOne(req.body.id)

    if(!category) {
        throw new Error('Category not found')
    }

    category.catName = req.body.catName

    try {
        const result = await category.save()
        res.json(result)
    }
    catch (err) {
        res.json({message: err})
    }
})

app.delete('/todo', async (req, res) => {
    try {
        const removedTodo = await Todo.remove({todoID: req.body.id})
        res.json(removedTodo)
    }
    catch (err) {
        res.json({ message: err })
    }
})

app.delete('/cat', async (req, res) => {
    try {
        const removedCategory = await Category.remove({catID: req.body.id})
        res.json(removedCategory)
    }
    catch (err) {
        res.json({ message: err })
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
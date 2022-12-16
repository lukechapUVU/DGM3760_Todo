const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    todoID: {
        type: Number,
        required: true
    },
    todoName: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    hide: {
        type: Boolean,
    },
    categoryID: {
        type: Number
    }
})

/* newTodo.save().then(doc => {
    console.log('new todo saved to DB')
    console.log(doc)
}) */

module.exports = mongoose.model('Todos', PostSchema)
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    catID: {
        type: Number,
        required: true
    },
    catName: {
        type: String,
        required: true
    }
})

/* newTodo.save().then(doc => {
    console.log('new todo saved to DB')
    console.log(doc)
}) */

module.exports = mongoose.model('Categories', PostSchema)
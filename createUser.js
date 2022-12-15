const User = require('./user')

const newUser = new User({
    firstName: 'luke',
    lastName: 'chapman',
    age: 24,
    email: 'lchapy98@gmail.com'
})

newUser.save().then(doc => {
    console.log('new user saved to DB')
})
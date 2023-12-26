const express = require('express')
const connectDB = require('./config/db')
const userRoute = require('./routes/api/users')
const authRoute = require('./routes/api/auth')
const profileRoute = require('./routes/api/profile')
const postRoute = require('./routes/api/posts')
const app = express()

//Connect database
connectDB();

//Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req,res) => res.send('API Running'))

//Define Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute)
app.use('/api/posts', postRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`))
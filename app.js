require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
const jwt = require('jsonwebtoken')


// const morgan = require('morgan')

const bookController = require('./controllers/bookController')
let db = mongoose.connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
      console.log( db.name )

    }).catch(e => console.log(e.message))

const app = express()
app.set('view engine', 'pug')

app.use(express.static('static'))
app.use(cors())
app.use(express.json())
const bookRouter = require('./routes/books')
const authRouter = require('./routes/auth')

app.use('/auth', authRouter)
// app.use(morgan('dev'))
let logger = (req, _, next) => {
    console.log('logger', req.method, req.path  )
    next()
}
app.use(logger)
app.use(express.urlencoded(extended=true))

let vaildateRequest = (req,res,next) =>{
    
    let authHeader = req.headers['authorization'] 
    console.log('validate', authHeader  )
    if ( !authHeader ) {
        console.log('validate no auth header',   )
        res.status(403).send("Token not provided")
        return
    }
    let token =authHeader.split(" ")[1]
    if (!token ) {
        res.status(403).send("Token not provided")
        return
    }
    try {
        let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(data)
        next()
    } catch(err) {
        res.status(403).send("Invaild Token provided")
        
    }
}

app.get('/books',vaildateRequest, async (_, res) => {
    console.log('books')
    let books = await bookController.getAllBooks()
    console.log('books', books)
    res.json(books)
    // res.send(' Welcome to Library')
})
app.delete(/books*/, async (req, res) => {
    console.log( /(^.*\/)(.*$)/.exec( decodeURIComponent( req.path))[2]  )
    await bookController.removeBook( /(^.*\/)(.*$)/.exec( decodeURIComponent( req.path))[2] )
    res.end()
})
app.get('/addbook', (req ,res) => {
    console.log('test')
    res.render('Addbook' )
})
app.post('/addbook', async (req, res) =>{
    console.log( req.body )
    await bookController.addNewBook(req.body)
    res.end()
} )

app.post('/',(req,res) => {
    // console.log(req , res)
    res.end()
})

app.use('/books/', bookRouter)

app.all(/.*/, (_, res) => {
    res.send('You are lost')
})



const PORT = 3300
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})
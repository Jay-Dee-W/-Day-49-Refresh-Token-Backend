
const express = require('express')

const router = express.Router()

router
    .route("/")
    .get((_, res) => {
        res.send('List of books')
    })
    .post((_, res) => {
        res.send('Adding new book')
    })

let bookHandler = (req, res, next) => {
    let id = req.params.bookID
    if (Number(id) !== NaN && Number(id) > 0) {
        next()
    } else {
        res.send('invaild book id')
    }
}

let bookHandler2 = (req, res) => {
    res.send("Book requested: " + req.params.bookID)
}

router.get('/:bookID', [bookHandler, bookHandler2])

module.exports = router
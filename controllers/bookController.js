
const Book = require('../models/book');
const Category = require('../models/category');
const readlineSync = require('readline-sync');

const printAllBooks = async () => {
    let books = await Book.find().populate('category');
   
    books.length === 0 ?
        console.log('No Books Found \n')
    :
    books.forEach(book => {
        console.log('----------------------')
        console.log('Book title: ', book.title )
        console.log('Book price: ', book.price )
        
        console.log('Book category: ', book.category.name )
        console.log('Book authors: ', book.authors )
        console.log('----------------------')
        readlineSync.question('Enter to continue ')
    })
}

const getAllBooks = async () => {
    let books = await Book.find().populate('category');
    let returnBooks = []
    books.length === 0 ?
        console.log('No Books Found \n')
    :
    books.forEach(book => {
       
        returnBooks.push([book.title,book.authors]) 
    })
    return returnBooks
}

const addNewBook = async ({title, price, categoryName, authors}) => {
    try{
        const category = await Category.findOne({name:categoryName})
       
        const book = new Book({title, price, category, authors})
        await book.save()
        console.log('----------------------')
        console.log('Book ' + title +' saved')
        console.log('----------------------')
       
    } catch (e){
        console.log('Error', e.message)
    }
}
const removeBook = async (title)=> {
   
    try{
        const book = Book.findOne({title})
       
        await book.deleteOne()
        // console.log('----------------------')
        // console.log('Book ' + title + ' deleted')
        // console.log('----------------------')
        // readlineSync.question('Enter to continue ')
    }catch (e){
        console.log('Error', e.message)
    }
}

const searchBooks = async(query) => {
   
    try {
      let books = await Book.find({ title: {"$regex" :query, "$options": "i"   }} ) 
      books.length === 0 ? console.log( 'Searh resturned no result')
       : books.forEach( book => {
        console.log('----------------------')
        console.log('Book title: ', book.title )
        console.log('----------------------')
       } )
       readlineSync.question('Enter to continue ')
    } catch (e){
        console.log('Error ', e.message)
    }
}

const searchCategory = async (category) => {
    try {
        let books = await Book.find()
        books.length === 0 ? console.log( 'No books found')
        : books.forEach( book => {
            book.category.name === category &&
                console.log('----------------------')
                console.log('Book title: ', book.title )
                console.log('----------------------')
            
        })
        readlineSync.question('Enter to continue ')
    }catch (e){
        console.log('Error', e.message)
    }
}

module.exports ={
    printAllBooks,
    addNewBook,
    removeBook,
    searchBooks,
    searchCategory,
    getAllBooks
}
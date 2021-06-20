const mongoose = require('mongoose');
const readlineSync = require('readline-sync');


const categoryController = require('./controllers/categoryController')
const bookController = require('./controllers/bookController')
const memberController = require('./controllers/memberController')
const issueController = require('./controllers/issueController')

function displayOptions() {
    console.log('Welcome to Library\n')
    console.log('>>> 0: To Exit')

    console.log('----------- What you can Manage ---------------\n')
    console.log('------------ Manage Categories -------------')
    console.log('>>> 1: See All Categories')
    console.log('>>> 2: Add New Category')
    console.log('>>> 3: Delete one Category')
    console.log( '\n')
    console.log('------------ Manage Books --------------------')
    console.log('>>> 4: See All Books')
    console.log('>>> 5: Add New Book')
    console.log('>>> 6: Delete one Book')
    console.log('>>> 7: Search for a Book')
    console.log('>>> 8: Get all books of a category')
    console.log( '\n')
    console.log('------------ Manage Members ------------------')
    console.log('>>> 9: See all Members')
    console.log('>>> 10: Add a Member')
    console.log('>>> 11: Remove a Member')
    console.log('\n')
    console.log('------------ Manage Issues ------------------')
    console.log('>>> 12: Issue a book')
    console.log('>>> 13: Return a book')
    console.log('>>> 14: See active issues')
    console.log('>>> 15: Get issue history of a book')
    console.log('\n')

  
    console.log('Enter 0-15')
}

let db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/Library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        showOptions()

    }).catch(e => console.log(e.message))

async function showOptions() {
    displayOptions()


    let response = readlineSync.question('Option ?: ')

    switch (response) {
        case '0':{
            db.close()
        }
        case '1': {
            await categoryController.printAllCategories()
            showOptions()
        }
        break
        case '2':{
            let categoryToAdd = readlineSync.question('Catergory to add ?: ')
            await categoryController.addNewCategory(categoryToAdd)
            showOptions()
        }
        break
        case '3' : {
            let categoryToDelete = readlineSync.question('Catergory to delete ?: ')
            await categoryController.removeCategory(categoryToDelete)
            showOptions()
        }
        break
        case '4': {
            await bookController.printAllBooks()
            showOptions()
        }
        break
        case '5':{
            let bookTitle = readlineSync.question('Book Title ?: ')
            let bookPrice = readlineSync.question('Book Price ?: ')
            let bookAuthors = readlineSync.question('Book Author/s ?: ')
            let bookCategory = readlineSync.question('Book Category ?: ')
            await bookController.addNewBook(bookTitle,bookPrice,bookCategory,bookAuthors)
            showOptions()

        }
        break
        case '6':{
            let bookToDelete = readlineSync.question('book title to delete ?: ')
            await bookController.removeBook(bookToDelete)
            showOptions()
        }
        break
        case '7':{
            let stringQuery = readlineSync.question('String query to search for ?: ')
            await bookController.searchBooks(stringQuery)
            showOptions()
        }
        break
        case '8':{
            let category = readlineSync.question('Category to search for ?: ')
            await bookController.searchCategory(category)
            showOptions()
        }
        break
        case '9': {
            await memberController.printAllMembers()
            showOptions()
        }
        break
        case '10':{
            let memberToAdd = readlineSync.question('Member to add ?: ')
            await memberController.addNewMember(memberToAdd)
            showOptions()
        }
        break
        case '11' : {
            let memberToDelete = readlineSync.question('Member to delete ?: ')
            await memberController.removeMember(memberToDelete)
            showOptions()
        }
        case '12':{
            let issueBook = readlineSync.question('Book title ?: ')
            let issueMember = readlineSync.question('MemberId ?: ')
            await issueController.issueBook(issueBook,issueMember)
            showOptions()
        }
        break
        case '13':{
            let returnBook = readlineSync.question('Book title ?: ')
            await issueController.returnBook(returnBook)
            showOptions()
        }
        break
        case '14':{
            await issueController.activeIssues()
            showOptions()
        }
        break
        case '15':{
           
        }
        break
        default:
            showOptions()
            break;
    }
   

}


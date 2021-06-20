const Issue = require('../models/issue')
const Book = require('../models/book');
const Member = require('../models/members');
const readlineSync = require('readline-sync');


const issueBook = async (title, memberID) => {
    try {
        let book = await Book.findOne({title})
        let member = await Member.findOne({memberID})
        console.log( book.title, member.name)
        const issue = new Issue({book: book._id, member: member._id, active: true})
        let save = await issue.save()
        console.log(" Issue " + save._id + " saved")
        readlineSync.question('Enter to continue ')
    } catch (e) {
        console.log('Error', e.message)
    }
}
const returnBook = async (title) => {
    try {
        let book = await Book.findOne({title})
        let update = await Issue.updateOne({book: book._id}, ({active: false}), (err,res)=>{ console.log(res)})
        console.log(update)
        console.log('Book Issue '+ title + " returned")
        readlineSync.question('Enter to continue ')
    } catch (e) {
        console.log('Error', e.message)
    }
}
const activeIssues = async () => {
    try {
        let activeIssues = await Issue.find({active: true}).populate('book').populate('member')
        console.log(activeIssues.length)
        activeIssues.length === 0 ? console.log( '\n No Active Issues \n')
        : activeIssues.forEach( issue => {
            console.log('----------------------')
            console.log('Book Title: ', issue.book.title)
            console.log('Member: ', issue.member.name)
            console.log('Active?: ', issue.active)
            console.log('----------------------')
        })
    } catch (e) {
        console.log('Error', e.message)
    }
}
const issueHistory = async (book) => {
}
    try {

    } catch (e) {
        console.log('Error', e.message)
}



module.exports = {
    issueBook,
    returnBook,
    activeIssues,
    issueHistory
}
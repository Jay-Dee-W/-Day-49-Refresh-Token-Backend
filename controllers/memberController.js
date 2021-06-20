const Member = require('../models/members');
const readlineSync = require('readline-sync');

const printAllMembers = async () => {
    let members = await Member.find();
    members.length === 0 ?  console.log('----------------------\n'+  "No members found \n" + "----------------------\n")
    : members.forEach( member => {
        console.log('----------------------')
        console.log('Member Name: ', member.name)
        console.log('MemberId: ', member.memberID)
        console.log('----------------------')
       
    })
    readlineSync.question('Enter to continue ')
}

const addNewMember = async( name ) => {
    try{
        const member = new Member({name})
        await member.save();
        console.log('----------------------')
        console.log('Member ' + name + ' with MeberId ' + member.memberID +' saved')
        console.log('----------------------')
        readlineSync.question('Enter to continue ')
    }catch (e) {
        console.log('Error', e.message)
    }
}

const removeMember = async (name)=> {
    try{
        const member = Member.findOne({name})
        await member.deleteOne()
        console.log('----------------------')
        console.log('Member ' + name + ' deleted')
        console.log('----------------------')
        readlineSync.question('Enter to continue ')
    }catch (e){
        console.log('Error', e.message)
    }
}

module.exports ={
    printAllMembers,
    addNewMember,
    removeMember,
    
}
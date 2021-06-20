const User = require('../models/user');
const bcrypt = require('bcrypt')

const addNewUser = async ({name, email, password, pic}) => {
    
    const defaultPic = "http://"

    if (!pic) {
        pic = defaultPic
    }
    console.log(/.*@.*\..*/.test(email))
    if (!/.*@.*\..*/.test(email)) {
        return { status: false, message: 'Invaild email' }
    }
    if (!password) {
        return {status: false, result: "Password is required"}
    }

    let hash = await bcrypt.hash(password, 10)


    try {
        
        const user = new User({ name, email, password:hash, pic })
        let newUser = await user.save()
     
        return {status: true , result: newUser };
    } catch (e) {
        return { status: false, result : 'Error' + e.message}
    }
}

const getUsers = async () => {
    let users = await User.find()
    return users
}

const loginUser = async ({email, password}) => {
    console.log('user controller login' ,email, password)
    try{
        let user = await User.findOne({email})
        console.log('user controller login user' ,user)
        if (user === null) {
            return{status: false, result: {message: " Invaild Email"} }
        }
        let result = await bcrypt.compare(password, user.password)
        console.log('user controller login user result' , result)
        if (!result ) {
            return {status: false, result: {message: "Invaild password"} }
        }
        return {status: true, result: user}
    } catch (error) {
        return {status: false, result: "error" + error.message}
    }
}

module.exports = {
    addNewUser,
    getUsers,
    loginUser,
}
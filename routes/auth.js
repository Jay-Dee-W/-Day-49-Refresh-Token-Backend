
const express = require('express')
const multer = require('multer')
const jwt = require('jsonwebtoken')

let refreshTokens = []

const storage = multer.diskStorage({
    destination: function (_,_,cb) {
        cb(null, "static/images/")
    },
    filename: function (_, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const multipart = multer({storage: storage})

const router = express.Router()
const userController = require('../controllers/userController')

router.post("/signup", multipart.single("profilePic"), async (req, res) => {
        if (req.file.path){
            req.body.photoUrl = req.file.path;
        } else {
            req.body.photoUrl = "http://"
        }
        let result = await userController.addNewUser(req.body)
        console.log('result',result )
        if ( result.status) {
            res.status(201).send( result.result)
        } else 
        res.status(400).send(result.result)
    });


router.post("/login", async (req, res) => {
    
    const loginResult =  await userController.loginUser(req.body)
    console.log('auth post login result', loginResult)
    if (loginResult.status) {
        let payload = {
            email: loginResult.result.email
        }
        let token =  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME } )
        console.log('auth post login token', token)
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRE_TIME})
        refreshTokens.push(refreshToken)
        res.status(200).json({'access_token': token, 'refesh_token': refreshToken})

    }else {
        res.status(403).json(loginResult.result)
    }
});

router.post('/token', async (req, res) => {
    const {refresh_token} = req.body
    if (!refresh_token || !refreshTokens.includes(refresh_token)){
        res.send(403)
    }
    try {
    let payload =  jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{ 
        expiresIn : process.env.ACCESS_TOKEN_EXPIRE_TIME} )

    res.status(200).json({ access_token: accessToken})
    } catch (e){
        res.status(401).json({error: e})
    }
})


module.exports = router
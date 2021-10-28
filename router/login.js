const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../model/user")
const router = express.Router()
router.get("/", (req, res) => {
    res.render("index")
})
router.post("/login", async (req, res) => {
    console.log("hello",
        req.body)
    let username = req.body.username
    let password = req.body.password
    const user = await User.findOne({
        Username: username
    })

    if (!user) {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            Username: username,
            Password: password
        })
        res.render('logout')
        // res.send(newUser)
    } else {
        const validPass = await bcrypt.compare(password, user.Password)
        if (!validPass) return res.status(400).json({
            message: 'Incorrect Password!'
        })
        let token = ""
        if (req.body.remember == "on") {
            token = user.generatePermAuthToken()
        } else {
            token = user.generateAuthToken()
        }

        console.log(token)
        res.render('logout')
        // return res.status(200).json({
        //     message: "Welcome",
        //     token: token
        // })
    }
})
router.get('/logout',(req,res)=>{
    res.render('index')
})
module.exports = router

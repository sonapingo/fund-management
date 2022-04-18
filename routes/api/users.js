const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const keys = require("../../config/keys")
const passport = require("passport")

const User = require("../../models/User")

// router.get("/test", (req, res) => {
//     res.json({ msg: "login works" })
// })

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已经注册")
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: "D:\\javascript\\fund-management\\projects\\node-demo\\node-vue-ele-app\\client\\src\\assets\\none.png",
                    password: req.body.password,
                    identity: req.body.identity
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err

                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .then(err => console.log(err))
                    });
                });
            }
        })
})

router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // 查询数据库
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json("用户不存在" )
            }

            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        return res.status(400).json("密码错误！")
                    }
                })
        })
})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})

module.exports = router
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async(req, res) => {
        const body = req.body
        try {
            const findUser = await Users.findOne({ 
                where: {
                    email: req.body.email
                }
            })
            if(!findUser){
                return res.status(400).json({
                    status: "failed",
                    message: "invalid email or password"
                })
            }

            const checkPassword = await bcrypt.compare(body.password, findUser.dataValues.password)
            if (!checkPassword) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid email or password"
                })
            }

            const payload = {
                email : findUser.dataValues.email,
                id: findUser.dataValues.id
            }

            jwt.sign(payload, process.env.PWD_TOKEN, { expiresIn: 24 * 3600 }, (err, token) => {
                if(err){
                    console.log(err)
                }
                return res.status(200).json({
                    status: "success",
                    message: "Success log in",
                    data: token
                })
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    register: async(req, res) => {
        const body = req.body
        try {
            const findUser = await Users.findOne({
                where: {
                    email: body.email
                }
            })

            if(findUser){
                return res.status(400).json({
                    status: "failed",
                    message : "email already used"
                })
            }

            bcrypt.hash(body.password, 10, async(err, hash) => {
                const createUser = await Users.create({
                    username: body.username,
                    email: body.email,
                    password: hash
                })
                return res.status(200).json({
                    status: "success",
                    message: "success register"
                })
            })
            
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}
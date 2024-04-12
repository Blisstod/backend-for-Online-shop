const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/userModel')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_SECRET,
        {expiresIn: '5h'}
    )
}

class AuthController {
    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if (!user){
            return next(ApiError.notFound('User not found'))
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return next(ApiError.unauthorized('Incorrect password'))
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token})

    }

    async register(req, res, next){
        const {username, email, password} = req.body
        if (!email || !password){
            return next(ApiError.unauthorized('Incorrect email or password!'))
        }
        const exists = await User.findOne({ email } );
        if(exists){
            return next(ApiError.conflict('User this Email already exists!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username: username, email: email, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new AuthController();
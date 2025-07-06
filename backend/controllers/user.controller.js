import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async (req, res) =>{
    
    const {username, email, password} = req.body
    try {
        if(!username || !email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }

        const emailExists = await User.findOne({email: email})
        if (emailExists){
            return res.status(400).json({message: 'User already exists'})
        }

        const usernameExists = await User.findOne({username: username})
        if(usernameExists){
            return res.status(400).json({message: 'username is taken'})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const userDoc = await User.create({
            username: username,
            email : email,
            password: hashedPassword
        })

        //JWT
        if(userDoc){
            //jwt.sign(payload, secret, options)
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
                expiresIn: '7d',
            })
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
        }

        return res.status(200).json(userDoc)

    } catch (error) {
        console.log('error in sign up', error)
        return res.status(500).json({message: 'internal server error'})
    }
}

export const signin = async (req, res) =>{
    const {username, password} = req.body
    try {
        const user = await User.findOne({username: username})
        if(!user){
            return res.status(400).json({message: 'invalid username or password'})
        }

        const isValidPassword = await bcryptjs.compare(password, user.password)
        if(!isValidPassword){
            return res.status(400).json({message: 'invalid username or password'})
        }

        //JWT
        if(user){
            //jwt.sign(payload, secret, options)
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '7d',
            })
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
        }

        return res.status(200).json({user:user, message: 'logged in successfuly'})

    } catch (error) {
        console.log('error in log in controller', error)
        return res.status(500).json({message: 'internal server error'})
    }
}

export const getUser = async(req, res) =>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message: 'no token provided'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: 'invalid token'})
        }

        console.log(decoded)
        const user = await User.findById(decoded.id).select('-password')
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log('error in get user controller', error)
        return res.status(500).json({message: 'internal server error'})
    }
}

export const logout = async(req, res) => {
    res.clearCookie('token')
    return res.status(200).json({message: 'logged out successfully'})
}
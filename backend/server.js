import express from 'express'
import { ConnectBD } from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()

const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))

//routing
app.use('/api/users', userRoutes)

app.get('/', (req, res)=>{
    res.send('boilerplate get 1')
})

app.listen(PORT, ()=>{
    ConnectBD()
    console.log('listening on port', PORT)
})
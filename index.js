import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { authenticateToken } from './middleware.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/home', authenticateToken, (req,  res) => {
	const { user } = req
	res.json({msg: `Welcome ${user.username}`,})
})

app.post('/login', (req, res) => {
	const {username, password} = req.body
	
	if(username == 'admin' && password == 'admin'){
		const token = jwt.sign(
			{ username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: 600 } //600s = 10minutes
		)

		res.cookie('token', token, { httpOnly:true })

		return res.json({username, token, msg: 'Login Success'})
	}

	return res.json({message: 'Invalid Credentials'})
})

app.listen(8000, () => {
	console.log('Server is running on http://localhost:8000')
})
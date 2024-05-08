import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { authenticateToken } from './middleware.js'

dotenv.config()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/home',authenticateToken, (req,  res) => {
	console.log(req.headers)
	const { user } = req
	res.json({msg: `Welcome ${user.username}`,})
})

app.post('/login', (req, res) => {
	const {username, password} = req.body
	
	if(username == 'admin' && password == 'admin'){
		const token = jwt.sign(
			  { username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: 3600 }
		)
		return res.json({username, token, msg: 'Login Success'})
	}
	return res.json({message: 'Invalid Credentials'})
})

app.listen(8000, () => {
	console.log('Server is running on http://localhost:8000')
})
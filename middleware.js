import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authenticateToken = (req, res, next) => {
	const { token } = req.body
	
	if(!token) return res.status(403).json({
		msg: 'No token present'
	})

	try{
		const decode = jwt.decode(token, process.env.ACCES_TOKEN_SECRET)
		req.user = decode
	}catch(err){
		return res.status(403).json({
			msg: 'Invalid token'
		})
	}

	next()
}
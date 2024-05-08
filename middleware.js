import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
	if(!req.cookies.token) return res.status(403).json({
		msg: 'No token present'
	})
	
	const { token } = req.cookies
	try{
		const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = decode
	}catch(err){
		res.clearCookie('token')
		
		return res.status(403).json({
			msg: 'Invalid token',
			err: err
		})

	}
	next()
}
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const verify = (req, res, next) => {
    const { headers } = req;

    
    const authHeader = headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);

        req.body.userId = decoded._id

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}


module.exports = {verify}
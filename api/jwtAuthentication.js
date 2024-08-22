import jwt from "jsonwebtoken"


const jwtAuthentication = (req, res, next) => {
    const jwt_token = req.headers['cookie']?.split('=')[1]

    try {

        //Check if they don't have token
        if (!jwt_token) {
            return res.status(403).json({ message: 'Access denied. No token provided.' });
        }
        
        //Check if the token is expired
        const decoded = jwt.decode(jwt_token, { complete: true });
        if (decoded.payload.exp * 1000 < Date.now()) {
            res.clearCookie("jwt-token")
            return res.status(401).json({ message: 'Token expired.' });
        }

        //Check if token is valid
        const user = jwt.verify(jwt_token, process.env.JWT_STRING);
        req.user = user;
        next();
    } catch(e) {
        res.clearCookie("jwt-token")
    }

}

export default jwtAuthentication
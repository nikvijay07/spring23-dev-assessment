import jwt from "jsonwebtoken"


const jwtAuthentication = (req, res, next) => {
    const jwt_token = req.headers['cookie'].split('=')[1]
    try {
        console.log("VEfore")
        const user = jwt.verify(jwt_token, process.env.JWT_STRING);
        console.log("HII")
        req.user = user;
        next();
    } catch(e) {
        res.clearCookie("jwt_token")
    }

}

export default jwtAuthentication
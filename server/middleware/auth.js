
import  Jwt  from "jsonwebtoken";
import ENV from "../config.js";
// auth middelware to check if the user is authenticated or not
export default async function Auth(req, res, next){
    
    try {
        // access the authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];
        // retrieve the user detail of the logged in user
        const decodedToken = await Jwt.verify(token, ENV.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send({error : "Authentication Failed!"});
    }
}

// middleware for the local variables
//this function create the localvariable when we call the generateOTP function
export function localVairables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false,
    }
    next();
}









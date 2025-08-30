import { err } from "inngest/types";

export const protect = (req, res, next) => {
    try{
        const {userId} = req.auth();
        console.log(userId)
        if(!userId){
            return res.status(401).json({success : false, message: "Unauthorized"});
        }
        next();
    }catch(error){
        return res.status(401).json({success : false, message: error.message});
    }
}
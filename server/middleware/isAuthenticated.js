import jwt from "jsonwebtoken";

 const isAuthenticated = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"You are not logged In."
            })
        }

        const check = jwt.verify(token, process.env.SECRET_KEY)
        if(!check){
            return res.status(401).json({
                message:"sorry! you are not logged In"
            })
        }
         req.user = check
         next();
        
    } catch (error) {
        console.error("Error in isAuthenticated:", error);
        return res.status(500).json({
            message:"internal server error"
        })
    }
}
export default isAuthenticated
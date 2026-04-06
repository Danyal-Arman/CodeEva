import jwt from "jsonwebtoken";

const generatToken = (user)=>{
 return jwt.sign({email:user.email, id:user._id, username:user.username}, process.env.SECRET_KEY, {expiresIn: '7d'})
}
export default generatToken
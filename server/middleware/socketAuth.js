import jwt from "jsonwebtoken"
import cookie from "cookie"

export const socketAuth = (io)=>{
    io.use((socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    let token = cookies.token;


    if (!token) throw new Error("No token provided");

    // Handle accidental object
    if (typeof token === "object") {
      token = token.token;
    }

    // Remove Bearer if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token.includes(".")) {
      throw new Error("Malformed token structure");
    }
   


    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.user = decoded;
    next();
  } catch (err) {
    console.error("Socket authentication error:", err);
    next(new Error("Invalid token"));
  }
}); 

}
  
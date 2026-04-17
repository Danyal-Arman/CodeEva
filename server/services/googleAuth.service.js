import oauth2Client from "../config/googleConfig.js";

export const googleAuthService = async (code) =>{
   const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userRes = await oauth2Client.request({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
    });
 
    return userRes.data
}
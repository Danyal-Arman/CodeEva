import express from "express"
import axios from "axios"

const router = express.Router()

const JUDGE_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true"

router.post("/run-code", async(req, res)=>{
    const {source_code, language_id} = req.body
    try {
        const response = await axios.post(
          JUDGE_URL,
          {source_code, language_id},
          {
              headers: {
                        "content-type": "application/json",
                        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                        "X-RapidAPI-Key": process.env.RAPID_API_KEY
                    },
          }
        )
        return res.json(response.data)

    } catch (error) {
        if(error.message === "Request failed with status code 429"){
            return res.status(429).json({
                message:"You have reached your limit of 50 req/day ha ha"
            })
        }
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
})

export default router
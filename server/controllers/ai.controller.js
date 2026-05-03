import { groqCodeSummarizationApi } from "../services/groqSummarization.service.js";
import { askGroqAI } from "../services/together.service.js"


export const assistantAi = async(req, res) =>{
try {
    const {entireChatMessages} = req.body;

    
    if(!entireChatMessages){
        return res.status(400).json({message: 'Ask something first'})
    }   

    const response = await askGroqAI(entireChatMessages)
    return res.status(200).json({reply: response})
    
} catch (error) {
    console.error("Error in assistantAi:", error);
    return res.status(500).json({
        message:"Internal server error"
    })
} 
}

export const aiCodeSummarization = async(req, res)=>{

    try { 
        const {entireSummarizerMessages} = req.body
     
        const result = await groqCodeSummarizationApi(entireSummarizerMessages)
        return res.status(200).json({reply: result})

    } catch (error) {
        console.error("Error in aiCodeSummarization:", error);
    return res.status(500).json({
        message:"Internal server error"
    })
    } 
}

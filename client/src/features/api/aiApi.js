import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const AI_API = "http://localhost:4000/ai"

const AIApi = createApi({
    reducerPath: "AIApi",
    baseQuery: fetchBaseQuery({
        baseUrl: AI_API,
        credentials: "include"
    }),
    endpoints: (builder) =>({
        AIAssistant: builder.mutation({
            query:({entireChatMessages})=>({
                url: "/assistant",
                method: "POST",
                body:{entireChatMessages}
            })
        }),
        AICodeSummarizer : builder.mutation({
            query: ({entireSummarizerMessages})=>({
                url:"/code-summarization",
                method:"POST",
                body: {entireSummarizerMessages}
            })

            
        })

    })
})

export const {useAIAssistantMutation, useAICodeSummarizerMutation} = AIApi

export default AIApi
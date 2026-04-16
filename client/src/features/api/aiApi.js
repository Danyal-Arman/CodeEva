import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

const AI_API = `${BASE_URL}/ai`

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
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

const USER_API = `${BASE_URL}/user`

const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["user"],
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder) =>({
        getUser: builder.query({
            query:()=>({
                url: "/",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        updateUserProfile: builder.mutation({
            query:(userData)=>({
                url: "/profile",
                method: "PUT",
                body: userData
            }),
            invalidatesTags: ["user"]
        }),
        getUserStats: builder.query({
            query:()=>({
                url: "/stats",
                method: "GET",
            }),
            providesTags: ["user"]
        })
    })
})

export const {useGetUserQuery, useUpdateUserProfileMutation, useGetUserStatsQuery} = userApi;
export default userApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const USER_API = "http://localhost:4000/user"

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
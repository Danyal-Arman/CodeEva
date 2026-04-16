import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

const FILE_API = `${BASE_URL}/file`

const fileApi = createApi({
    reducerPath: "fileApi",
    tagTypes: ["Files", "versions"],
    baseQuery: fetchBaseQuery({
        baseUrl: FILE_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createFileAndFolder: builder.mutation({
            query: (fileData) => ({
                url: "/create/:roomId",
                method: "POST",
                body: fileData
            }),
            invalidatesTags: ["Files"]
        }),
        getFiles: builder.query({
            query: (roomId) => ({
                url: `/get-files/${roomId}`
            }),
            providesTags: ["Files"]
        }),
        getFileById: builder.query({
            query: ({ roomId, fileId }) => ({
                url: `/get-files/${roomId}/${fileId}`,
                method: "GET"
            }),
            providesTags: ["Files", "versions"],
        }),
        createVersion: builder.mutation({
            query: ({roomId, fileId, content}) => ({
                url: `/create-version/${roomId}/${fileId}`,
                method: "POST",
                body:{content}
            }),
            invalidatesTags:["versions"]
        }),
        
        getAllVersion: builder.query({
            query:({fileId})=>({
                url:`/all-versions/${fileId}`,
                method:"GET"
            }),
            providesTags:["versions"]
        }),
        restoreVersion: builder.mutation({
            query:({fileId, versionNumber})=>({
                url: `/restore/${fileId}`,
                method:`PATCH`,
                body: {versionNumber}
            }),
           invalidatesTags:["versions"]
        }),
        deleteVersion : builder.mutation({
            query: ({roomId, fileId, versionNumber})=>({
                url:`delete-version/${roomId}/${fileId}`,
                method:"DELETE",
                body:{versionNumber}
            }),
            invalidatesTags:["versions"]
        })

    })
});
export const { useCreateFileAndFolderMutation, useGetFilesQuery, useGetFileByIdQuery, useCreateVersionMutation, useGetAllVersionQuery, useRestoreVersionMutation, useDeleteVersionMutation } = fileApi;


export default fileApi; 
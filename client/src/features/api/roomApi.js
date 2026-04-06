import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ROOM_API = "http://localhost:4000/room";

const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ROOM_API,
    credentials: "include",
  }),
    tagTypes: ["Room"],
  endpoints: (builder) => ({ // ✅ FIXED: Added space before arrow function
    createRoom: builder.mutation({
      query: () => ({
        url: "/create",
        method: "POST",
      }),
    }),
    joinRoom: builder.mutation({
      query: ({ roomId, username }) => ({
        url: "/join",
        method: "POST",
        body: { roomId, username },
      }),
    }),
    leaveRoom: builder.mutation({
      query: ({ roomId }) => ({
        url: `/leave/${roomId}`,
        method: "POST",
      }),
    }),
    getRoom: builder.query({
      query: ({ roomId }) => ({
        url: `/get-room/${roomId}`,
        method: "GET",
      }),
    }),
    createMessage: builder.mutation({
      query: ({ roomId, message }) => ({
        url: `/create/messages/${roomId}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags:["Room"]
    }),
    getMessagesByRoom: builder.query({
      query: ( roomId ) => ({
        url: `/messages/${roomId}`,
        method: "GET",
      }),
      providesTags:["Room"]
    }),
    getAIChatMessagesByRoom: builder.query({
      query: ( roomId ) => ({
        url: `/messages/ai/${roomId}`,
        method: "GET",
      }),
      providesTags:["Room"]
    }),
    getAISummarizerMessagesByRoom: builder.query({
      query: ( roomId ) => ({
        url: `/messages/ai-summarizer/${roomId}`,
        method: "GET",
      }),
      providesTags:["Room"]
    }),

  }),
});

export const {
  useCreateRoomMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useGetRoomQuery,
  useCreateMessageMutation,
  useGetMessagesByRoomQuery,
  useGetAIChatMessagesByRoomQuery,
  useGetAISummarizerMessagesByRoomQuery
} = roomApi;

export default roomApi;

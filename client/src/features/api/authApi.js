import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

const AUTH_API = `${BASE_URL}/auth/`;

const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "post",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const info = await queryFulfilled;
          console.log("this is info", info);
          dispatch(userLoggedIn({ user: info.data.user }));
          dispatch(authApi.util.invalidateTags(["auth"]));
        } catch (error) {
          console.log("this is dispatch error", error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ otp }) => ({
        url: "verify-email",
        method: "POST",
        body: { otp },
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: "request-password-reset",
        method: "POST",
        body: { email },
      }),
    }),
    verifyResetPasswordOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "verify-reset-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ resetToken, newPassword }) => ({
        url: "reset-password",
        method: "POST",
        body: { resetToken, newPassword },
      }),
    }),
    googleAuth: builder.mutation({
      query: (code) => ({
        url: "google",
        method: "POST",
        body: { code },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
  useRequestPasswordResetMutation,
  useVerifyResetPasswordOtpMutation,
  useResetPasswordMutation,
  useGoogleAuthMutation,
} = authApi;

export default authApi;

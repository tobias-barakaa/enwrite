import { LOGIN_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

interface UserResponse {
  id: string;
  username: string;
  email: string;
  // add other user properties
}

interface Google {
  name: string;
  email: string;
  photoURL: string;

}

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginData>({
      query: (data) => ({
        url: `${LOGIN_URL}/logs/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation<UserResponse, RegisterData>({
      query: (data) => ({
        url: `${USERS_URL}/users`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${LOGIN_URL}/logs/logout`,
        method: "POST",
      })
    }),
    google: builder.mutation<UserResponse, Google>({
      query: (data) => ({
        url: `${USERS_URL}/google`,
        method: "POST",
        body: data
      })
    })
  })
 
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGoogleMutation } = usersApiSlice;

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${LOGIN_URL}/logs/login`,
//         method: "POST",
//         body: data,
//         credentials: "include",
//       }),
//     }),
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/users`,
//         method: "POST",
//         body: data,
//         credentials: "include",
//       }),
//     }),
    
//   }),
// });

// export const { useLoginMutation, useRegisterMutation } = usersApiSlice;

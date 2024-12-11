import { FORGOT_PASSWORD_URL } from '../constants';
import { apiSlice } from './apiSlice';


interface typeOrder {
  message: string;  
  status: string;
    
}

interface CreateOrderInput {
  email: string;
  
}

interface PasswordLinkInput {
    id: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
}
  

const forgotPasswordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendpasswordlink: builder.mutation<typeOrder, CreateOrderInput>({  
      query: (data: CreateOrderInput) => ({
        url: `${FORGOT_PASSWORD_URL}/sendpasswordlink`,
        method: 'POST',
        body: data,
        credentials: 'include' as RequestCredentials,
      }),
    }),

    forgotPassword: builder.mutation<typeOrder, PasswordLinkInput>({
        query: ({ id, token, newPassword, confirmPassword }) => ({
          url: `${FORGOT_PASSWORD_URL}/${id}/${token}`,
          method: 'POST',
          body: { newPassword, confirmPassword },
          credentials: 'include',
        }),
      }),

      getResetLink: builder.query({
        query: ({ id, token }) => ({
            url: `${FORGOT_PASSWORD_URL}/passwordforgot/${id}/${token}`,
        }),
        keepUnusedDataFor: 5 * 60 * 1000,
        
      })
    
    
   
    
  }),
});

export const { useSendpasswordlinkMutation,useForgotPasswordMutation, useGetResetLinkQuery } = forgotPasswordApiSlice;
export { forgotPasswordApiSlice };

import { ADMIN_USERS_URL, ORDER_ADMIN_URL, UPLOAD_URL } from '../../constants';
import { apiSlice } from '../apiSlice';

  

const ordersAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getRecent: builder.query({
      query: () => ({
        url: `${ORDER_ADMIN_URL}/recent`,
      }),
      keepUnusedDataFor: 5,
      
    }),
    getUsers: builder.query({
        query: () => ({
          url: `${ADMIN_USERS_URL}/users`,
        }),
        keepUnusedDataFor: 5,
        
      }),
      getOrderById: builder.query({
        query: (id) => ({
          url: `${ORDER_ADMIN_URL}/getorderbyid/${id}`,
        }),
        keepUnusedDataFor: 5,
        
      }),

      uploadArticleFile: builder.mutation({
        query: ({ article_id, user_id, file, status }) => {
            const formData = new FormData();
            formData.append('article_id', article_id);
            formData.append('user_id', user_id);
            formData.append('file', file); 
            formData.append('status', status);
    
            return {
                url: `${UPLOAD_URL}/upload`,
                method: 'POST',
                body: formData,
                credentials: 'include',
            };
        },
    }),
    getCompletedOrders: builder.query({
      query: () => ({
        url: `${UPLOAD_URL}/completed`,
        credentials: 'include',

      }),
      keepUnusedDataFor: 5,
      
    }),

      
  }),
});

export const { useGetRecentQuery, useGetUsersQuery, useGetOrderByIdQuery, useUploadArticleFileMutation, useGetCompletedOrdersQuery } = ordersAdminApiSlice;
export { ordersAdminApiSlice };

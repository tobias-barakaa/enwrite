import { ADMIN_USERS_URL, ORDER_ADMIN_URL } from '../../constants';
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
        
      })
  }),
});

export const { useGetRecentQuery, useGetUsersQuery, useGetOrderByIdQuery } = ordersAdminApiSlice;
export { ordersAdminApiSlice };

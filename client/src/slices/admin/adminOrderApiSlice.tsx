import { ORDER_ADMIN_URL } from '../../constants';
import { apiSlice } from '../apiSlice';

  

const ordersAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getRecent: builder.query({
      query: () => ({
        url: `${ORDER_ADMIN_URL}/recent`,
      }),
      keepUnusedDataFor: 5 * 60 * 1000,
      
    })
  }),
});

export const { useGetRecentQuery } = ordersAdminApiSlice;
export { ordersAdminApiSlice };

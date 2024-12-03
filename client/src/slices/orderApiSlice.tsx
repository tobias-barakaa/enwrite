import { ORDER_URL, PAYPAL_URL } from '../constants';
import { apiSlice } from './apiSlice';

interface Order {
  id: string;
  title: string;
  content_type: string;
  description: string;
  cost: number;
  keywords: string;
  word_count: string;
  duration: string;
  complexity: string;
  language: string;
  created_at: string;
  is_paid: boolean;
  quantity: number;
}

interface typeOrder {
  message: string;  
  orderId: string;   
}

interface OrderResponse {
  message: string;  
  order: Order;   
}

interface CreateOrderInput {
  title: string;
  content_type: string;
  description: string;
  cost: number;
  keywords: string;
  wordCount: string;
  duration: string;
  complexity: string;
  language: string;
}

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<typeOrder, CreateOrderInput>({  
      query: (data: CreateOrderInput) => ({
        url: `${ORDER_URL}/create-order`,
        method: 'POST',
        body: data,
        credentials: 'include' as RequestCredentials,
      }),
    }),
    getOrder: builder.query<OrderResponse, string>({
      query: (id: string) => `${ORDER_URL}/getone/${id}`,
    }),
    getOrdersByUser: builder.query<OrderResponse[], string>({
      query: (id: string) => `${ORDER_URL}/getall/${id}`,
    }),
    payOrder: builder.mutation<typeOrder, { orderId: string; details: CreateOrderInput }>({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/update/${orderId}`,
        method: 'PUT',
        body: { ...details},
        credentials: 'include',
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5 * 60 * 1000,
      
    })
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery, useGetOrdersByUserQuery,
  usePayOrderMutation, useGetPayPalClientIdQuery
 } = ordersApiSlice;
export { ordersApiSlice };

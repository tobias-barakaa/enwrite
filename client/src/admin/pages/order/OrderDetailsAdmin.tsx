import React from 'react'
import { useGetOrderByIdQuery } from '../../../slices/admin/adminOrderApiSlice';
import { useParams } from 'react-router-dom';

const OrderDetailsAdmin: React.FC = () => {
    const { id } = useParams();
    console.log(id, 'ideeee')

    const { data:getOne } = useGetOrderByIdQuery(id);
    console.log(getOne);
  return (
    <div>
      
    </div>
  )
}

export default OrderDetailsAdmin;

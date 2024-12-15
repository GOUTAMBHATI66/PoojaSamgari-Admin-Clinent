import React, { useEffect, useState } from 'react'

const DashboardProduct = ({orderObj}) => {

  const [FormatedDate, setFormatedDate] = useState("")

  function formatDate() {

    const date = new Date(orderObj.createdAt)

    const formatDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    setFormatedDate(formatDate)
  }

  useEffect(() => {
    formatDate()
  })

  return (
    <div className=' w-[300px] lg:w-full px-4 border border-[#E2D0CA] rounded-md'>
        <div className=' flex gap-2 items-center justify-between py-2 border-b border-[#E2D0CA]'>
            <h1 className=' truncate text-sm'>{orderObj.id}</h1>
            <p className='text-gray-500 text-xs text-nowrap'>{FormatedDate}</p>
        </div>
        <div className=' flex gap-4 items-center justify-between py-2  '>
            <h1 className='truncate text-sm text-black/80 '>{orderObj.orderItems[0].product.name}</h1>
            <p className='font-semibold text-blue-700 '>&#8377;{orderObj.totalAmount}</p>
        </div>
    </div>
  )
}

export default DashboardProduct
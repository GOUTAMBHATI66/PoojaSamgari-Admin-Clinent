import React from 'react'

const DashboardProduct = () => {
  return (
    <div className=' w-[300px] lg:w-full px-4 border border-[#E2D0CA] rounded-md'>
        <div className=' flex gap-2 items-center justify-between py-2 border-b border-[#E2D0CA]'>
            <h1>#OrderID1234</h1>
            <p className='text-gray-500 text-xs'>14 Dec 2024</p>
        </div>
        <div className=' flex gap-4 items-center justify-between py-2  '>
            <h1 className='truncate text-sm text-black/80'>Blue T-shirt with MorPankh dkjai aijda& a uid aif iaodfj </h1>
            <p className='font-semibold'>&#8377;15999</p>
        </div>
    </div>
  )
}

export default DashboardProduct
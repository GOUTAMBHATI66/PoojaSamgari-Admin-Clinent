import React from 'react'

const DashboardProduct = () => {
  return (
    <div className=' w-[300px] lg:w-full border border-black/20 px-4 rounded-md'>
        <div className=' flex gap-2 items-center justify-between py-2 border-b border-black'>
            <h1>#OrderID1234</h1>
            <p className='text-gray-400 text-xs'>14 Dec 2024</p>
        </div>
        <div className=' flex gap-4 items-center justify-between py-2  '>
            <h1 className='truncate text-sm text-black/80'>Blue T-shirt with MorPankh dkjai aijda& a uid aif iaodfj </h1>
            <p className=' text-blue-700 font-semibold'>&#8377;15999</p>
        </div>
    </div>
  )
}

export default DashboardProduct
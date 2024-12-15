import { Link } from "react-router-dom";
import Chart from "../component/Chart";
import DashboardDetailsCard from "../component/DashboardDetailsCard";
import DashboardProduct from "../component/DashboardProduct";
import { Button } from "@/components/ui/button";
import AxiosBase from "@/lib/axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {

  const [statistics, setStatistics] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [PendingOrders, setPendingOrder] = useState([])

  const fetchStatistics = async () => {
    try {
      setIsLoading(true)
      const {data} = await AxiosBase.get("/api/admin/dashboard")
      if(!data.success) throw new Error()
        console.log(data.data)
        setPendingOrder(data.data.pendingOrders)
        console.log(data?.data?.paymentMethodDistribution[0]?._count?.paymentMethod)
        console.log(data?.data?.paymentMethodDistribution[1]?._count?.paymentMethod)
        setStatistics(data.data)
    } catch (error) {
      console.log(error.message)
      setStatistics({})
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatistics()
  }, [])

  const firstFiveOrders = PendingOrders.slice(0,5)
  
  return ( 
    <>
    { isLoading ? <Skeleton className="h-10 my-2 rounded-lg w-full bg-white" /> :  
   (<div className=" flex flex-col gap-6 py-4 ">

    {/* Standard details */}
    <div className=" space-y-4">
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardDetailsCard title={"Total Income"} value={statistics?.totalIncome} style={true} />
            <DashboardDetailsCard title={"Pending Orders"} value={statistics?.pendingOrders?.length} />
            <DashboardDetailsCard title={"All Products"} value={statistics?.totalProducts} />

          </div>
    </div>

    {/* Chart and details section */}
    <section className=" flex flex-col lg:flex-row gap-4 ">
      
      {/* chart */}
      <Chart productsArr={statistics?.productWiseIncome} />

    <div className=" flex flex-col w-full lg:w-[40%] h-full gap-2">

      {/* Payment status  */}
    <div className=" lg:h-1/3 bg-[#e2d0ca] rounded-lg ">
      <h2 className=" text-center text-lg font-semibold border-b border-primary py-2">Payment Status of Orders</h2>
      <div className="flex gap-2 items-center justify-center px-4">
            <div className=" w-1/2 border-r border-primary my-2"> 
              <h1 className=" text-center text-2xl font-bold my-3">COD</h1>
              {/* <p className=" text-center text-xl font-semibold">{statistics?.paymentMethodDistribution[0] ? (statistics?.paymentMethodDistribution[0]?._count?.pymentMethod) : 0}</p>  */}
            </div>
            <div className="w-1/2 my-2">
            <h1 className=" text-center text-2xl font-bold my-3">ONLINE</h1>
            {/* <p className=" text-center text-xl font-semibold">{statistics?.paymentMethodDistribution[1]?._count.pymentMethod}</p> */}
            </div>
      </div>
    </div>

    <div className="  lg:h-2/3 my-2">
      
      {/* heading */}
      <div className=" flex items-center justify-between gap-4">
        <h1 className=" text-lg font-semibold ml-2">Latest Orders</h1>
        <Link to={"/admin/orders"} className=" text-blue-600"> <Button variant="link" >See All</Button> </Link>
      </div>

      <div className="flex lg:flex-col gap-2 overflow-x-scroll md:overflow-auto">
        {firstFiveOrders.length > 0 ?  firstFiveOrders.map((order,i) => (

          <DashboardProduct key={i} orderObj={order}  />
        )) : <p className="text-center text-lg font-bold py-4">Currently, You don't have any pending order.</p>}
        

    </div>


    </div>
    </div>
    </section>
  </div> ) }
  </>
) 
};

export default Dashboard;


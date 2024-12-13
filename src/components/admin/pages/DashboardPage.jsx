import { Link } from "react-router-dom";
import Chart from "../component/Chart";
import DashboardDetailsCard from "../component/DashboardDetailsCard";
import DashboardProduct from "../component/DashboardProduct";
import { Button } from "@/components/ui/button";


const Dashboard = () => {
  
  return <div className=" flex flex-col gap-4 py-4 ">

    {/* Standard details */}
    <div className=" space-y-4">
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardDetailsCard title={"Total Income"} value={"84,5000"} style={true} />
            <DashboardDetailsCard title={"Pending Orders"} value={"10"} />
            <DashboardDetailsCard title={"All Products"} value={"50"} />

          </div>
    </div>

    {/* Chart and details section */}
    <section className=" flex flex-col lg:flex-row gap-4 ">
      
      {/* chart */}
      <Chart />

    <div className=" flex flex-col w-full lg:w-[40%] h-full gap-2 ">

      {/* Payment status  */}
    <div className=" lg:h-1/3 bg-[#fbede7] rounded-lg ">
      <h2 className=" text-center text-lg font-semibold border-b border-black py-2">Payment Status of Orders</h2>
      <div className="flex gap-2 items-center justify-center px-4">
            <div className=" w-1/2 border-r border-black my-2">
              <h1 className=" text-center text-2xl font-bold my-3">COD</h1>
              <p className=" text-center text-xl font-semibold">23</p>
            </div>
            <div className="w-1/2 my-2">
            <h1 className=" text-center text-2xl font-bold my-3">ONLINE</h1>
            <p className=" text-center text-xl font-semibold">10</p>
            </div>
      </div>
    </div>

    <div className="  lg:h-2/3 my-2">
      
      {/* heading */}
      <div className=" flex items-center justify-between gap-4">
        <h1 className=" text-lg font-semibold ml-2">Latest Orders</h1>
        <Link to={"/admin/orders"} className=" text-blue-600"> <Button variant="link" >Show All</Button> </Link>
      </div>

      <div className="flex lg:flex-col gap-2 overflow-x-scroll md:overflow-auto">
        <DashboardProduct />
        <DashboardProduct />
        <DashboardProduct />
        <DashboardProduct />
        <DashboardProduct />
      </div>
    </div>


    </div>
    </section>
  </div>;
};

export default Dashboard;


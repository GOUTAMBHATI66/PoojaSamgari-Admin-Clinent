// import { XAxis, CartesianGrid, YAxis } from "recharts";
// import { Line, LineChart } from "recharts"

// import {
//     Card,
//     CardContent,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
//   import {
    
//     ChartContainer,
   
//   } from "@/components/ui/chart"
// import { Legend, Tooltip } from "chart.js";
  

// const Chart = ({productsArr}) => {

//   //  Transform incoming data for chart usage
//    const chartData = productsArr?.map((product) => ({
//     productName: product.productName,
//     currentMonthIncome: product._sum.price,
    
//   }));

//     const chartConfig = {
//         desktop: {
//           label: "Desktop",
//           color: "#2563eb",
//         },
//         mobile: {
//           label: "Mobile",
//           color: "#60a5fa",
//         },
//         iPad: {
//           label: "iPad",
//           color: "#FF6F00"
//         }
//       }

//   return (

//   <Card className="w-full lg:w-[60%] h-fit"> 
//   <CardHeader>
//     <CardTitle>Product Sales Analytics</CardTitle>
   
//   </CardHeader>
//   <CardContent>
//     <ChartContainer config={chartConfig}>
//       <LineChart
//         accessibilityLayer
//         data={chartData}
//         margin={{
//           left: 12,
//           right: 12,
//         }}
//       >
//         <CartesianGrid vertical={false} />
//         <XAxis
//           dataKey="productName"
//           tickLine={false}
//           axisLine={false}
//           tickMargin={8}
//           tickFormatter={(value) => value.slice(0, 3)}
//         />
        
//         <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="currentMonthIncome"
//             name="Current Month Income"
//             stroke="#2563eb"
//             strokeWidth={2}
//             dot={false}
//           />
         
//       </LineChart>
//     </ChartContainer>
//   </CardContent>
//   <CardFooter>
//     <div className="flex w-full items-start gap-2 text-sm">
//       <div className="grid gap-2">
//         <div className="flex items-center gap-2 leading-none text-black text-base">
//           Most chekout products over the period
//         </div>
//       </div>
//     </div>
//   </CardFooter>
//   </Card>
//   )
// }

// export default Chart

import { XAxis, CartesianGrid, YAxis, Tooltip, Legend, Bar, BarChart } from "recharts";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Chart = ({ productsArr }) => {
  // Transform incoming data for chart usage
  const chartData = productsArr?.map((product) => ({
    productName: product.productName,
    currentMonthIncome: product._sum.price,
  }));

  return (
    <Card className="w-full lg:w-[60%] h-fit">
      <CardHeader>
        <CardTitle>Product Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          width={600}
          height={300}
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="productName"
            tickLine={false}
            axisLine={false}
            tickMargin={6}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <Tooltip />
          
          <Bar
            dataKey="currentMonthIncome"
            name="Current Month Income"
            fill="#1F4FD8"
            label={{ position: "top", fill: "#000" }}
          />
        </BarChart>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-black text-base">
              Most checkout products over the period
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Chart;

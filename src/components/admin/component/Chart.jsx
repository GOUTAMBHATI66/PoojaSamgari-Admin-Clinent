import { XAxis, CartesianGrid } from "recharts";
import { Line, LineChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
  

const Chart = () => {

    const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "#2563eb",
        },
        mobile: {
          label: "Mobile",
          color: "#60a5fa",
        },
        iPad: {
          label: "iPad",
          color: "#FF6F00"
        }
      }
      
      
        const chartData = [
          { month: "July", desktop: 184, mobile: 127, iPad:100 },
          { month: "August", desktop: 224, mobile: 240, iPad:70 },
          { month: "Sepetember", desktop: 114, mobile: 285, iPad:230 },
          { month: "October", desktop: 224, mobile: 199, iPad:120 },
          { month: "November", desktop: 194, mobile: 225, iPad:120 },
          { month: "Devember", desktop: 274, mobile: 140, iPad:170 },
          
        ]

  return (

  <Card className="w-full lg:w-[60%] h-fit"> 
  <CardHeader>
    <CardTitle>Analytics</CardTitle>
    <CardDescription>July - December 2024</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="iPad"
          type="monotone"
          stroke="var(--color-iPad)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  </CardContent>
  <CardFooter>
    <div className="flex w-full items-start gap-2 text-sm">
      <div className="grid gap-2">
        <div className="flex items-center gap-2 leading-none text-black text-base">
          Most chekout products over the period
        </div>
      </div>
    </div>
  </CardFooter>
  </Card>
  )
}

export default Chart
'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", mentions: 186 },
  { month: "February", mentions: 305 },
  { month: "March", mentions: 237 },
  { month: "April", mentions: 273 },
  { month: "May", mentions: 209 },
  { month: "June", mentions: 214 },
  { month: "July", mentions: 234 },
]

const chartConfig = {
  mentions: {
    label: "Mentions",
    color: "hsl(var(--primary))",
  },
}

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
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
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="mentions"
          type="natural"
          fill="var(--color-mentions)"
          fillOpacity={0.4}
          stroke="var(--color-mentions)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
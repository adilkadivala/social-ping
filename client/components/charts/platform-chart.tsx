'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { platform: "Twitter", mentions: 275 },
  { platform: "Reddit", mentions: 200 },
  { platform: "LinkedIn", mentions: 187 },
  { platform: "YouTube", mentions: 173 },
]

const chartConfig = {
  mentions: {
    label: "Mentions",
    color: "hsl(var(--primary))",
  },
}

export function PlatformChart() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="platform"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="mentions" fill="var(--color-mentions)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
'use client';

import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { sentiment: "positive", mentions: 275, fill: "var(--color-positive)" },
  { sentiment: "neutral", mentions: 200, fill: "var(--color-neutral)" },
  { sentiment: "negative", mentions: 87, fill: "var(--color-negative)" },
]

const chartConfig = {
  mentions: {
    label: "Mentions",
  },
  positive: {
    label: "Positive",
    color: "hsl(142 76% 36%)",
  },
  neutral: {
    label: "Neutral", 
    color: "hsl(215 20% 65%)",
  },
  negative: {
    label: "Negative",
    color: "hsl(0 84% 60%)",
  },
}

export function SentimentChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="mentions"
          nameKey="sentiment"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="sentiment" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
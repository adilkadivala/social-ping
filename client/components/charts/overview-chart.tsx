'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', mentions: 65, sentiment: 78 },
  { name: 'Feb', mentions: 89, sentiment: 82 },
  { name: 'Mar', mentions: 123, sentiment: 75 },
  { name: 'Apr', mentions: 156, sentiment: 88 },
  { name: 'May', mentions: 178, sentiment: 85 },
  { name: 'Jun', mentions: 203, sentiment: 92 },
  { name: 'Jul', mentions: 234, sentiment: 89 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorMentions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Area
          type="monotone"
          dataKey="mentions"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorMentions)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
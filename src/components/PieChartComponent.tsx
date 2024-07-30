/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  interface pieInfo{
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index } : pieInfo) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };  
const PieChartComponent:React.FC = () => {
  return (
    <div>
        <ResponsiveContainer width="100%" height={250}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={95}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        </ResponsiveContainer>
        <div className='px-5 mb-3'>
            <div className='grid grid-cols-4'>
                {
                    data.map((item, index) => (
                        <p key={index} className='cursor-pointer font-bold'>{item.name}</p>
                    ))
                }
            </div>
            <div className='grid grid-cols-4' >
                {
                    COLORS.map((item, index) => (
                        <p key={index} className='cursor-pointer h-4 w-4' style={{backgroundColor:item}}></p>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default PieChartComponent
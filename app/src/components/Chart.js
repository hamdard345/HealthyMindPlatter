import React from "react";
/**
 *@author noorullah niamatullah
 * @param {data*} props weekly report of activity
 * @returns a chart using recharts library
 */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Chart = (props) => {
  const data = props.cat;
  return (
    <div>
      <BarChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="WeeklyTimeSpent" fill="#8884d8" />
        <Bar dataKey="WeeklyGoal" fill={"#82ca9d"} />
      </BarChart>
    </div>
  );
};

export default Chart;

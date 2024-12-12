//@ts-nocheck
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import SquareIcon from "@mui/icons-material/Square";

const darkColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"]; // Dark colors for bars

const SimpleBarChart = ({ dataObject = {} }: any) => {
  // Guard against null/undefined dataObject
  if (!dataObject) {
    return (
      <div className="flex items-center justify-center text-center min-h-[15rem]">
        No Data Found
      </div>
    );
  }

  const data = Object.keys(dataObject)
    .filter((key) => key !== "total") // Filter out the total key
    .map((key, index) => ({
      status: key.replace(/_/g, " "), // Replace all underscores with spaces
      count: dataObject[key] || 0,
      fill: darkColors[index % darkColors.length],
    }));

  const LegendCustom = () => {
    return (
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((o, idx) => (
          <div
            className="flex ml-2 text-sm items-start gap-1.5 capitalize"
            key={idx}
          >
            <SquareIcon
              fontSize="smallest"
              sx={{ color: o.fill }}
              className="mt-[3px]"
            />
            <div>
              {o?.status} - {o?.count}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Check if all values are zero
  const hasNonZeroValues = Object.values(dataObject)
    .filter((value) => typeof value === "number")
    .some((value) => value > 0);

  if (!hasNonZeroValues) {
    return (
      <div className="flex items-center justify-center text-center min-h-[15rem]">
        No Data Found
      </div>
    );
  }

  return (
    <ResponsiveContainer height={315}>
      <BarChart data={data} margin={{ top: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis>
          <Label
            value="Number of Orders"
            angle={-90}
            position="insideLeft"
            offset={0}
            dx={10}
            dy={60}
          />
        </YAxis>
        <Tooltip />
        <Legend
          align="center"
          verticalAlign="bottom"
          content={<LegendCustom />}
        />
        <Bar dataKey="count" label={null} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;

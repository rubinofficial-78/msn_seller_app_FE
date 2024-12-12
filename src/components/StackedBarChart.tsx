//@ts-nocheck
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import SquareIcon from "@mui/icons-material/Square";

const data = [
  {
    name: "Product 1",
    "accepted": 20,
    "completed": 15,
    "in_progress": 5,
    "cancelled": 3,
  },
  {
    name: "Product 2",
    "accepted": 30,
    "completed": 15,
    "in_progress": 5,
    "cancelled": 3,
  },
  {
    name: "Product 3",
    "accepted": 10,
    "completed": 15,
    "in_progress": 5,
    "cancelled": 3,
  },
  {
    name: "Product 4",
    "accepted": 20,
    "completed": 15,
    "in_progress": 5,
    "cancelled": 3,
  },
  // {
  //   name: "Product 5",
  //   "accepted": 30,
  //   "completed": 15,
  //   "in_progress": 5,
  //   "cancelled": 3,
  // },
  // {
  //   name: "Product 6",
  //   "accepted": 10,
  //   "completed": 15,
  //   "in_progress": 5,
  //   "cancelled": 3,
  // },
];

const StackedBarChart = ({memoizedData}) => {
  // const memoizedData = useMemo(() => data, []);

  const LegendCustom = (props) => {
    const { payload } = props;
    return (
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 mb-5">
      {payload?.map((o, idx) => (
        <div
          className="flex ml-2 text-sm items-start gap-1.5 capitalize"
          key={idx}
        >
          <SquareIcon fontSize="smallest" sx={{ color: o.color }} className="mt-[3px]"/>
          {/* {convertToCamelCase(o.name)} - {o.percentage}% */}
          <div>
            {o?.value}
          </div>
        </div>
      ))}
    </div>
    );
  };

  return (
    memoizedData?.length > 0 ? (
      <ResponsiveContainer height={300}>
        <BarChart
          data={memoizedData}
          margin={{
            top: 7,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Seller List" position="insideBottom" offset={-10} />
          </XAxis>
          <YAxis>
            <Label
              value="Number of Orders"
              angle={-90}
              position="insideLeft"
              offset={0}
              dx={-10}
              dy={40}
            />
          </YAxis>
          <Tooltip />
          <Legend
            content={<LegendCustom />}
            layout="horizontal"
            verticalAlign="top"
            align="center"
          />
          
          {/* <Bar dataKey="Accepted_Counter" name="Accepted Orders" stackId="b" fill="#FBD5D5">
            </Bar> */}
          <Bar dataKey="Fulfilled Orders" name="Fulfilled Orders" stackId="b" fill="#D5E6FB">
          </Bar>
          <Bar dataKey="In progress Orders" name="In progress Orders" stackId="b" fill="#FBECD5">
          </Bar>
          <Bar dataKey="Canceled Items" name="Canceled Orders" stackId="b" fill="#FBD5D5">
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <div className="flex items-center justify-center text-center min-h-[10rem]">No Data Found</div>
    )
    
  );
};

export default StackedBarChart;

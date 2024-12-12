//@ts-nocheck
import { useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import SquareIcon from "@mui/icons-material/Square";
import { convertToCamelCase } from "../../utils/stringUtils";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill}>
        {/* {payload?.percentage?.toFixed()}% */}
        {Math.round(payload?.percentage)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - 1}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
    </g>
  );
};

const PieChartComp = (props) => {
  const { data, showLabel = false } = props;
  const [activeIndex, setActiveIndex] = useState(data?.findIndex((o) => o?.percentage > 0));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      {data?.every((category) => category.count === 0) ? (
        <div className="flex justify-center items-center h-[40vh] text-lg text-gray-500">No orders placed</div>
      ) : (
        <>
          <div className="flex justify-center">
            <PieChart width={250} height={250}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={35}
                outerRadius={75}
                fill="#8884d8"
                dataKey="percentage"
                onMouseEnter={onPieEnter}
                label={showLabel}
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
              {data?.map((o, idx) => (
                <div
                  className="flex ml-2 text-sm items-start gap-1.5 capitalize"
                  key={idx}
                >
                  <SquareIcon fontSize="smallest" sx={{ color: o.color }} className="mt-[3px]"/>
                  {/* {convertToCamelCase(o.name)} - {o.percentage}% */}
                  <div>
                    {o?.name} - {o?.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PieChartComp;

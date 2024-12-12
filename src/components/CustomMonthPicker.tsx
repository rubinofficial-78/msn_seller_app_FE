//@ts-nocheck
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import "react-datepicker/dist/react-datepicker.css";

const CustomMonthPicker = (props) => {
  const { onChange } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    onChange(date);
    setSelectedDate(date);
  };
  const CustomInputIcon = ({ value, onClick }) => (
    <div
      onClick={onClick}
      className="px-2 py-1 cursor-pointer border rounded-xl flex gap-2 items-center"
    >
      <CalendarMonthIcon
        style={{
          backgroundColor: "#D5E6FB",
          color: "#416BFF",
          borderRadius: "5px",
        }}
      />
      <div className="text-sm">
        Month-{value}
        <div className="text-gray-400 text-xs">Selected Month</div>
      </div>
    </div>
  );

  return (
    <div>
      {/* <h2>Calendar</h2> */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM"
        showMonthYearPicker
        customInput={<CustomInputIcon />}
      />
    </div>
  );
};

export default CustomMonthPicker;

import React from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const now = dayjs();
  const daysInMonthNumber = now.daysInMonth();
  const days = Array.from({ length: daysInMonthNumber }, (_, index) => index + 1);
  const startDay = now.startOf("month").day();

  return (
    <div>
      <h2>{now.format("MMMM YYYY")}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", width: "210px" }}>
        {Array.from({ length: startDay }, (_, i) => i).map((_, i) => (
          <div style={{ width: "30px", height: "30px" }} key={`empty-${i}`}></div>
        ))}
        {days.map((day) => (
          <div style={{ width: "30px", height: "30px", border: "1px solid black" }} key={day}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

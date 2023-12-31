import React from "react";
import dayjs from "dayjs";

export default function Calendar() {
  const now = dayjs();

  const startMonthDayOfWeek = now.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek }, (_, index) => index);

  const monthDaysNumber = now.daysInMonth();
  const monthDaysNumbersArray = Array.from({ length: monthDaysNumber }, (_, index) => index + 1);

  return (
    <div>
      <h2>{now.format("MMMM YYYY")}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", width: "210px" }}>
        {emptyDaysNumbersArray.map((_, index) => (
          <div style={{ width: "30px", height: "30px" }} key={`empty-${index}`}></div>
        ))}
        {monthDaysNumbersArray.map((day) => (
          <div style={{ width: "30px", height: "30px", border: "1px solid black" }} key={day}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

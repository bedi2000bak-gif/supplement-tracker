import Calendar from "react-calendar";
import { formatLocalDate } from "../utils/date";

function CalendarView({
  onDateChange,
  onMonthChange,
  selectedDate,
  intakeCounts = {},
  supplementCount = 0,
}) {
  function handleDateChange(date) {
    onDateChange(date);
  }

  function dotOpacity(count) {
    if (supplementCount === 0) return 1;

    const ratio = Math.min(count / supplementCount, 1);
    return 0.35 + ratio * 0.65;
  }

  return (
    <div className="card calendar-card">
      <h2>Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        prev2Label={null}
        next2Label={null}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (onMonthChange) {
            onMonthChange(formatLocalDate(activeStartDate).slice(0, 7));
          }
        }}
        tileContent={({ date }) => {
          const dateString = formatLocalDate(date);
          const count = intakeCounts[dateString];

          if (count) {
            return (
              <div
                className="intake-dot"
                style={{ opacity: dotOpacity(count) }}
              />
            );
          }

          return null;
        }}
      />
    </div>
  );
}

export default CalendarView;

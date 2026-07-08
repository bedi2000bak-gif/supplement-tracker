import { formatLocalDate } from "../utils/date";

function Intakes({ intakes, selectedDate }) {
    const isToday =
        !selectedDate ||
        formatLocalDate(selectedDate) === formatLocalDate(new Date());

    const heading = isToday
        ? "Today"
        : selectedDate.toLocaleDateString();

    return (
        <div className="card intake-card">
            <h3>{heading}</h3>

            {intakes.length === 0 ? (
                <p className="empty-text">
                    No intakes for {isToday ? "today" : "this day"}
                </p>
            ) : (
                <ul>
                    {intakes.map(intake => (
                        <li key={intake.id} className="supplement-item">
                            <div className="supplement-icon">
                                {intake.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="supplement-info">
                                <div className="supplement-name">{intake.name}</div>
                                <div className="supplement-dosage">{intake.dosage}</div>
                            </div>

                            <span className="status-chip taken">Taken</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Intakes

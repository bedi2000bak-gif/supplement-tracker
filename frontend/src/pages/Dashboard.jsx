import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SupplementList from "../components/SupplementList";
import SupplementForm from "../components/SupplementForm";
import CalendarView from "../components/Calendar";
import ProgressCard from "../components/ProgressCard";
import Intakes from "../components/Intakes";
import api from "../api/axios";
import { formatLocalDate } from "../utils/date";

function Dashboard() {
    const [supplements, setSupplements] = useState([]);
    const [selectedIntakes, setSelectedIntakes] = useState([]);
    const [todayIntakes, setTodayIntakes] = useState([]);
    const [monthlyIntakes, setMonthlyIntakes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function getIntakes() {
        const today = formatLocalDate(new Date());

        api.get(`/api/intake/${today}`)
            .then((response) => {
                setError(null);
                setTodayIntakes(response.data || []);

                if (formatLocalDate(selectedDate) === today) {
                    setSelectedIntakes(response.data || []);
                }
            })
            .catch(() => {
                setError("Failed to load today's intakes");
            });
    }

    function loadSupplements() {
        api.get("/api/supplements")
            .then((response) => {
                setError(null);
                setSupplements(response.data || []);
            })
            .catch(() => {
                setError("Failed to load supplements");
            });
    }

    function deleteSupplement(id) {
        api.delete(`/api/supplements/${id}`)
            .then(() => {
                loadSupplements();
                getIntakes();

                const month = formatLocalDate(selectedDate).slice(0, 7);
                loadMonthlyIntakes(month);
            })
            .catch(() => {
                setError("Failed to delete supplement");
            });
    }

    function loadMonthlyIntakes(month) {
        api.get(`/api/intake/month/${month}`)
            .then((response) => {
                setError(null);
                setMonthlyIntakes(response.data || []);
            })
            .catch(() => {
                setError("Failed to load monthly intakes");
            });
    }

    function handleDateChange(date) {
        setSelectedDate(date);

        const formattedDate = formatLocalDate(date);
        const month = formattedDate.slice(0, 7);

        api.get(`/api/intake/${formattedDate}`)
            .then((response) => {
                setError(null);
                setSelectedIntakes(response.data || []);
            })
            .catch(() => {
                setError("Failed to load intakes for selected day");
            });

        loadMonthlyIntakes(month);
    }

    useEffect(() => {
        loadSupplements();
        getIntakes();

        const month = formatLocalDate(new Date()).slice(0, 7);
        loadMonthlyIntakes(month);
    }, []);

    const intakeCounts = {};

    (monthlyIntakes || []).forEach((i) => {
        intakeCounts[i.date] = (intakeCounts[i.date] || 0) + 1;
    });

    const taken = todayIntakes.length;
    const total = supplements.length;

    return (
        <div className="dashboard">
            <div className="dashboard-grid">

                <div className="dashboard-header">
                    <div>
                    <h1 className="dashboard-title">
                        Dashboard
                    </h1>

                    <p className="dashboard-subtitle">
                        Track your supplements and build healthy habits.
                    </p>
                    </div>
                    <button className="btn-logout" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>
                        Logout
                    </button>
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <ProgressCard
                    taken={taken}
                    total={total}
                />

                <CalendarView
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    onMonthChange={loadMonthlyIntakes}
                    intakeCounts={intakeCounts}
                    supplementCount={supplements.length}
                />

                <Intakes
                    intakes={selectedIntakes}
                    selectedDate={selectedDate}
                />

                <SupplementList
                    supplements={supplements}
                    intakes={todayIntakes}
                    onDelete={deleteSupplement}
                    onTaken={() => {
                        getIntakes();

                        const month = formatLocalDate(selectedDate)
                            .slice(0, 7);

                        loadMonthlyIntakes(month);
                    }}
                />

                <SupplementForm
                    onAdded={() => {
                        loadSupplements();
                        getIntakes();

                        const month = formatLocalDate(selectedDate)
                            .slice(0, 7);

                        loadMonthlyIntakes(month);
                    }}
                />

            </div>
        </div>
    );
}

export default Dashboard;
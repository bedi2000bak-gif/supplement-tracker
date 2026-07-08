import { useState } from "react";
import api from "../api/axios";
import { formatLocalDate } from "../utils/date";

function IntakeButton({ supplementId, isTaken, onTaken }) {
    const [loading, setLoading] = useState(false)

    function handleClick() {
        setLoading(true)

        const today = formatLocalDate(new Date())

        api.post(
            "/api/intake",
            {
                supplementId,
                date: today
            }
        )
            .then(response => {
                setLoading(false)
                if (onTaken) {
                    onTaken();
                }
            })
            .catch(error => {
                console.error("Error logging intake:", error)
                setLoading(false)
            })
    }

    return (
        <div>
            <button className="btn-primary" onClick={handleClick} disabled={isTaken || loading}>{loading ? "Saving..." : isTaken ? "Taken" : "Take"}</button>
        </div>
    )
}

export default IntakeButton

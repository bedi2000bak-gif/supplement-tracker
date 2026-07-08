import { useState } from "react";
import api from "../api/axios";
import { formatLocalDate } from "../utils/date";

function IntakeButton({ supplementId, isTaken, onTaken, intakeId }) {
    const [loading, setLoading] = useState(false)

    function handleClick() {
        setLoading(true)

        if (isTaken) {
            api.delete(`/api/intake/${intakeId}`)
                .then(() => {
                    if (onTaken) {
                        onTaken();
                    }
                })
                .catch(error => {
                    console.error("Error removing intake:", error)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {

            const today = formatLocalDate(new Date())

            api.post(
                "/api/intake",
                {
                    supplementId,
                    date: today
                }
            )
                .then(response => {
                    
                    if (onTaken) {
                        onTaken();
                    }
                })
                .catch(error => {
                    console.error("Error logging intake:", error)
                   
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <div>
            <button className={isTaken ?"btn-taken" : "btn-primary" } onClick={handleClick} disabled={loading}>{loading ? "Saving..." : isTaken ? (
    <>
        <span className="label-default">Taken</span>
        <span className="label-hover">Undo</span>
    </>
) : "Take"}</button>
        </div>
    )
}

export default IntakeButton

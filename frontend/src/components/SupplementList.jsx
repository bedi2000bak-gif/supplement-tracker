import IntakeButton from "./IntakeButton"

function SupplementList({ supplements, intakes = [], onDelete, onTaken }) {

    if (supplements === null) {
        return (
            <div>
                <p>Loading supplements</p>
            </div>
        )
    }

    if (supplements.length === 0) {
        return (
            <div className="card list-card">
                <h2>Your Supplements</h2>
                <p className="empty-text">No supplements yet — add your first one!</p>
            </div>
        )
    }

    return (
        <div className="card list-card">
            <div>
                <h2>Your Supplements</h2>

                <ul>
                    {supplements.map(supplement => {
                        const todayIntake = intakes.find(intake =>
                            intake.supplement_id === supplement.id
                        );
                        const isTaken = todayIntake !== undefined;
                        

                        return (
                            <li key={supplement.id} className="supplement-item">
                                <div className="supplement-icon">
                                    {supplement.name.charAt(0).toUpperCase()}
                                </div>

                                <div className="supplement-info">
                                    <div className="supplement-name">{supplement.name}</div>
                                    <div className="supplement-dosage">{supplement.dosage}</div>
                                </div>

                                <IntakeButton
                                    supplementId={supplement.id}
                                    intakeId={todayIntake?.id}
                                    isTaken={isTaken}
                                    onTaken={onTaken}
                                />

                                <button
                                    className="btn-delete"
                                    onClick={() => onDelete(supplement.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default SupplementList

import api from "../api/axios";

function SupplementForm({ onAdded }) {

    function handleSubmit(event) {
        event.preventDefault();

        const name = event.target.name.value;
        const dosage = event.target.dosage.value;

        api.post("/api/supplements", { name, dosage })
        .then(response => {
            event.target.reset();

            onAdded();
        })
        .catch(error => {
            console.error("Error adding supplement:", error);
        });
    }

    return (
        <div className="card form-card">
        <div>
            <h2>Add Supplement</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Type of supplement"
                />

                <input
                    name="dosage"
                    type="text"
                    className="form-input"
                    placeholder="Dosage"
                />

                <button
                    type="submit"
                    className="btn-primary btn-full"
                >
                    Add Supplement
                </button>
            </form>
        </div>
        </div>
    );
}

export default SupplementForm;
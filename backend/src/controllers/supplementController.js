const pool = require("../config/db");

const createSupplement = async (req, res) => {
    const { name, dosage } = req.body;

    try {
        const result = await pool.query(
            `
            INSERT INTO supplements (user_id, name, dosage)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [req.user.userId, name, dosage]
        );

        res.json(result.rows[0]);
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getSupplements = async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT * FROM supplements
            WHERE user_id = $1
            `,
            [req.user.userId]
        );

        res.json(result.rows);
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const deleteSupplement = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM intake_logs
            WHERE supplement_id = $1
            AND user_id = $2
            `,
            [id, req.user.userId]
        );
        await pool.query(
            `
            DELETE FROM supplements
            WHERE id = $1 AND user_id = $2
            `,
            [id, req.user.userId]
        );

        res.json({ message: "Supplement deleted" });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = {createSupplement, getSupplements, deleteSupplement};
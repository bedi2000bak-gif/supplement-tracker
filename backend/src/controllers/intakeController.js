const pool = require("../config/db");

// Create a new intake log

const createIntakeLog = async (req, res) => {
    const { supplementId, date } = req.body;

   try {

    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    console.log("creating intake log");

    const result = await pool.query(
        `
        INSERT INTO intake_logs
        (user_id, supplement_id, date)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            req.user.userId,
            supplementId,
            date
        ]
    );

    res.json(result.rows[0]);



    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            error: err.message 
        });
    }
};

// Get intake logs by date

const getIntakeByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const result = await pool.query(
            `
            SELECT
                intake_logs.id,
                intake_logs.supplement_id,
                supplements.name,
                supplements.dosage,
                intake_logs.date
            FROM intake_logs
            JOIN supplements
            ON intake_logs.supplement_id = supplements.id
            WHERE intake_logs.user_id = $1
            AND intake_logs.date = $2
            `,
            [
                req.user.userId,
                date
            ]
        );
        res.json(result.rows);
    
    }catch (err) {
        console.error(err);
        res.status(500).json({ 
            error: err.message 
        });
    }    
}

// Delete an intake log by ID

const deleteIntakeLog = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `
            DELETE FROM intake_logs
            WHERE id = $1
            AND user_id = $2
            `,
            [
                id,
                req.user.userId
            ]
        );
        
        res.json({
            message: "Intake log deleted successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = {
    createIntakeLog,
    getIntakeByDate,
    deleteIntakeLog
};
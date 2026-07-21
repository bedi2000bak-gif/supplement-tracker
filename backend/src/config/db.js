const { Pool } = require("pg");

// DATABASE_URL is used in production (e.g. Neon), which requires SSL.
// Locally, the individual DB_* variables are used instead.
const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    })
    : new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

module.exports = pool;
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'API is working! '});
});

// Start the server

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Routes

const testRoutes = require('./routes/testRoutes');
app.use('/api/test', testRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const supplementRoutes = require("./routes/supplementRoutes");
app.use("/api/supplements", supplementRoutes);

const intakeRoutes = require("./routes/intakeRoutes");
app.use("/api/intake", intakeRoutes);
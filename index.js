const express = require('express');
const path = require('path');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(keys.mongoURI);

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const express = require('express');
const passportConfig = require('./services/passport');
const path = require('path');
const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


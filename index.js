const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


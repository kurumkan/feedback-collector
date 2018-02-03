const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const requireCredits = require('../middlewares/requireCredits');
const Servey = mongoose.model('serveys');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/serveyTemplate')

module.exports = app => {
  app.post('/api/serveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const servey = new Servey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSend: Date.now()
    });
    const mailer = new Mailer(servey, template(servey));

    try {
      await mailer.send();
      await servey.save();

      req.user.credits--;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/serveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });
};


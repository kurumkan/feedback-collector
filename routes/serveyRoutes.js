const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const requireCredits = require('../middlewares/requireCredits');
const Servey = mongoose.model('serveys');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/serveyTemplate');

const _ = require('lodash');
const { URL } = require('url');
const Path = require('path-parser');

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

  app.get('/api/serveys', requireLogin, async (req, res) => {
    try {
      const serveys = await Servey.find({_user: req.user.id})
        .select({ recipients: false });
      res.send(serveys);
    } catch(error) {
      res.send({error});
    }
  });

  app.post('/api/serveys/webhooks', (req, res) => {
    const p = new Path('/api/serveys/:serveyId/:choice');
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, serveyId: match.serveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'serveyId')
      .each(({ serveyId, email, choice }) => {
        Servey.updateOne(
          {
            _id: serveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    res.send({});
  });
};


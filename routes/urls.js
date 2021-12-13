const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');
const utils = require('../utils/utils');
require('dotenv').config({ path: '../.env' });

// Short URL Generator
router.post('/shorturl/', async (req, res) => {
  const original_url = req.body.url;
  const base = process.env.PORT;
  console.log(original_url)
  if (utils.validateUrl(original_url)) {
    try {
      let url = await Url.findOne({ original_url });
      if (url) {
        res.json(url);
      } else {
        const short_url = shortid.generate();

        url = new Url({
          original_url,
          short_url
        });

        await url.save();
        res.json({
          original_url,short_url
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.json({
      "error": "invalid URL"
    });
  }
});

module.exports = router;
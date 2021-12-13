const Express = require('express');
const router = Express.Router();
const Url = require('../models/Url');

router.get('/api/shorturl/:short_url', async (req, res) => {
  try {
    const url = await Url.findOne({ short_url: req.params.short_url });
    if (url) {
      console.log(url)
      url.save();
      return res.redirect(url.original_url);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
const  routes = require('express').Router();
const shortid = require('shortid');
const validUrl = require('valid-url');

const Url = require('../models/urls');
console.log(Url);
// @route   GET /api/urls/<shorturl>

routes.get('/:shorturl', async (req, res) => {
  try{
    const url = await Url.findOne({ "short_url": req.params.shorturl });
    if(url){
      console.log(url);
      res.redirect(url.original_url);
    }else{
      res.status(404).json({ error: 'URL not found' });
    }
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
});


// @route   POST  /api/urls
routes.post('/',  async (req, res) => {
  console.log(req);
  const longurl  = req.body.url;
  const baseUrl = process.env.BASE_URL;
  console.log( longurl,baseUrl);
  if(validUrl.isUri(baseUrl)) {
    try{
      let url = await Url.findOne({ "original_url": longurl });
      if(url) {
        shorturl = url.short_url;
        return res.status(200).json({" short url": `${baseUrl}/api/shorturl/${shorturl}`});
      } else {
        const shorturl = shortid.generate();
        console.log(shorturl);
        url = await Url.create({
          "original_url": longurl,
          "short_url": shorturl
        });
        return res.status(200).json({" short url": `${baseUrl}/api/shorturl/${shorturl}`});
      }
    } catch(err) {
      return res.status(500).json({ message: err });
    }
  }
  else {
    return res.status(401).json({ error: 'Invalid base url' });
  }
});



module.exports = routes;
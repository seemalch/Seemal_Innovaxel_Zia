const express = require('express');
const router = express.Router();
const Url = require('../models/Url.js');
const shortid = require('shortid');
const validUrl = require('valid-url');

// POST /api/shorten
// Shorten a URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  // Validatation
  if (!validUrl.isWebUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    }

    // Create new short URL
    const shortCode = shortid.generate();
    url = new Url({ originalUrl, shortCode });
    await url.save();

    res.status(201).json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/:shortCode/stats
// Get URL stats
router.get('/:shortCode/stats', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      accessCount: url.accessCount,
      createdAt: url.createdAt,
      lastAccessed: url.updatedAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//DELETE /api/:shortCode
//Delete short URL
router.delete('/:shortCode', async (req, res) => {
  try {
    console.log(`Attempting to delete shortCode: ${req.params.shortCode}`);
    const url = await Url.findOneAndDelete({ 
      shortCode: req.params.shortCode 
    });
    
    if (!url) {
      console.log('No URL found with code:', req.params.shortCode);
      return res.status(404).json({ error: 'URL not found' });
    }
    
    console.log('Successfully deleted:', url);
    res.status(204).send();
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

//GET /api/:shortCode
//Redirect to original URL
router.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortCode: req.params.shortCode },
      { $inc: { accessCount: 1 } }
    );

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all URLs
router.get('/', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
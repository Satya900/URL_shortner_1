const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const BASE_URL = 'http://localhost:3000';

router.post('/shorten', async (req, res) => {
  const { longURL, customCode, userId } = req.body;

  if (!longURL || !userId) {
    return res.status(400).json({ error: 'longURL and userId are required' });
  }

  try {
    // Check if a URL with the same longURL & userId already exists
    let existing = await Url.findOne({ longURL, userId });
    if (existing && !customCode) {
      return res.status(200).json({ shortURL: `${BASE_URL}/${existing.shortCode}` });
    }

    let shortCode;

    if (customCode) {
      // Check if the custom code already exists
      const taken = await Url.findOne({ shortCode: customCode });
      if (taken) {
        return res.status(409).json({ error: 'Custom code already taken' });
      }
      shortCode = customCode;
    } else {
      shortCode = nanoid(6);
    }

    const newURL = new Url({
      longURL,
      shortCode,
      userId,
    });

    await newURL.save();

    res.status(201).json({ shortURL: `${BASE_URL}/${shortCode}` });

  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/all/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const urls = await Url.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    urlEntry.clicks++;
    await urlEntry.save();

    return res.redirect(urlEntry.longURL);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

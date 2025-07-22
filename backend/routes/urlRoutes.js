const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const BASE_URL = 'http://localhost:3000'
router.post('/shorten', async (req, res) => {
    const {longURL} = req.body;
    

    // basic validation
    if(!longURL){
        return res.status(400).json({error: 'longURL is required'})
    }

    try {
        let existing = await Url.findOne({longURL});
        if(existing){
            return res.status(200).json({shortURL: `${BASE_URL}/${existing.shortCode}`})
        }

        // generate short code
        const shortCode = nanoid(6);


        // create and save new URL entry
        const newURL = new Url({
            longURL,
            shortCode
        })

        await newURL.save();

        // send response
        res.status(201).json({ shortURL: `${BASE_URL}/${shortCode}`})



    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})



router.get('/all', async (req,res) => {
    try {
        const urls = await Url.find().sort({createdAt:-1});
        res.status(200).json(urls);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

router.get('/:shortCode', async (req,res) => {
    const {shortCode} = req.params;
    try {
        const urlEntry = await Url.findOne({shortCode});

    if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    urlEntry.clicks++;
    await urlEntry.save();

    return res.redirect(urlEntry.longURL);

    } catch (error) {
        console.error('Redirect error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
})

module.exports = router;
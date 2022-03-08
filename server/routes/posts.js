const express = require('express');
const mongoose = require('mongoose');
const { PostMessage } = require('../models/postMessage');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const postMessages = await PostMessage.find({ });
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
});
router.post('/', async (req, res) => {
    const Post = req.body;
    const newPost = new PostMessage(req.body)
    console.log(newPost);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.body.ObjectId

    try {
        const post = PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { make, model, year, mileage, vin, amountPaid, listingAmount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    const updatedPost = { make, model, year, mileage, vin, amountPaid, listingAmount, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })

    res.json(updatedPost)

});
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    await PostMessage.findByIdAndRemove(id);
    
    res.json({ message: "Post deleted successfully."})
});

module.exports = router;
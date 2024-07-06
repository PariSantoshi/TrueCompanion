const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

router.post('/:postId/request', async (req, res) => {
  try {
    const chat = new Chat({ users: [req.user.userId, req.params.postId] });
    await chat.save();
    res.status(201).send(chat);
  } catch (error) {
    res.status(400).send('Error requesting chat');
  }
});

router.post('/:chatId/message', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    chat.messages.push({ sender: req.user.userId, content: req.body.content });
    await chat.save();
    res.status(201).send(chat);
  } catch (error) {
    res.status(400).send('Error sending message');
  }
});

module.exports = router;

const upload = require('../middleware/upload');

router.post('/:chatId/file', upload.single('file'), async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    chat.messages.push({ sender: req.user.userId, content: req.file.path });
    await chat.save();
    res.status(201).send(chat);
  } catch (error) {
    res.status(400).send('Error uploading file');
  }
});

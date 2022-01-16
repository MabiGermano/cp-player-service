const express = require('express');
const router = express.Router();
const serverFunction = require("./server")


router.get('/', (req, res) => {
    res.send({ response: 'I am alive' }).status(200);
  });

router.post('/notify/new-video', (req, res) => {
  const {room} = req.body;
  serverFunction.emitEvent(room.identifier, room.playlist)
  res.send({ response: 'I am alive' }).status(200);
})

module.exports = router;
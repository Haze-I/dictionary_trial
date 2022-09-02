const { default: axios } = require("axios");
const express = require("express");
const Model = require("../models/models");
const router = express.Router();
require("dotenv").config();

// router.get("/word", (req, res) => {
//   axios
//     .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${req.body.word}`)
//     .then((response) => {
//       return res.json(response.data[0]);
//     })
//     .catch((err) => console.log(err));
// });

function addMeaning(word) {
  axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(function (response) {
      onSuccess(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  function onSuccess(response) {
    var word = response.data[0].word;
    var definition = response.data[0].meanings[0].definitions[0].definition;
    var partOfSpeech = response.data[0].meanings[0].partOfSpeech;

    assignDataValue(word, definition, partOfSpeech);
  }

  function assignDataValue(word, definition, partOfSpeech) {
    const data = new Model();
    data.word = word;
    data.definition = definition;
    data.partOfSpeech = partOfSpeech;
    data.save();
  }
}

router.get(":word",  (req, res) => {
  try {
     res.status(200).send(addMeaning(word));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

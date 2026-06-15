const oop = require("./oopQuestions");
const dataStructures = require("./dataStructuresQuestions");
const algorithms = require("./algorithmsQuestions");

function getAllQuestions() {
  return [...oop, ...dataStructures, ...algorithms];
}

module.exports = { getAllQuestions };

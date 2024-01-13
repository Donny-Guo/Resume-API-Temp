const {Schema, model} = require("mongoose");
// Schema is a class that allows us to define the structure of our documents

// Create a new schema for our experiences collection
// each object within the schema must have the following three fields
const ExperienceSchema = new Schema(
  {
    company: String,
    title: String,
    duration: String,
  },
  { collection: "experiences"}
);

// Create a new module for our experience collection
// this model contains all methods we need to interact with 
module.exports = {
  Experiences: model("experiences", ExperienceSchema),
};
const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const knex = require("../db/connection");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

async function list() {
  return db("theaters")
    .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .then(reduceMovies);
}


async function read(theater_id) {
  console.log("theater_id: ",theater_id);
  return await knex("theater as t").select("*").where({ "t.theater_id": theater_id }).first();
}
module.exports = {
  list,
};

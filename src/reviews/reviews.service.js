const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const knex = require("../db/connection");
const tableName = "reviews";
const mapProperties = require("../utils/map-properties");

const addCritics = () => {
  return mapProperties({
    "critic_id": "critic.critic_id",
    "created_at": "critic.created_at",
    "updated_at": "critic.updated_at",
    "preferred_name": "critic.preferred_name",
    "surname": "critic.surname",
    "organization_name": "critic.organization_name",
  });
};

async function destroy(review_id) {
  return await knex("reviews").where({review_id }).del();

}

async function list(movie_id) {
  return await  db("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .where({ movie_id })
      .then(reviews=>reviews.map(addCritics()));
}

async function read(reviewId) {
  return await knex("reviews as r").select("*").where({ "r.review_id": reviewId }).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  const data = await db(tableName)
      .where({ review_id: review.review_id })
      .update(review, "*")
      .then(() => read(review.review_id))
      .then(setCritic);
  return data;
}

module.exports = {
  destroy,
  list,
  read,
  update,
};

const db = require("../db/connection");
const knex = require("../db/connection");

async function list(is_showing) {
    console.log("in service movies listis_showing is ",is_showing);

     const data = await db("movies")
        .select("movies.*")
        .modify((queryBuilder) => {
            if (is_showing!=undefined) {
                console.log("building the query to filter for is_showing")
                queryBuilder
                    .join(
                        "movies_theaters",
                        "movies.movie_id",
                        "movies_theaters.movie_id"
                    )
                    .where({ "movies_theaters.is_showing": true })
                    .groupBy("movies.movie_id");
            }
        });

     return data;
}



async function read(movie_id) {
    console.log("movie_id: ",movie_id);
    return await knex("movies as m").select("*").where({ "m.movie_id": movie_id }).first();
}

module.exports = {
  list,
  read,
};

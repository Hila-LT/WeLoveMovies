/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*
movie_id: (Primary Key) A unique ID for the movie.
title: (String) The title of the movie.
runtime_in_minutes: (Integer) The length of the movie in minutes.
rating: (String) The rating given to the movie.
description: (Text) A shortened description of the movie.
image_url: (String) A URL to the movie's poster.
 */

exports.up = function(knex) {
    return knex.schema.createTable("movies", (table) => {
        table.increments("movie_id").primary();
        table.string("title");
        table.integer("runtime_in_minutes")
        table.enum("rating", ["G", "PG", "PG-13", "R", "NC-17", "NR"]);
        table.text("description");
        table.string("image_url");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("movies");
};

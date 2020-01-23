exports.up = function(knex, Promise) {
  return knex.schema.createTable("experiences", experience => {
    experience.increments();
    experience
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    experience.string("title", 128).notNullable();
    experience.string("date", 128).notNullable();
    experience.string("location", 128).notNullable();
    experience.string("price", 128);
    experience.string("description", 400);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("experience");
};

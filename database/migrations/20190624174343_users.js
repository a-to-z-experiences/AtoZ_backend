exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", user => {
    user.increments();
    user
      .string("username", 255)
      .notNullable()
      .unique();
    user.string("password", 255).notNullable();
    user.string("first_name", 255).notNullable();
    user.string("last_name", 255).notNullable();
    user.string("email", 255);
    user.string("city", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user");
};

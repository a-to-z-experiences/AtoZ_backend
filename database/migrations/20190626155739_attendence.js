exports.up = function(knex, Promise) {
  return knex.schema.createTable("attendance", attendance => {
    attendance.increments();
    attendance
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    attendance
      .integer("experiences_id")
      .unsigned()
      .references("id")
      .inTable("experiences")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("attendance");
};

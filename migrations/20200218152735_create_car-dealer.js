
exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {

    table.increments();

    table
        .string("VIN", 32)
        .notNullable()
        .index();
    
    table.string("make", 32);
    table.string("model", 32);
    table.integer("mileage", 8);
    table.string("transmission", 32);
    table.string("titleStatus", 32);

  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};

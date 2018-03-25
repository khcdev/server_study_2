exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('user', function(table) {
            table.increments('id').primary().notNullable();
            table.string('name', 10).notNullable();
            table.string('email', 30).notNullable();
            table.string('password', 20).notNullable();
            table.string('token');
        }),
        knex.schema.createTable('board', function(table) {
            table.increments('id').primary().notNullable();
            table.integer('type').unsigned().notNullable(); // 게시판 타입
            table.string('title', 10).notNullable(); // 제목
            table.string('content').notNullable();
            table.integer('author').unsigned().references('id').inTable('user');
        }),
        knex.schema.createTable('reply', function(table) {
            table.increments('id').primary().notNullable();
            table.string('content').notNullable();
            table.integer('board').unsigned().references('id').inTable('board');
        })
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('user'),
        knex.schema.dropTable('board'),
        knex.schema.dropTable('reply'),
    ])
};
import knex from 'knex';

const connection = knex({
  client: 'postgresql',
  connection: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  },
});

export default connection;

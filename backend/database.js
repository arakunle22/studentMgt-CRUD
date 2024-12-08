const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: isProduction
    ? process.env.DB_URL_INTERNAL // Use internal URL in production
    : process.env.DB_URL_EXTERNAL, // Use external URL locally
  ssl: isProduction ? false : { rejectUnauthorized: false }, // Only use SSL for external connections
});

module.exports = pool;




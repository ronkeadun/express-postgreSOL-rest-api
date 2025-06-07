const Pool = require("pg").Pool

const pool = new Pool({
    user : process.env.PG_USER,
    host : process.env.PG_HOST,
    database : process.env.DB_NAME, 
    port : process.env.PG_PORT,
    idleTimeoutMillis: 30000,   // close idle clients after 30s
    connectionTimeoutMillis: 5000, // return error after 5s if cannot connect
})

// Handle connection-level errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
  // Consider shutting down the app if needed
  process.exit(-1);
});

// Optional: test connection on startup
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected');
    client.release();
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
    process.exit(1);
  }
})();

module.exports = pool


import express from 'express';
import mysql from 'mysql';

// Create Express 
const app = express();
const PORT = 3306;
var router = express.Router();
// Create MySQL connection
const pool = mysql.createPool({
  host: '198.251.89.82', 
  user: 'smarterc_root',      
  password: 'RcwnSY20',
  database: 'smarterc_root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API Get from MySQL 
router.get('/', function(req, res, next) {
    pool.connect();
// app.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.log('sql error:', error.message );
      return res.status(500).json({ error: error.message });
    }
    console.log('sql results:', results );
    res.json(results);
  });
  pool.end();
});

// Server listener 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = router;
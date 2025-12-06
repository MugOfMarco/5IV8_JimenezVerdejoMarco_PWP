require('dotenv').config();
const mysql = require('mysql2');

// Crear pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisificar para usar async/await
const promisePool = pool.promise();

// Inicializar la base de datos
async function initDB() {
  try {
    // Crear tabla si no existe
    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS scores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        player VARCHAR(1) NOT NULL,
        wins INT DEFAULT 0,
        UNIQUE(player)
      )
    `);

    // Insertar jugadores iniciales si no existen
    await promisePool.query(`INSERT IGNORE INTO scores (player, wins) VALUES ('X', 0)`);
    await promisePool.query(`INSERT IGNORE INTO scores (player, wins) VALUES ('O', 0)`);
    
    console.log('Base de datos MySQL inicializada correctamente');
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
}

initDB();

module.exports = promisePool;
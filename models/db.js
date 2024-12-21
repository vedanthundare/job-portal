const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',          
    user: 'root',               
    password: 'vedant@2003',    
    database: 'job_portal',     
    port: 3306                 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL Database:', err.message);
        return; 
    }
    console.log('Connected to MySQL Database!');
});


module.exports = connection;

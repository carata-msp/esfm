const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
    connectionString: 'postgresql://postgres:codigosexamen@db.pjzfrnhnczoqcmehsmzm.supabase.co:5432/postgres',
});

async function setupDatabase() {
    try {
        await client.connect();
        console.log('Conectado a PostgreSQL');

        const sql = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf8');
        await client.query(sql);

        console.log('✅ Tabla "codes" creada exitosamente');
    } catch (error) {
        console.error('Error al configurar la base de datos:', error);
    } finally {
        await client.end();
    }
}

setupDatabase();

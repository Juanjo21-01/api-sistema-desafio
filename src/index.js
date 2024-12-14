import app from './app.js';
import { conexionBD } from './config/db.js';

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
});

// Conectar a la base de datos
conexionBD();

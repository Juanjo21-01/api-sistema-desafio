# API Sistema Desafío Web 360 🏪

Este proyecto es una API para el sistema del Desafío Web 360, llamado "Mi tiendita online".

## Desarrollado por 🧑‍💻

- Juan José Hernández López

## Tecnologías utilizadas 🛠️

- [Node.js](https://nodejs.org/es/) - Entorno de ejecución para JavaScript
- [Express.js](https://expressjs.com/es/) - Framework de Node.js
- [SQL Server](https://www.microsoft.com/es-es/sql-server/sql-server-2019) - Sistema de gestión de bases de datos
- [Sequelize](https://sequelize.org/) - ORM para Node.js

## Instalación 🔧

1. Clonar el repositorio

```bash
git clone
```

2. Instalar las dependencias

```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno

```env
DB_HOST=localhost
DB_PORT=1433
DB_DATABASE=DesafioWeb360
DB_USERNAME=TuUsuario
DB_PASSWORD=TuContraseña
DB_CONNECTION=mssql
```

**Nota:** También puedes copiar el archivo `.env.example` y renombrarlo a `.env` y actualizar las variables de entorno.

4. Crear la base de datos en SQL Server con el nombre `DesafioWeb360`

## Datos Iniciales 📦

Se trabajó con el ORM de Sequelize, por lo que se crearon los modelos y las migraciones necesarias para la base de datos.

**Nota:** Debes de configurar el archivo [config/config.json](src/database/config/config.json.example) con los datos de tu base de datos. Se proporciona un archivo de ejemplo.

1. Para utilizar las migraciones, ejecuta el siguiente comando

```bash
npx sequelize-cli db:migrate
```

2. Para cargar los datos iniciales, ejecuta el siguiente comando

```bash
npx sequelize-cli db:seed:all
```

## Ejecución 🚀

Para ejecutar el proyecto, utiliza el siguiente comando

```bash
npm run dev
```

## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE.txt) para detalles

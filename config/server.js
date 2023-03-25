const cors = require('cors');

app.use(cors())

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1338),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  database: {
    client: env('DATABASE_CLIENT', 'postgres'),
    host: env('DATABASE_HOST'),
    port: env.int('DATABASE_PORT'),
    database: env('DATABASE_NAME'),
    username: env('DATABASE_USERNAME'),
    password: env('DATABASE_PASSWORD'),
    ssl: env.bool('DATABASE_SSL', false),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
  plugins: {
    upload: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
  cors: {
    enabled: true,
    origin: '*',
  },
  middleware: {
    // Configuración de CORS
    load: {
      before: ['cors', 'poweredBy', 'strapi_admin'],
      after: ['parser', 'router'],
    },
    settings: {
      cors: {
        enabled: true,
        origin: env('CORS_ORIGIN', '*'), // Cambiar por el dominio que corresponda
      },
    },
  },
});

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv').config();
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const path = require('path');
// const adminRoutes = require('./src/routes/adminsRoutes');
// const artistRoutes = require('./src/routes/artistsRoutes');
// const postsRoutes = require('./src/routes/postsRoutes');
// const forosRoutes = require('./src/routes/forosRoutes');
// const commentRoutes = require('./src/routes/commentsRoutes');
// const musicRoutes = require('./src/routes/musicRoutes');
// const usersRoutes = require('./src/routes/usersRoutes');
// const usersartistRoutes = require('./src/routes/artists&usersRoutes');
// const Usuario = require('./src/models/usersModel');
// const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');

// const app = express();

// // const corsOptions = {
// //     origin: '*', 
// //     optionsSuccessStatus: 200
// //   };
  
// // app.use(cors(corsOptions));

// // Configure CORS to only allow specific origins
// const allowedOrigins = ['https://cybermusik.onrender.com'];

// app.use(cors({
//   origin: function (origin, callback) {
//     // If origin is in allowedOrigins, grant access, otherwise deny it
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);  // Allow request
//     } else {
//       callback(new Error('Not allowed by CORS'));  // Deny request
//     }
//   }
// }));

// app.use(express.json());
// // Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// // Enable HSTS (Strict Transport Security)
// app.use(helmet.hsts({
//     maxAge: 31536000,          // 1 year in seconds
//     includeSubDomains: true,   // Apply to subdomains as well
//     preload: true              // Add to HSTS preload list (optional)
// }));

// // Enable X-Frame-Options header to prevent clickjacking
// app.use(helmet.frameguard({ action: 'sameorigin' }));
// //app.use(helmet.frameguard({ action: 'deny' }));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api', usersartistRoutes)
// app.use('/api', adminRoutes);
// app.use('/api', artistRoutes);
// app.use('/api', postsRoutes);
// app.use('/api', forosRoutes);
// app.use('/api', commentRoutes);
// app.use('/api', musicRoutes);
// app.use('/api', usersRoutes);

// const MONGO = {
//     DB_HOST: process.env.DB_HOST,
//     DB_USER: process.env.DB_USER,
//     DB_PASS: process.env.DB_PASS,
//     DB_NAME: process.env.DB_NAME,
//     DB_CLUSTER: process.env.DB_CLUSTER
// };

// const mongoUrl = `${MONGO.DB_HOST}://${MONGO.DB_USER}:${MONGO.DB_PASS}@${MONGO.DB_CLUSTER}/${MONGO.DB_NAME}?retryWrites=true&w=majority`;

// const port = process.env.PORT || 3000;

// app.set('view engine', 'ejs');

// mongoose.connect(mongoUrl).then(() => {
//     Usuario.syncIndexes()
//             .then(() => {
//                 console.log("Índices sincronizados correctamente");
//             })
//             .catch(err => {
//                 console.error("Error sincronizando índices: ", err);
//             });
//     app.listen(port, () => {
//         console.log(`La app esta funcionando en el puerto ${port}...`);
//     });
// }).catch(err => {
//     console.log('No se pudo conectar...', err);
// });

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/views/index/index.html'));
//   });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/views/errors/404.html'));
//   });


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Importar las rutas
const adminRoutes = require('./src/routes/adminsRoutes');
const artistRoutes = require('./src/routes/artistsRoutes');
const postsRoutes = require('./src/routes/postsRoutes');
const forosRoutes = require('./src/routes/forosRoutes');
const commentRoutes = require('./src/routes/commentsRoutes');
const musicRoutes = require('./src/routes/musicRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const usersartistRoutes = require('./src/routes/artists&usersRoutes');

// Importar modelo de usuario
const Usuario = require('./src/models/usersModel');

const app = express();

// Configuración de CORS
const allowedOrigins = [
  'https://cybermusik.onrender.com', // Producción
  'http://localhost:3000'           // Desarrollo local
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (por ejemplo, herramientas de prueba como Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  }
}));

app.use(express.json());
app.use(mongoSanitize());

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrcAttr: ["'unsafe-inline'"],
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://ajax.googleapis.com",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://code.jquery.com",
        "https://maxcdn.bootstrapcdn.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://maxcdn.bootstrapcdn.com",
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://maxcdn.bootstrapcdn.com"
      ],
      imgSrc: ["'self'", "data:", "https://source.unsplash.com"],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://maxcdn.bootstrapcdn.com"
      ],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    },
  },
}));


// Seguridad adicional
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));
app.use(helmet.frameguard({ action: 'sameorigin' }));

// Asegúrate de servir la carpeta 'fonts'
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

// Limitar las tasas de solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // Limitar a 1000 solicitudes por IP
  message: "Demasiadas solicitudes desde esta IP, por favor intente de nuevo más tarde"
});
app.use(limiter);

// Configuración de rutas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', usersartistRoutes);
app.use('/api', adminRoutes);
app.use('/api', artistRoutes);
app.use('/api', postsRoutes);
app.use('/api', forosRoutes);
app.use('/api', commentRoutes);
app.use('/api', musicRoutes);
app.use('/api', usersRoutes);

// Conexión a MongoDB
const MONGO = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_CLUSTER: process.env.DB_CLUSTER
};

const mongoUrl = `${MONGO.DB_HOST}://${MONGO.DB_USER}:${MONGO.DB_PASS}@${MONGO.DB_CLUSTER}/${MONGO.DB_NAME}?retryWrites=true&w=majority`;

// Usar async/await para la conexión
async function startServer() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Conectado a MongoDB");

    await Usuario.syncIndexes();
    console.log("Índices sincronizados correctamente");

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`La app está funcionando en el puerto ${port}...`));
  } catch (err) {
    console.error('No se pudo conectar a MongoDB...', err);
  }
}

startServer();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/views/index/index.html'));
});

// Ruta para errores 404
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, './public/views/errors/404.html'));
});

// Middleware de manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.status === 404) {
    return res.status(404).json({ message: 'Recurso no encontrado', error: err.message });
  }

  if (err.status === 401) {
    return res.status(401).json({ message: 'Acceso no autorizado', error: err.message });
  }

  if (err.status === 403) {
    return res.status(403).json({ message: 'Prohibido', error: err.message });
  }

  res.status(500).json({
    message: 'Error interno del servidor',
    error: err.message || 'Ha ocurrido un error inesperado'
  });
});

<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://ajax.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://code.jquery.com https://maxcdn.bootstrapcdn.com;">

  

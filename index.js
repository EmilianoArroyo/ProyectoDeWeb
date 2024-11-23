const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const adminRoutes = require('./src/routes/adminsRoutes');
const artistRoutes = require('./src/routes/artistsRoutes');
const postsRoutes = require('./src/routes/postsRoutes');
const forosRoutes = require('./src/routes/forosRoutes');
const commentRoutes = require('./src/routes/commentsRoutes');
const musicRoutes = require('./src/routes/musicRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const usersartistRoutes = require('./src/routes/artists&usersRoutes');
const Usuario = require('./src/models/usersModel');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const app = express();

// const corsOptions = {
//     origin: '*', 
//     optionsSuccessStatus: 200
//   };
  
// app.use(cors(corsOptions));

// Configure CORS to only allow specific origins
const allowedOrigins = ['localhost:3000', 'https://cybermusik.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Enable HSTS (Strict Transport Security)
app.use(helmet.hsts({
    maxAge: 31536000,          // 1 year in seconds
    includeSubDomains: true,   // Apply to subdomains as well
    preload: true              // Add to HSTS preload list (optional)
}));

// Enable X-Frame-Options header to prevent clickjacking
app.use(helmet.frameguard({ action: 'sameorigin' }));
//app.use(helmet.frameguard({ action: 'deny' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', usersartistRoutes)
app.use('/api', adminRoutes);
app.use('/api', artistRoutes);
app.use('/api', postsRoutes);
app.use('/api', forosRoutes);
app.use('/api', commentRoutes);
app.use('/api', musicRoutes);
app.use('/api', usersRoutes);

const MONGO = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_CLUSTER: process.env.DB_CLUSTER
};

const mongoUrl = `${MONGO.DB_HOST}://${MONGO.DB_USER}:${MONGO.DB_PASS}@${MONGO.DB_CLUSTER}/${MONGO.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

mongoose.connect(mongoUrl).then(() => {
    Usuario.syncIndexes()
            .then(() => {
                console.log("Índices sincronizados correctamente");
            })
            .catch(err => {
                console.error("Error sincronizando índices: ", err);
            });
    app.listen(port, () => {
        console.log(`La app esta funcionando en el puerto ${port}...`);
    });
}).catch(err => {
    console.log('No se pudo conectar...', err);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/views/index/index.html'));
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/views/errors/404.html'));
  });


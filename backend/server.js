const path = require('path');
const colors = require('colors');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const userRoutes = require('./routes/userRoutes');
// const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
connectDB();

const app = express();

// To know which route is calling. Using morgan for that
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Middleware
app.use(express.json()); // For accepting json data, POST

// Route Middlewares
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/upload', uploadRoutes);

// Preparation for production deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}
// Error Middlewares

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);

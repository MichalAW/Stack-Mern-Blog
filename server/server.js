const express = require('express');
const sanitize = require('mongo-sanitize');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const loadTestData = require('./testData');
const helmet = require('helmet');
const path = require('path');
const app = express();

// import routes
const postRoutes = require('./routes/post.routes');

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/api', postRoutes);
app.use((req, res, next) => {
    sanitize(req.body);
    next();
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));
// connects our back end code with the database
mongoose.connect(config.DB, {
    useNewUrlParser: true
});
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
    loadTestData();
});
db.on('error', (err) => console.log('Error ' + err));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.listen(process.env.PORT || config.PORT, function () {
    console.log('Server is running on Port:', config.PORT);
});
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = 3001;
const app = express();

// application setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Application running on port: ${PORT}`);
    });
});
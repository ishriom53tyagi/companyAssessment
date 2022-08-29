let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const dbConfig = require("./database/query");

// Express Route
const companyRoute = require('../backend/routes/company')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(cors());
app.use('/api/company',companyRoute)

// PORT
const port = process.env.PORT || 4000;

const server = app.listen(port, async () => {
    await dbConfig.CreateTable();
    console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
res.status(404).send('Error 404!')
});

app.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});
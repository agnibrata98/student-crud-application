require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');


app.set("view engine", "ejs");
app.set("views", "views");


app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));  // to parse the form data otherwise form's data will be undefined

app.use(require('./routes/app.routes'));


app.listen(process.env.PORT, async () => {
    await db.connectDb();
    console.log('server is running on port ' + process.env.PORT);
});
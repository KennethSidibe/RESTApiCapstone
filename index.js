import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});
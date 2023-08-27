import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const apiURL = 'https://api.agify.io';

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.get('/', (req, res) => {
    res.render( __dirname + '/views/index.ejs');
});

app.post('/findAge', async (req, res) => {
    const name = req.body.name;
    const params = {name:name}
    try {
        const response = await axios.get(apiURL,{params:params});
        if (response.data.age == null) {response.data.age =  randomOldAge();}
        // const data = {
        //     name:response.data.name,
        //     age:response.data.age
        // };

        // <------ FOR Test purposes ----->
        const data = {
            name:"Kenneth",
            age:"90"
        };

        res.render( __dirname  + '/views/index.ejs', {data:data});
    } catch (error) {
        console.log(error);
        res.render(__dirname  + '/views/index.ejs', {errorMessage:"error"})
    }
});

function randomOldAge() {
    const min = 100;
    const max = 200;

    return Math.floor(Math.random() * (max - min + 1) + min);
}
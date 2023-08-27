import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const apiURL = 'https://api.agify.io';

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/findAge', async (req, res) => {
    const name = req.body.name;
    const params = {name:name}
    try {
        const response = await axios.get(apiURL,{params:params});
        if (response.data.age == null) {response.data.age =  randomOldAge();}
        const data = {
            name:response.data.name,
            age:response.data.age
        };

        // <------ FOR Test purposes ----->
        // const data = {
        //     name:"Kenneth",
        //     age:"90"
        // };

        res.render('index.ejs', {data:data});
    } catch (error) {
        console.log(error);
        res.render('index.ejs', {errorMessage:"error"})
    }
});

function randomOldAge() {
    const min = 100;
    const max = 200;

    return Math.floor(Math.random() * (max - min + 1) + min);
}
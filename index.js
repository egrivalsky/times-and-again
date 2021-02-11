const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const db = require('./models')

const app = express();
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('Welcome to the app');
});

app.get('/popular', (req, res) => {
    axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=DgfcxxYXe5dhiNKKzNoe9GM2tcxLOmeR')
    .then((info) => {
        res.render('popular', { info })
        console.log(info.data.results[0].id)
    })
})

app.get('/favorites', (req, res) => {
    res.render('favorites',  {            
        title: req.body.title,
        byline: req.body.byline,
        published_date: req.body.published_Date,
        url: req.body.url,
        article_id: req.body.id}) 

});

// {
//     title: DataTypes.STRING,
//     byline: DataTypes.STRING,
//     published_date: DataTypes.STRING,
//     url: DataTypes.STRING,
//     article_id: DataTypes.INTEGER
// }

app.post('/favorites', async(req, res) => {
    try{
        await db.favorite.create({
            title: req.body.title,
            byline: req.body.byline,
            published_date: req.body.publishedDate,
            url: req.body.url,
            article_id: req.body.id
        })
        console.log(req.body);
        res.render('/favorites', {
            title: req.body.title,
            byline: req.body.byline,
            published_date: req.body.publishedDate,
            url: req.body.url,
            article_id: req.body.id});
    }catch(e) {
        console.log('* * * * * * * * * *');
        console.log(e);
        console.log(e.message);
        console.log('* * * * * * * * * *');
    }

})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
    });
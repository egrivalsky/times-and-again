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
        console.log(info.data.results[0])
    })
})

app.post('/favorites', (req, res) => {
    res.render('favorites', { labelId: req.body.label });
    console.log(req.body)
});
app.post('/', (req, res) => {
    db.fav.create({
      title: req.body.name,
      byline: req.body.githubLink,
      published_date: req.body.deployedLink,
      url: req.body.description,
      id: req.body.url,
    })
    .then((fav) => {
    //   res.render('/favorites')
    // })
    // .catch((error) => {
    //   res.status(400).render('main/404')
    console.log("favorite added to database")
    })
  })


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
    });
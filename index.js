const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

const app = express();
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('Welcome to the app'); // Yo, Rome: what does this doing?
});

app.get('/popular', (req, res) => {
    axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=DgfcxxYXe5dhiNKKzNoe9GM2tcxLOmeR')
    .then((info) => {
        res.render('popular', { info })
    })
})



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
    });
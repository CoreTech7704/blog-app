const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blog-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {    
    res.render('home', { title: 'Home Page' });
});

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

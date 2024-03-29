const express = require('express') ;
const router = require('./routes/router') ;

const app = express() ;
const port = 3000 ;

app.listen(port) ;

app.use(express.urlencoded({ extended: true }))
app.use('/books', router) ;
app.use((req, res, next) => {
    res.status(404).send("La page demandée n'existe pas.");
});



const Book = require('../models/bookModel') ;
const { validationResult, matchedData, param } = require('express-validator') ;


exports.getAllBooks = async (req,res,next) => {
    Book.findAll({
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    })
    .then((bookRecord) => {
        if(bookRecord.length==0){
            res.send(`Aucun enregistrement\
            de livre ne veuillez enregistrer un livre`) ; 
        }
        else{
            res.send(JSON.stringify(bookRecord,null, 2))
        }
        //console.log(bookRecord) ; debug 
    })
    .catch((error) => {
        console.log(`Une erreur est survenue lors de la lecture de l'enregistrement d'id ${req.params.id}`) ;
    })
    
};

exports.getBookRecord = async (req,res,next) => {
    Book.findAll({
        attributes:{
            exclude:['createdAt','updatedAt']
        },
        where:{
            bookId: req.params.bookId
        }
    })
    .then((bookRecord) => {
        if(bookRecord.length==0){
            res.send(`Aucun enregistrement\
            de livre ne porte l'id ${req.params.bookId}`) ; 
        }
        else{
            res.send(JSON.stringify(bookRecord,null, 2))
        }
        //console.log(bookRecord) ; debug 
    })
    .catch((error) => {
        console.log(`Une erreur est survenue lors de la lecture de l'enregistrement d'id ${req.params.id}`) ;
    })
};

exports.deleteBookRecord = async (req,res) => {
    Book.destroy({
        where: {
          bookId: req.params.bookId
        }
      })
      .then( (status) => {
        if(status === 1){
            res.send(`Le livre d'id ${req.params.bookId}\
         a été supprimé avec succès.`)
         }
         else{
            res.send(`Aucun enregistrement\
            de livre ne porte l'id ${req.params.bookId}`) ;
         } 
      })
      .catch( (error) => {
        console.error(`${error} =>  Erreur lors de la suppresion de l'enregistrement d'id ${req.params.bookId}`) ;
      }) ;
    }


exports.createBookRecord =  async (req,res,next) => {    
    errorResult = validationResult(req).errors ;
    //console.log('les données matchés',matchedData(req)) ;
    if(errorResult.length == 0){
        recordInfo = matchedData(req) ;
        Book.create(recordInfo)
        .then((book) => {
    
            //console.log(book.dataValues.bookId) ;
            if(book.dataValues.bookId){
                res.send(`L'enregistrement s'est effectué avec succès et voici l'id de l'enregistrement ${book.dataValues.bookId}`)
            }
            else{
                res.send(`Un problème est survenu. Veuillez réessayer`) ;
            }
        })
        .catch((error) => {
            console.log(`Erreur de nouvel enregistrement ${error}`);
            //res.end();
        }); 
        
    }
    else{
        res.send(`La valeur d'au moins un des champs a un format incorrect ou est inexistant`) ;
    }
};


exports.updateBookRecord =  async (req,res,next) => {    
    const errorResult = validationResult(req).errors ;
    
    //console.log('les données matchés',matchedData(req)) ;
    
    if(errorResult.length == 0){
        const recordInfo = matchedData(req) ; 
        const bookId = req.params.bookId ;

        Book.update(recordInfo,
            {
                where: {
                    bookId : bookId
                }
            })
            .then((affectedRows) => {
                if(affectedRows[0] == 1){
                    //console.log('mis à jour') ;
                    res.send(`L'enregistrement d'id ${bookId} a été mis à jour avec succès`) ;
                }
                else{
                    res.send(`L'enregistrement d'id ${bookId} n'existe pas veuillez choisir un id existant`) ;
                }
                //console.log(affectedRows) ;
            })
            .catch((error) => {
                console.log(`Erreur de mis à jour ${error}`) ;
                res.end() ;
            }) ;  
    }
    else{
        res.send(`La valeur d'au moins un des champs a un format incorrect ou est inexistant`) ;
    }
};

exports.checkBookId = (req,res,next,bookId) => {
    
    const regex = /^[1-9]\d*$/ ;

    if (!regex.test(bookId)){
        res.send('Id incorrect') ;
    }
    else{
        //console.log('Vérification passée', bookId);
        next();       
    }
}
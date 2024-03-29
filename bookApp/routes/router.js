const express = require('express') ;
const router = express.Router() ;
const BookController = require('../controllers/bookController') ;
const validate = require('../requests/bookFeaturesValidate')

router.param('bookId',BookController.checkBookId);

router.route('/')
.post(validate.fields,BookController.createBookRecord)
.get(BookController.getAllBooks) 



router.route('/:bookId')
.get(BookController.getBookRecord)
.put(validate.fields,BookController.updateBookRecord)
.delete(BookController.deleteBookRecord);

module.exports = router ;
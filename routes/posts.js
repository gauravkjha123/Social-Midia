const express = require('express');

const router = express.Router();
const postController = require('../controllers/post_controller');



router.post('/', postController.create);
router.post('/:id', postController.delete);



module.exports = router;
const express = require("express");

const router = express.Router();

let commentController = require("../controllers/comment.controller");
 
router.post('/addComment' ,commentController.addCommentToProduct );
router.delete('/deleteComment',commentController.deleteComment);

module.exports = router;
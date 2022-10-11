const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")

const postControllers = require("../controllers/post")


// Routes create, read, update, delete (CRUD) et Routes like/dislike de post
router.post("/", auth, multer, postControllers.createPost);

router.post("/:id/like", auth, postControllers.notePost )

router.put("/:id", auth, multer, postControllers.modifyPost);

router.delete("/:id", auth, postControllers.deletePost);

router.get("/:id", auth, postControllers.onePost);

router.get("/", auth, postControllers.allPost);



module.exports = router;
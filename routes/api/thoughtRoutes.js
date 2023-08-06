const router = require("express").Router();
// require controller functionality
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");
// getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction

// api/thoughts CRUD operations for all thoughts
router.route("/").get(getThoughts).post(createThought);

// api/thoughts/:thoughtId CRUD operations for single thought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// // api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions")
  .post(addReaction);

  router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);
  
module.exports = router;

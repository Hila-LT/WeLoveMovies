const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const reviewsController = require("../reviews/reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");




// TODO: Add your routes here
router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);


router.route("/:movieId/reviews/:reviewId").put(reviewsController.update).delete(reviewsController.destroy).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);
module.exports = router;

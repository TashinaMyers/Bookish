const router = require("express").Router();
const userRoutes = require("./user-routes");
const googleBooksRoutes = require("./googlebooks");

router.use("/users", userRoutes);
router.use("/googlebooks", googleBooksRoutes);

module.exports = router;

//Should this be typedefs and resolvers?

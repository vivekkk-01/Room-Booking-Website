const router = require("express").Router();

const { body } = require("express-validator");
const placeControllers = require("../controllers/place");
const fileUpload = require("../file-upload");
const verifyToken = require("../verifyToken");

router.post(
  "/",
  fileUpload.array("photos"),
  [
    body("title")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Title should not be empty"),
    body("address").trim().not().isEmpty().withMessage("Enter a valid address"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description should contain at least 10 characters"),
    body("info")
      .trim()
      .not()
      .isEmpty()
      .withMessage(
        "Tell us more about your property, it would help the tenant."
      ),
  ],
  verifyToken,
  placeControllers.postPlace
);

router.get("/:userId", verifyToken, placeControllers.getPlace);

router.put(
  "/:placeId",
  fileUpload.array("photos"),
  [
    body("title")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Title should not be empty"),
    body("address").trim().not().isEmpty().withMessage("Enter a valid address"),
    body("description")
      .trim()
      .isLength({ min: 10})
      .withMessage("Description should contain at least 10 characters"),
    body("info")
      .trim()
      .not()
      .isEmpty()
      .withMessage(
        "Tell us more about your property, it would help the tenant."
      ),
  ],
  verifyToken,
  placeControllers.putPlace
);

router.get("/", placeControllers.getPlaces);

module.exports = router;

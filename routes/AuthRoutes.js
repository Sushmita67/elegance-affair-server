// const express = require("express");
// const router = express.Router();
// const { login, register, resetPasswordRequest, resetPassword, validateSession, registerMobile, uploadImage} = require("../controller/AuthController");
// const { authenticateToken, authorizeRole} = require("../security/Auth");
// const upload = require("../config/uploads");

// router.post("/login", login);
// router.post("/register", register);
// router.post("/register-mobile", registerMobile);
// router.post("/uploadImage", upload, uploadImage);

// router.get("/validate-session", authenticateToken, validateSession); // Use authenticateToken middleware


// router.post("/reset-password-request", resetPasswordRequest); // Route for requesting a password reset
// router.post("/reset-password", resetPassword); // Route for resetting the password


// // router.post("/register", authenticateToken, authorizeRole("ADMIN"), register);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { upload } = require("../config/uploads");  // Correct import
const { login, register, resetPasswordRequest, resetPassword, validateSession, registerMobile, uploadImage} = require("../controller/AuthController");
const { authenticateToken, authorizeRole} = require("../security/Auth");


router.post("/login", login);
router.post("/register", register);
router.post("/register-mobile", registerMobile);
router.post("/uploadImage", upload, uploadImage);

router.get("/validate-session", authenticateToken, validateSession); // Use authenticateToken middleware


router.post("/reset-password-request", resetPasswordRequest); // Route for requesting a password reset
router.post("/reset-password", resetPassword); // Route for resetting the password


// router.post("/register", authenticateToken, authorizeRole("ADMIN"), register);

router.post("/upload", upload, (req, res) => {
  try {
      const files = req.files;
      console.log("Uploaded files:", files);
      const body = req.body;
      console.log("Form data:", body);

      res.status(200).json({ message: "Files uploaded successfully!", files, body });
  } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: "Failed to upload files" });
  }
});

module.exports = router;

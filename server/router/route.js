import { Router } from "express";
const router = Router();
import * as controller from "../controller/appController.js";
// post methods
router.route("/register").post(controller.register);
// router.route('/registerMail').post(); //send the mail
router.route("/authenticate").post((req, res) => res.end()); //authenticate the user
router.route("/login").post(controller.login); //login in app
//get methods
router.route("/user/:username").get(controller.getUser); //user with username
router.route("generateOTP").get(controller.generateOTP); //generate random OTP
router.route("verifyOTP").get(controller.verifyOTP); // verify generated OTP
router.route("createResetSession").get(controller.createResetSession); //reset all the variables
//put methods
router.route("/updateuser").put(controller.updateUser); //is used to update the user profile
router.route("/resetPassword").put(controller.resetPassword); //used to reset password

export default router;

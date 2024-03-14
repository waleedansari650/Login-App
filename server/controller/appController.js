import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";

// Middleware to verify the user
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.body;

    // Check the user existence
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

/*
POST : http://localhost:8080/api/register
{
  "username" : "waleed",
  "password" : "emaple@123",
  "email" : "example@gmail.com",
  "profile" : ""
}
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check if the username already exists
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).send({ error: "Username already exists" });
    }

    // Check if the email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success response
    return res.status(201).send({ msg: "User registered successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error in user registration:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

/*
POST : http://localhost:8080/api/login
{
  "email" : "example@gmail.com",
  "password" : "emaple@123",
}
@params 
username,
password
*/
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ error: "Password does not match" });
    }

    const token = Jwt.sign(
      { userId: user._id, username: user.username },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      msg: "Login Successful",
      username: user.username,
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
// GET : http://localhost:8080/api/user/waleed
export async function getUser(req, res) {
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(400).send({ error: "Invalid request" });
    }
    const user = await UserModel.findOne({ username }).exec(); // Use exec() to return a promise
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // Remove the password from user data
    const { password, ...rest } = user.toJSON();
    return res.status(200).send(rest);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

/* put request http:localhost:8080/api/updateuser
@params "id" : "<userid>"
body : {
  firstname : "",
  address : "",
  "profile" : ""
}
*/
export async function updateUser(req, res) {
  try {
    // const id = req.query.id;
    const { userId } = req.user;
    if (userId) {
      const body = req.body;
      // Update the user data
      const result = await UserModel.updateOne({ _id: userId }, body);
      if (result.nModified === 0) {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(200).send({ msg: "Record updated successfully" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

// get request
export async function generateOTP(req, res) {
  req.app.locals.OTP  =  await otpGenerator.generate(6, { lowerCaseAlphabets : false, upperCaseAlphabets : false, specialCharacters : false})
  res.status(201).send({code  : req.app.locals.OTP});
  //first store the OTP in the  req.app.locals.OTP 
  //then send the OTP to the user
  // then user enter the code in verifyOTP this otp will match with the req.app.locals.OTP
  //if the OTP match then we will redirect the user to the createResetSession


}
export async function verifyOTP(req, res) {
  const { code} = req.query;
  // the parseInt() convert the string into integer
  if(parseInt(code) === parseInt(req.app.locals.OTP)){
    req.app.locals.OTP = null; // reset the OTP
    req.app.locals.resetSession = true; // set the reset session to true
    return res.status(201).send({msg : "Verify successfully...!"});


  }
  return res.status(400).send({error : "Invalid OTP"});
}
// I only provide the access of this route only once to reset the password
// successfully redirect the user when the OTP is valid
export async function createResetSession(req, res) {
  if(req.app.locals.resetSession){
      req.app.locals.resetSession = false;
      return res.status(201).send({msg : "Access granted!"});
  }
  return res.status(404).send({error : "Session expired!"});
}
//update the password when we have valid session
export async function resetPassword(req, res) {
  const { username, password } = req.body;
  try {
      if (!req.app.locals.resetSession) {
          return res.status(440).send({ error: "Session expired!" });
      }
      const user = await UserModel.findOne({ username });

      if (!user) {
          return res.status(404).send({ error: "Username not found" });
      }

      try {
          const hashedPassword = await bcrypt.hash(password, 10);
          await UserModel.updateOne({ username: user.username }, { password: hashedPassword });
          req.app.locals.resetSession = false; // Reset session
          return res.status(201).send({ msg: "Password reset successful!" });
      } catch (error) {
          return res.status(500).send({ error: "Unable to hash password" });
      }
  } catch (error) {
      return res.status(500).send({ error: "Internal server error" });
  }
}


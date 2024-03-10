import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;
    //check the existing username
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, (err, user) => {
        if (err) {
          reject(new Error(err));
        }
        if (user) {
          reject({ error: "Please use unique name" });
        }
        // if no username found
        resolve();
      });
      //    check the existing email
      const existEmail = new Promise((resolve, reject) => {
        UserModel.findOne({ email }, (err, email) => {
          if (err) {
            reject(new Error(err));
          }
          if (email) {
            reject({ error: "Please use unique Email." });
          }
          resolve();
        });
        
      });
      Promise.all([existUsername, existEmail]).then(()=>{
        if(password){
            
        }
      });
    });
  } catch (error) {
    return res.status(500).send({
        error : "Enable to hash password"
    });
  }
}

export async function login(req, res) {
  res.json("login route");
}
export async function getUser(req, res) {
  res.json("getuser route");
}
// put request
export async function updateUser(req, res) {
  res.json("updateUser route");
}
// get request
export async function generateOTP(req, res) {
  res.json("generateOTP route");
}
export async function verifyOTP(req, res) {
  res.json("generateOTP route");
}
// successfully redirect the user when the OTP is valid
export async function createResetSession(req, res) {
  res.json("verifyOTP route");
}
//update the password when we have valid session
export async function resetPassword(req, res) {
  res.json("resetPassword route");
}

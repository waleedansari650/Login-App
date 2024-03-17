// axios.function calls like i used to create function ins services

import axios from "axios";
import { jwtDecode } from "jwt-decode";
// Make Api Requests

// auhthenticate function
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });

  } catch (error) {
    return { error: "Username doesn't exist." };
  }
}
// to get the username from the local storage
export async function getUsername(){
    let token = localStorage.getItem('token');
    if(!token){
      return Promise.reject("Cannot find token...!");
    }
    let decode = jwtDecode(token);
    return decode;
 
}

// get User details
// destructure the username inside this paranthesis {}
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: "Password doestn't match." };
  }
}
// Register user function
export async function registerUser(credentials) {
  try {
    // in the data i destructured the msg property
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credentials);
    let { username, email } = credentials;
    // when the user register send mail to the user email
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
// Login user function
export async function verifyPassword({username, password}){
    try {   
         if(username){
        const {data} = await axios.post('/api/login', {username, password});
            return Promise.resolve({data});
         }        
        
    } catch (error) {
        return Promise.reject({error : "Password doesn't Match...!"})
    }
}
// update user functionallity

export async function updateUser(response){
    try {
       const token = await localStorage.getItem('token');
       const data = await axios.put('/api/updateuser', response, {
        headers : {
            Authorization : `Bearer ${token}`
        }
       });
       return Promise.resolve({data});
       


    } catch (error) {
        return Promise.reject({error : "Couldn't update the profile...!"});
    }
}
// generate OTP
export async function generateOTP(username) {
  try {
    const { data: { code }, status } = await axios.get(`/api/generateOTP?username=${username}`);

    if (status === 201) {
      let email;
      const userData = await getUser({ username });
      if (userData && userData.email) {
        email = userData.email;
      } else {
        throw new Error("User data not found or email not available");
      }

      const text = `Your Password Recovery OTP is: ${code}. Verify and Recover your password.`;
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text,
        subject: 'Password Recovery OTP'
      });

      return code;
    }
  } catch (error) {
    throw error;
  }
}

// verify OTP
export async function verifyOTP({username, code}){
    try {
        const {data, status} = await axios.get('/api/verifyOTP', {params  : {username ,code}});
        return {data, status}; 
    } catch (error) {
        return Promise.reject(error);
    }
}
//reset Password
export async function resetPassword({username, password}){
    try {
        const {data , status} = await axios.put('/api/resetPassword', {username, password});
        return Promise.resolve({data, status});



    } catch (error) {
        return Promise.reject(error);
    }
}


import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerationValidateForm } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/helper";

const Register = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      username: "waleed",
      password: "admin@123",
    },
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // Call the passwordValidate function manually before submitting the form
      // values is the target object where the profile property is added
      values = await Object.assign(values, { profile: file || "" });
      const errors = await registerationValidateForm(values);
      if(Object.keys(errors).length ===0){
        // Proceed with form submission if there are no errors
        let registerPromise = registerUser(values);
        toast.promise(registerPromise, {
          loading: "Creating...",
          success: <b>Register Successfully...!</b>,
          error: <b>Could not Register</b>,
        });
        registerPromise.then(function(){navigate('/')});
      } 
    },
  });
  //  useformik doesnt support the file upload so i create the function for it
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass} styles={{ width: "45%" }}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Register</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Happy to join you!
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4 ">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={styles.profile_img}
                    alt="avatar"
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("email")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Email*"
                />
                <input
                  {...formik.getFieldProps("username")}
                  className={styles.textbox}
                  type="text"
                  placeholder="username*"
                />
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Password"
                />
                <button className={styles.btn} type="submit">
                  Register
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Already Register?
                  <Link to="/" className="text-red-500">
                    Login Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

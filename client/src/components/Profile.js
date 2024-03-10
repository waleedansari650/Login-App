import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import extend from "../styles/profile.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
const Profile = () => {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      firstName : '',
      lastName : '',
      email: "admin@gmail.com",
      mobile: "example123",
      address: "example123",
    },
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // Call the passwordValidate function manually before submitting the form
      values = await Object.assign(values, { profile: file || "" });
      const errors = await profileValidation(values);
      if (Object.keys(errors).length === 0) {
        // Proceed with form submission if there are no errors
        console.log(values);
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
      <div className="container mx-auto ">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={`${styles.glass} ${extend.glass}`} styles={{ width: "45%", paddingTop: '3em' }}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Profile</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                You can update the detail
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4 ">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={`${styles.profile_img} ${extend.profile_img}`}
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
                <div className="flex w-2/3 gap-10">
                  <input
                    {...formik.getFieldProps("firstName")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="FirstName"
                  />
                  <input
                    {...formik.getFieldProps("lastName")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="LastName"
                  />
                </div>
                <div className="flex w-2/3 gap-10">
                  <input
                    {...formik.getFieldProps("mobile")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Mobile No."
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Email"
                  />
                </div>
                   <input
                    {...formik.getFieldProps("address")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Address"
                  />
                <button className={styles.btn} type="submit">
                  Update
                </button>
                </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Come Back Later?
                  <Link to="/" className="text-red-500">
                    Logout
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

export default Profile;

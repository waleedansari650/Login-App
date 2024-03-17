import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import useFetch from "../hook/fetch.hook";
const Reset = () => {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch("createResetSession");

  useEffect(() => {
    console.log(apiData);
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "admin@123",
      confirm_pwd: "admin@123",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // Call the passwordValidate function manually before submitting the form
      const errors = await resetPasswordValidation(values);
      if (Object.keys(errors).length === 0) {
        let resetPromise = resetPassword({
          username,
          password: values.password,
        });
        toast.promise(resetPromise, {
          loading: "Upadting...!",
          success: <b>Reset Successfully...!</b>,
          error: <b>Could not Reset!</b>,
        });
        resetPromise.then(() => {
          navigate("/password");
        });
      }
    },
  });
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
    if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>
  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass} styles={{ width: "50%" }}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Reset</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Enter new password
              </span>
            </div>
            <form className="py-20" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="text"
                  placeholder="New Password"
                />
                <input
                  {...formik.getFieldProps("confirm_pwd")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Confirm Password"
                />
                <button className={styles.btn} type="submit">
                  Let's Go
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Forgot Password?
                  <Link to="/recovery" className="text-red-500">
                    Reset
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

export default Reset;

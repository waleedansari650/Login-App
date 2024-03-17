import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
const Recovery = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) {
        return toast.success("OTP sent to your email successfully...!");
      }
      return toast.error("Error while generating OTP...!");
    });
  }, [username]);
  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("OTP verified successfully...!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Invalid OTP, Check your email again...!");
    }
  }
  // handler of resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: "Sending OTP...",
      success: "OTP sent successfully...!",
      error: "Could not send it...!",
    });
    sendPromise.then((OTP) => {
      console.log(OTP);
    });
  }
  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Recover</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Enter OTP to recover the password.
              </span>
            </div>
            <form className="pt-20" onSubmit={onSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center">
                  <span className="py-4 text-sm text-left text-gray-500">
                    Enter 6 digit OTP sent to your email.
                  </span>
                  <input
                    onChange={(e) => {
                      setOTP(e.target.value);
                    }}
                    className={styles.textbox}
                    type="text"
                    placeholder="OTP"
                  />
                </div>

                <button className={styles.btn} type="submit">
                  Recover
                </button>
              </div>
            </form>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't Get OTP?
                <button onClick={resendOTP} className="text-red-500">
                  Resend
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;

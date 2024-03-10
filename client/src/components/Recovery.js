import React from "react";
import { Link } from "react-router-dom";
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik}  from 'formik';
import {passwordValidate} from '../helper/validate';

const Recovery = () => {
    const formik = useFormik({
        initialValues : {
            password : '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values =>{
            // Call the passwordValidate function manually before submitting the form
            const errors = await passwordValidate(values);
            if (Object.keys(errors).length === 0) {
                // Proceed with form submission if there are no errors
                console.log(values);
            }
        },
    })

  return (
    <>
      <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass} >
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Recover</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Enter OTP to recover the password.
              </span>
            </div>
            <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
            <div className="input text-center">
            <span className="py-4 text-sm text-left text-gray-500">
                Enter 6 digit OTP sent to your email.
              </span>   
                <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder="OTP" />
            </div>
              
                <button className={styles.btn} type="submit">Let's Go</button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Can't Get OTP? 
                  <button  className="text-red-500">
                    Resend
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
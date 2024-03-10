import React from "react";
import { Link } from "react-router-dom";
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik}  from 'formik';
import {resetPasswordValidation} from '../helper/validate';

const Reset = () => {
    const formik = useFormik({
        initialValues : {
            password : 'admin@123',
            confirm_pwd : 'admin@123',
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values =>{
            // Call the passwordValidate function manually before submitting the form
            const errors = await resetPasswordValidation(values);
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
          <div className={styles.glass} styles={{width : "50%"}}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Password</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Confirm new password 
              </span>
            </div>
            <form className="py-20" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder="New Password" />
                <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder="Confirm Password" />
                <button className={styles.btn} type="submit">Let's Go</button>
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

import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

//same as node mailer website
let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};
let transporter = nodemailer.createTransport(nodeConfig);
//same as npm mailgen website copy from the website
let MailGenerator = new Mailgen({
    theme : 'default',
    product : {
        name : "Mailgen",
        link : 'https://mailgen.js/'
    }
})
export const registerMail = async(req, res)=>{
    const {username, userEmail, text, subject} = req.body;
   //body of the mail
    var email = {
        body :{
            name : username,
            intro  : text || "Welcome to the daily Tuition! We are very excited to have you on board.",
            outro  : 'Need help, or have questions? Just reply to this email, we would love to help.'
        }
    }
// copy the below code from the nodemailer website
    var emailbody = MailGenerator.generate(email);
    let message = {
        from : ENV.EMAIL,
        to : userEmail,
        subject : subject || "Signup Successful",
        html : emailbody
    } 
    //send mail
    transporter.sendMail(message).then(()=>{ return res.status(200).send({msg : "you should receive an email from us"})}).catch((err)=>{return res.status(500).send({err})})

}




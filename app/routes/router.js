const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "henrique.evangelista08@gmail.com",
        pass: "ompe yhon jwjh heej"
    }
});

const mailOptions = {
    from: "henrique.evangelista08@gmail.com",
    to: "ggamer0808@gmail.com",
    subject: "assunto",
    text: "mensagem em formato de texto",
    html: "<h1>mensagem em formato HTML</h1>"
}

transporter .sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error);
    } else{
        console.log(info);

        console.log("email enviado");
    }
})


router.get("/", (req, res)=>{
    res.render("pages/formulariocontato", {resultados:null,valores:{numero:""}});
});



module.exports = router;
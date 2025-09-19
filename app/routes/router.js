const express = require("express");
const router = express.Router();



router.get("/", (req, res)=>{
    res.render("pages/formulariocontato", {resultados:null,valores:{numero:""}});
});



module.exports = router;
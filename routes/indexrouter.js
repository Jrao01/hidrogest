const express = require('express');
const router = express.Router();

const {index,loginPost,register,sectorAdded,registerPost,changeStatus,getTabla,renderLanding} = require('../controllers/index.js')

router.get('/',          index)
router.get('/login'      ,(req,res)=>{ res.render('login') })
router.get('/changeStatus/:id/:status',changeStatus )
router.get('/admin/tabla',getTabla)
router.get('/register'   ,register);
router.get('/landing'     ,renderLanding)
router.get('/addSector'  ,(req,res)=>{ res.render('admin/addsector') })

// posts

router.post('/addUser',   registerPost)
router.post('/sectorAdded',sectorAdded)
router.post('/login',     loginPost)

module.exports = router
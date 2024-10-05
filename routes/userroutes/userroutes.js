const express = require("express");
const router = express.Router();
const userctrl = require('../../controllers/userctrls/userCtrl')

router.get('/',userctrl.getAll);
router.get('/:id',userctrl.getById);
router.post('/post',userctrl.create);
router.put('/put/:id',userctrl.update);
router.patch('/patch/:id',userctrl.edit);
router.delete('/delete/:id',userctrl.remove);

module.exports = router;    

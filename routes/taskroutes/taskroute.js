const taskctrl = require('../../controllers/taskctrls/taskctrl')
const express = require('express');
const router = express.Router();

router.get('/',taskctrl.getAllTask);
router.get('/:id',taskctrl.getTaskById);
router.post('/post',taskctrl.postTask);
router.delete('/delete/:id',taskctrl.deleteTask);
router.put('/edit/:id',taskctrl.updateTask);


module.exports = router
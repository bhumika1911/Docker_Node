const {Router}=require('express');
const router=Router();
const controller=require('./controller');
const { getStudentById } = require('./queries');
// router.get('/',(req,res)=>{
//     res.send("using api route");
// });

router.get('/',controller.getStudents);
router.get('/:id',controller.getStudentById);
router.post('/',controller.addStudent);
router.put('/:id',controller.updateStudent);
router.delete('/:id',controller.removeStudent);

module.exports=router;
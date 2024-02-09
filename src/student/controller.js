const pool=require('../../db');
const queries=require('./queries');

pool.connect().then(() => {
    pool.query('SELECT NOW()', (err, res) => {
      console.log(res.rows)
    });
  }); 

  
const getStudents=(req,res)=>{
    // console.log('getting students')
    pool.query(queries.getStudents, (error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getStudentById=(req,res)=>{
    const id =parseInt(req.params.id);
    pool.query(queries.getStudentById,[id], (error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addStudent = (req,res)=>{
    const {name,email,age,DOB}=req.body;
    //check if email exists
    pool.query(queries.checkEmailExists, [email],(error,results)=>{
        if(results.rows.length){
            res.send("email already exists");
        }

        //add student to DB
        pool.query(queries.addStudent,[name,email,age,DOB],(error,results)=>{
            if (error) throw error;
            res.status(201).send("student created successfully!");
        })
    })
}

const removeStudent=(req,res)=>{
    const id =parseInt(req.params.id);

    pool.query(queries.getStudentById,[id],(error,results)=>{
        
        if(!results || !results.rows.length){
            res.send("Student does not exist in the database");
        }

        pool.query(queries.removeStudent,[id],(error,results)=>{
            if (error) throw error;
            res.status(200).send("student removed succesfully!");
        });
    });

};

const updateStudent=(req,res)=>{
    const id =parseInt(req.params.id);   
    const {name}=req.body;
    
    pool.query(queries.getStudentById,[id],(error,results)=>{
        
        if(!results || !results.rows.length){
            res.send("Student does not exist in the database");
        }

        pool.query(queries.updateStudent,[name,id], (error,results)=>{
            if (error) throw error;
            res.status(200).send("student updated succesfully!");
        })
    });    
    
}
module.exports={
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    removeStudent,

}
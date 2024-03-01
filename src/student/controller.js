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

// const addStudent = (req,res)=>{
//     const {fullname,email,age,dob}=req.body;
//     //check if email exists
//     pool.query(queries.checkEmailExists, [email],(error,results)=>{
//         if(results.rows.length){
//             res.send("email already exists");
//         }

//         //add student to DB
//         pool.query(queries.addStudent,[name,email,age,DOB],(error,results)=>{
//             if (error) throw error;
//             res.status(201).send("student created successfully!");
//         })
//     })
// }

const addStudent = (req, res) => {
    const { fullName, email, age, dob } = req.body;
    
    pool.query(
        'INSERT INTO students (name, email, age, DOB) VALUES ($1, $2, $3, $4)',
        [fullName, email, age, dob],
        (error, results) => {
            if (error) {
                console.error('Error:', error);
                res.status(500).send("Error creating student");
            } else {
                res.status(201).send("Student created successfully!");
            }
        }
    );
};

const removeStudent=(req,res)=>{
    const id =parseInt(req.params.id);

    pool.query(queries.getStudentById,[id],(error,results)=>{
        
        if(!results || !results.rows.length){
            res.send("Student does not exist in the database");
        }

        // pool.query(queries.removeStudent,[id],(error,results)=>{
        //     if (error) throw error;
        //     res.status(200).send("student removed succesfully!");
        // });

        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) {
                console.error('Error removing student:', error);
                res.status(500).send('Error removing student');
            } else if (results.rowCount === 0) {
                res.status(404).send('Student not found');
            } else {
                res.status(200).send('Student removed successfully!');
            }
        });
    });

};


// const removeStudent = (req, res) => {
//     const id = parseInt(req.params.id);

//     pool.query(queries.removeStudent, [id], (error, results) => {
//         if (error) {
//             console.error('Error removing student:', error);
//             res.status(500).send('Error removing student');
//         } else if (results.rowCount === 0) {
//             res.status(404).send('Student not found');
//         } else {
//             res.status(200).send('Student removed successfully!');
//         }
//     });
// };

const updateStudent=(req,res)=>{
    const id =parseInt(req.params.id);   
    const { name, email, age, dob } = req.body;

    pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
        if (error) {
            console.error('Error updating student:', error);
            res.status(500).send('Error updating student');
        } else {
            res.status(200).send('Student updated successfully!');
        }
    });
    
    // pool.query(queries.getStudentById,[id],(error,results)=>{
        
    //     if(!results || !results.rows.length){
    //         res.send("Student does not exist in the database");
    //     }

    //     // pool.query(queries.updateStudent,[name,id], (error,results)=>{
    //     //     if (error) throw error;
    //     //     res.status(200).send("student updated succesfully!");
    //     // })
    //     pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
    //         if (error) {
    //             console.error('Error updating student:', error);
    //             res.status(500).send('Error updating student');
    //         } else {
    //             res.status(200).send('Student updated successfully!');
    //         }
    //     });
    // });    
    
}
module.exports={
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    removeStudent,

}

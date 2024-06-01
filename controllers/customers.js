import { dbConnection } from "../db/db.js"
import bcrypt from 'bcrypt'

export const signUp = (req,res,next) => {
    try{
        const {firstName,lastName,email,password,phone} = req.body;
        const sqlSelectCustomer =` SELECT email from customer where email = '${email}'`        
        dbConnection().execute(sqlSelectCustomer,(err,result)=>{
            if(!result.length == 0){
              return res.status(401).json({message:'Customer already exists', success : false})
            }
            bcrypt.hash(password, 10, (err, hashPassword) =>{
                const sqlInsertCustomer = `INSERT INTO customer (first_name,last_name,email,phone,password) VALUES (?,?,?,?,?)`;
                dbConnection().execute(sqlInsertCustomer,[ firstName,lastName,email,phone,hashPassword ],(err,result)=>{
                   return res.status(201).json({success: true , message :'customer added successfully'})
                })
            });         
        })
    }catch(err){
        res.status(500).send(err.message)
    }
}
export const login = (req, res) =>{
    const {email , password} = req.body
    const sqlSelectCustomer = `SELECT email,password from customer where email = '${email}'`;
    dbConnection().execute(sqlSelectCustomer,[email],(err,result)=>{
        if(result.length == 0){
            return res.status(401).json({message:'Invalid email or password', success : false})
        }
        const hashPassword = result[0].password;
        const isMatch = bcrypt.compareSync(password, hashPassword);
        if(!isMatch){
            return res.status(401).json({message:'Invalid email or password', success : false})
        }
        res.status(200).json({success: true, message :'customer logged in successfully'})
    }) 
}

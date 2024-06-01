import mysql from 'mysql2';


export const dbConnection = ()=>{
    const conn = mysql.createConnection({
        host: 'localhost',
        user:'root',
        password:'',
        database:'assignment05',
    })

    conn.connect((err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('dataBase connected')
        }
    })
    return conn; 
    
}

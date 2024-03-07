const {  registerUserL, getUserInfo } = require("../lib/user")

const user = async(req,res)=>{
    const email = req.params.email;
       const result = await getUserInfo(email)
       res.send({message:'this is my data', result})
}

const registerUser = async (req,res) =>{
    try{
        const userInfo = req.body;
        console.log(userInfo,'register api');
        const regUser = await registerUserL(userInfo)
        res.send({regUser,message:'this is my infomation'})
    }catch(error){
        console.log(error);
    }
}



module.exports = {user,registerUser}
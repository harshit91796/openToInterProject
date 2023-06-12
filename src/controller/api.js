const college = require('../model/collegeModel');
const intern = require('../model/interModel');


async function createCollege(req,res){
    try {
      const { name, fullName, logoLink} = req.body
    if(req.body === null){
    return  res.status(400).send({status : false, msg : "enter the data of intern"})
    }
    if(!name){
    return  res.status(400).send({status : false, msg : "name required"})
    }
    if(!fullName){
    return  res.status(400).send({status : false, msg : "full name required"})
    }
    if(!logoLink){
    return  res.status(400).send({status : false, msg : "logo link required"})
    }
   
   const data = {
     name ,
     fullName,
     logoLink,
     isDeleted : false
   }

   await college.create(data)
 
  
   res.status(201).send({data : data , msg : "succesfully created"})
    } catch (error) {
     return  res.status(500).send({status : false , err : error.message})
    }
  
  }



async function createIntern(req,res){
  try {
    const { name, mobile, email, collegeName} = req.body
  if(req.body === null){
   return res.status(400).send({status : false, msg : "enter the data of intern"})
  }
  if(!name){
   return  res.status(400).send({status : false, msg : "name required"})
  }
  if(!mobile){
   return  res.status(400).send({status : false, msg : "mobile required"})
  }
  if(!email){
   return res.status(400).send({status : false, msg : "email required"})
  }
  if(!collegeName){
   return res.status(400).send({status : false, msg : "collegeName required"})
  }
 const mobileDublicate = await intern.findOne({ mobile: mobile})

 if(mobileDublicate){
    return res.status(400).send({status : false, msg : "mobile is already registered"})
   }

 const emailDublicate = await intern.findOne({ email: email})
 if(emailDublicate){
    return res.status(400).send({status : false, msg : "email is already registered"})
   }

 
const collegeID = await college.findOne({name : collegeName});

if(!collegeID){
  return  res.status(400).send({status : false, msg : "college name is wrong"})
}
if(collegeID.isDeleted === true){
  return  res.status(400).send({status : false, msg : "college is deleted"})
}

 const data = {
    name,
    mobile,
    email,
    collegeId : collegeID._id,
    isDeleted : false
 } 
 
 await intern.create(data)

 res.status(201).send({status : true , data : data , msg : "succesfully created"})
  } catch (error) {
    return res.status(500).send({err : error.message})
  }

}

async function getCollege(req,res){
    try {
     const  { name } = req.query
    console.log(name)
     const data = await college.findOne({name : name})
     console.log(data)

     if(!data){
      return  res.status(400).send({status : false, msg : "there is no college with that name"})
     }
     
    const student = await intern.find({collegeId : data._id})
    // console.log(student)
    const result = {
        data,
        intern : student
    }
    
   return res.status(200).send({ status : true ,data : result })

    } catch (error) {
      return res.status(500).send({status : false, err : error.message})
    }
}




module.exports = {createCollege,createIntern,getCollege}
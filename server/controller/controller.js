var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"content not be empty"});
        return;
    }

    //new schema user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save use in the database
    user
      .save(user)
      .then(data =>{
        //res.send(data)
        res.redirect('/add-user');
      })
      .catch(err=>{
        res.status(500).send({
            message:err.message||"error occurred"
        });
      });
}

//retrieve and return all users or single user
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"not found"})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"err"})
        })
    }else{
    
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"ERROR while getting yo info dog"})
    })
}
}

//update a new identified user by user id 
exports.update=(req,res)=>{
    if(!req.body){
        return res
          .status(400)
          .send({message:"data cannot be empty"})
    }

    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
      .then(data=>{
        if(!data){
            res.status(404).send({message: "cannot update user"})
        }else{
            res.send(data)
        }
      })
      .catch(err=>
        res.status(500).send({message: "err"}))
}

//delete a user with specified user id
exports.delete=(req,res)=>{
    const id=req.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data=>{
        if(!data){
            res.status(404).send({message: "cannot work"})
        }else{
            res.send({
                message:"User was deleted"
            })
        }
      })
      .catch(err=>{
        res.status(500).send({
            message:"cannot delete"
        });
      });
}
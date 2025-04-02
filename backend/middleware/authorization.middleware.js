function authorization(req, res, next){
  
        if(req.role !== "admin"){
         return res.status(403).json({message: "access denied"})
        }

        next()
   
}

export default authorization
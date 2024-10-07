const jwt=require('jsonwebtoken');
function auth(req,res,next)
{
    const token=req.header('Authorization');
    if(!token)
     return res.status(404).send('access denined');
    try{
        const verified=jwt.verify(token.process.env.SECRET_KEY);
        req.user=verified;
        next();
    }
    catch(error)
    {
      res.status(404).send('Invalid token');
    }

}
module.exports=auth;
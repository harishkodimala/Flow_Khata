export const authenticateRole = (...role) => {

  return (req, res, next) => {
    console.log("User Role:", req.user ? req.user.role : "No user data");
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

export const isAdmin =
(req,res,next)=>{

  if(
    req.user.role !== "ADMIN"
  ){

    return res.status(403).json({

      message:"Access denied"

    });

  }

  next();

};
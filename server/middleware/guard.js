export function guard(req, res, next){
    if(!req.session.user){
        return res.status(404).send({ message: "User has no session"});
    }
    next();
}
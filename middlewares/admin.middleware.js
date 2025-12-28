
export const isAdmin = (req,res,next) => {
    if (req.user.userRole !== "ADMIN") {
        return res.status(401).json({
            message:"YOU ARE NOT AUTHORIZED TO CREATE A MOVIES.Only admin can create movie."
        })
    }
    next()
}
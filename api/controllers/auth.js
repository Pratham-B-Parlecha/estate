import bcrypt from "bcrypt"

export const register = (req, res) => {
    const {username, email, password} = req.body;

    const hashedPassword = bcrypt.hash(password, 10);
    console.log(hashedPassword)
}
export const login = (req, res) => {
   
}
export const logout = (req, res) => {
    
}
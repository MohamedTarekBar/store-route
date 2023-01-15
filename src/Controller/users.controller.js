const User = require("../Model/users.model")

const model = new User()

const indexUsers = async (req,res,next) => {
    try {
        const users = await model.index();
        return res.json({
            status: 200,
            message: 'retreive users successfully',
            data: users
        });
    } catch (error) {
        next (error)
    }
}

const createUser = async (req,res,next) => {
    try {
        const user = await model.create(res.locals.user);
        return res.json({
            status: 200,
            message: 'user added successfully',
            data: user
        });
    } catch (error) {
        next (error)
    }
}

const updateUser = async (req,res,next) => {
    try {
        const user = await model.update(res.locals.user);
        return res.json({
            status: 200,
            message: 'user updated successfully',
            data: user
        });
    } catch (error) {
        next (error)
    }
}

module.exports = {indexUsers,createUser,updateUser}
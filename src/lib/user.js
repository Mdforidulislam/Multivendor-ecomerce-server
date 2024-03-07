const { usersInfo } = require("../models/user");

// get the user from the database that's way logic building here 

const getUserInfo = async (email) => {
    try {
        const user = await usersInfo.findOne({ userEmail: email });
        if (user) {
            const { username, userEmail, userType } = user;
            return { message: 'User found', userType, email, username, userEmail };
        } else {
            return { message: 'User not found' };
        }
    } catch (error) {
        console.log('Error fetching user:', error);
        throw error;
    }
}

// user insert to database 

const registerUserL = async (userInfo) => {
    try {
        console.log(userInfo)
        if (!userInfo || Object.keys(userInfo).length === 0) {
            return { message: 'Please provide valid user data' };
        }
        
        // Create a new instance of the UserInfo model with the provided data
        const newUser = new usersInfo(userInfo);
        
        // Save the new user to the database
        const registerInfo = await newUser.save();
        
        if (registerInfo) {
            return { message: 'Successfully registered', registerInfo };
        } else {
            return { message: 'Something went wrong during registration' };
        }
    } catch (error) {
        console.log('Error registering user:', error);
        throw error;
    }
}
module.exports = {getUserInfo,registerUserL};


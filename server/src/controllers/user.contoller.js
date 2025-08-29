import imagekit from "../config/imageKit.js";
import { User } from "../models/user.model.js";
import fs from 'fs';


export const getUserData = async (req, res) => {
    try{
        const { userId } = req.auth();
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }
        res.status(200).json({success: true, data: user});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const updateUserData = async (req, res) => {
    try{
        const { userId } = req.auth();
        const { full_name, username, bio, location } = req.body;

        const tempUser = await User.findById(userId);

        if(!tempUser) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        if(tempUser.username !== username) {
            const userWithSameUsername = await User.findOne({ username });
            if(userWithSameUsername) {
                res.status(400).json({success: false, message: "Username already taken"});
                username = tempUser.username;
            }
        }

        !username && (username = tempUser.username);

        const updatedData = {
            full_name,
            username,
            bio,
            location,
        }

        const profile = req.file.profile && req.file.profile[0];
        const cover = req.file.cover && req.file.cover[0];

        if( profile ) {
            const buffer = fs.readFileSync(profile.path);
            const response = await imagekit.upload({
                file : buffer,
                fileName : profile.originalname,
            });
            const url = imagekit.url({
                path : response.filePath,
                transformation : [
                    {quality : "auto"},
                    {format : "webp"},
                    {width : "512"},
                ]
            });
            updatedData.profile_picture = url;
        }
        if( cover ) {
            const buffer = fs.readFileSync(cover.path);
            const response = await imagekit.upload({
                file : buffer,
                fileName : profile.originalname,
            });
            const url = imagekit.url({
                path : response.filePath,
                transformation : [
                    {quality : "auto"},
                    {format : "webp"},
                    {width : "1280"},
                ]
            });
            updatedData.cover_photo = url;
        }

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        res.json({success: true, user, message: "Profile updated successfully"});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const discoverUser = async (req, res) => {
    try{
        const { userId } = req.auth();
        const { input } = req.body;

        const allUsers = await User.find(
            {
                $or : [
                    {username : new RegExp(input, 'i')},
                    {email : new RegExp(input, 'i')},
                    {full_name : new RegExp(input, 'i')},
                    {location : new RegExp(input, 'i')},
                ] 
            }
        ).limit(10);
        
        const filteredUsers = allUsers.filter(user => user._id !== userId);

        res.status(200).json({success: true, users: filteredUsers})

    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

// function to follow user 
export const followUser = async (req, res) => {
    try{
        const { userId } = req.auth();
        const { id } = req.body;

        const userToFollow = await User.findById(id);
        const currentUser = await User.findById(userId);

        if(currentUser.following.includes(id)){
            return res.status(400).json({success: false, message: "You are already following this user"});
        }
        currentUser.following.push(id);
        await currentUser.save();
        
        userToFollow.followers.push(userId);
        await userToFollow.save();
        
        res.status(200).json({success: true, message: "User followed successfully"});

    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const unfollowUser = async (req, res) => {
    try{
        const { userId } = req.auth();
        const { id } = req.body;
        const userToUnfollow = await User.findById(id);
        const currentUser = await User.findById(userId);

        if(!currentUser.following.includes(id)){
            return res.status(400).json({success: false, message: "You are not following this user"});
        }
        currentUser.following = currentUser.following.filter(followingId => followingId !== id);
        await currentUser.save();

        userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId !== userId);
        await userToUnfollow.save();

        res.status(200).json({success: true, message: "User unfollowed successfully"});

    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

        
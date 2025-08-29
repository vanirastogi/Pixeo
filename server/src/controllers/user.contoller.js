export const getUserData = async (req, res) => {
    try{
        const { userId } = req.auth();
        const user = await User.find;

    }
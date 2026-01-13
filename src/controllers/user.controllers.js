export const getCurrentUserController = async (req, res) => {
    const { user } = req;

    res.status(200).json({
        status: 200,
        message: 'Current user info',
        data: {
            name: user.name,
            email: user.email,
        },
    });
};
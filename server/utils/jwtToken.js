const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // Cookie expiry time
        httpOnly: true, // Cookie is not accessible by JavaScript
        secure: process.env.NODE_ENV === 'production', // Set secure to true in production (for HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict', // Set SameSite to None for cross-origin in production, Strict in development
    };

    res.status(statusCode)
        .cookie("token", token, options)  // Set the token in the cookie
        .json({
            success: true,
            user,
            token,  // Optionally return the token in the response
        });
};

module.exports = sendToken;

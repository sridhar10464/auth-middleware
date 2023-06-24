const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occured" });
    }
};

const loginController = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(401).json({ message: "Invalid credintials" });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET_KEY);
    res.json({ token });
};

module.exports = { registerController, loginController }
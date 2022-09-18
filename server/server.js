const express = require("express");
const cors = require("cors")
require("dotenv").config();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Server
const app = express();
const port = process.env.PORT;
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

// parsing the incoming data
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
    console.log("Server app listening on port " + port);
});

app.post("/login", function (req, res) {
    const token = jwt.sign({ user: req.body.access_token }, process.env.JWT_SECRET);
    res.status(200).cookie("token", token, { httpOnly: true }).send();
});

app.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ loggedIn: false, accessToken: '' });
        } else {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ loggedIn: true, accessToken: verified.user });
        }
    } catch (err) {
        return res.json({ loggedIn: false, accessToken: '' });
    }
});

app.get("/logout", function (req, res) {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
});
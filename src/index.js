
const express = require("express");
const user = require('./model/user')
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/usertoday";
// const userrouter = require('./controller/controller')
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(
    console.log('mongodb connected')
);

const app = express();
const port = 3000;
app.use(express.json({ extended: false }));
// app.use(userrouter);
app.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        const newuser = new user(
            req.body,
        );
        newuser.save();
        return res.json(newuser);
        return res.status(200).json({ msg: "Success", newuser });
    } catch (e) {
        console.log(e);
        res.json(e);
    }


})
app.patch('/update/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const newuser = await user.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({ msg: "success", newuser })
    } catch (e) {
        res.status(404).json(e);
    }
});
try {
    app.get('/items', async (req, res) => {
        const items = await user.find({}).sort({ "roll": "1" });
        res.json(items);
    })

} catch (error) {
    res.json(e);
}

app.delete('/delete', async (req, res) => {

    try {
        let olduser = await user.findOne({ "name": req.body.name })
        console.log(olduser)

        if (!olduser) {
            return res.status(401).json({ msg: "event not found" })
        } else
            await olduser.deleteOne({ _id: olduser._id });
        return res.status(200).json({ msg: "document is deleted" })




    } catch (error) {
        return res.json(e);
    }


})




app.get("/", (req, res) => {
    res.send("Hello, World!");
});


app.listen(port, "localhost", () => {
    console.log(`Server is running on http://localhost:${port}`);
});

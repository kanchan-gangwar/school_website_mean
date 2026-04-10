let express = require("express");
let app = express();
app.listen(8000, () =>{
    console.log("server is running")
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})
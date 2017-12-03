const  path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();


//To setup the middleware
app.use(express.static(publicPath))

app.listen(port, (err, res) => {
    if (err){
        return err
    }else {
        console.log(`Started up at port ${port}`);
    }

});

module.exports = {app};
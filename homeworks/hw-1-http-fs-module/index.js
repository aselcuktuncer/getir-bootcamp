const http = require('http'); //hhtp module
const fs = require('fs'); //file system module

//log file is created at the proper path using "a" stream method
const logFile = fs.createWriteStream(__dirname + "/history.log", {flags: "a"});

//server is created by this method
const server = http.createServer((req,res) => {
    const url = req.url; //requested url
    const date = new Date().toString() //to log date in log file

    //requested urls are directed accordingly and a message is sent to user
    if(url === "/"){
        //200 OK message
        res.writeHead(200,{ "Content-Type": "text/html" });
        res.write("<h1>You are at INDEX page</h1>")
    }else if(url === "/about"){
        res.writeHead(200,{ "Content-Type": "text/html" });
        res.write("<h1>You are at ABOUT page</h1>")
    }else if(url === "/contact"){
        res.writeHead(200,{ "Content-Type": "text/html" });
        res.write("<h1>You are at CONTACT page</h1>")
    }else if(url === "/blog"){
        res.writeHead(200,{ "Content-Type": "text/html" });
        res.write("<h1>You are at BLOG page</h1>")
    }else{
        //404 error
        res.writeHead(404,{ "Content-Type": "text/html" });
        res.write("<h1>404 WHAT THE HELL ARE YOU DOING HERE 404</h1>")
    }
    //writing to log file
    logFile.write(`\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000${req.url} URL which has RawHeaders: ${req.rawHeaders}",`)

    //end of the response
    res.end();
})

const port = 3000; //port number

//server is running by listen method
server.listen(port, () => {
    console.log(`Server is running on port number: ${port}`)
})
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('public'))
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 3000
const fs = require('fs')
let string = ""
app.get('/words/:num', (req,res,next) =>{
    data = fs.readFileSync("words.json","utf-8")
    data = JSON.parse(data)
    if(req.params.num === '1'){
    data1 = data[0]
    }
    else if(req.params.num === '2'){
        data1 = data[1]
    }
    else{
        data1 = data[2]
    }
    random_elements = []
    for (let i = 0; i < 10 + Number(req.params.num); i++){
     random_elements.push(data1[Math.floor(Math.random() * data1.length)])
    }
    string = random_elements.join(" ")
    res.send(random_elements)
    console.log(random_elements)
})

app.post('/isCorrect/',(req,res,next) => {
    const received_data = req.body;
    if (string === req.body.message){
        console.log("Good Work")
        res.send("Good Work")
    }
    else{
        console.log(req.body.message);
        let resp = 'Ваша відповідь: "'
        for(let i = 0;i< string.length; i++){
            if (string[i] === req.body.message[i]){
                resp += string[i]
                console.log('RESP ==' + resp)
            }
            else {
                resp += req.body.message
                resp += `"     |    Помилка після ${i}-того символу`
                console.log(resp)
                res.send(resp)
                break;
            }
        }
    }
    
})
app.listen(PORT, () => {
    console.log('Server is running on the ' + PORT)
})

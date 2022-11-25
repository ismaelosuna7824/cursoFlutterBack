const cors = require('cors');
const express = require('express');

let data = [];

const app = express();
app.use(cors())
app.use(express.json());


app.get('/users', (req, res)=>{
    setTimeout(() => {
        res.status(200).json(data)
    }, 2000);
})

app.post('/save', (req, res)=>{
    const dataBody = req.body
    if(data.length == 0){
        dataBody.id = 1
    }else{
        dataBody.id = data.length + 1
    }
    data.push(dataBody)
    res.status(201).json({status: true})
});


app.post('/saveError', (req, res)=>{
    const dataBody = req.body
    if(data.length == 0){
        dataBody.id = 1
    }else{
        dataBody.id = data.length + 1
    }
    //data.push(dataBody)
    res.status(401).json({message: "ha ocurrido un error"})
});


app.put('/update', (req, res)=>{
    const dataBody = req.body
    data[dataBody.id - 1].name = dataBody.name
    data[dataBody.id - 1].lastname = dataBody.lastname
    res.status(200).json({status: true})
})  

app.delete('/delete', (req, res)=>{
    const dtabody = req.body;
    const dta = data.filter((x)=> x.id != dtabody.id)
    data = dta;
    res.status(200).json({status: true})
})

app.listen(5000, function() {
    console.log("listening on *:5000");
});



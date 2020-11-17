const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { createSecretKey } = require('crypto')

const app = express()
const port=process.env.PORT||3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
          error:"you must provide an adress"
        })}
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.render('404')
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return createSecretKey.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
      
  
})
app.get('/home',(req,res)=>{
    res.render('index')

})
app.get('/about',(req,res)=>{
    res.render('about',{title:"about",
des: "this is a weather app",
 name: "Tajamul Basheer"})
})
app.get("/help",(req,res)=>{
    res.render('help', { title: "help", name: "Tajamul Basheer"})
})
app.get("/help/*",(req,res)=>{
    res.send("try searching help only")
})
app.get('/',(req,res)=>{
    res.render('index')
})

app.get('*',(req,res)=>{
    res.render('404',{name:"Tajamul Basheer",error:"404 error cannot find"})
}) 

app.listen(port, () => {
    console.log('Server is up on port'+port);
})
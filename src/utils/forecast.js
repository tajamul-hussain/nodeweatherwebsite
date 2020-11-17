const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=bb9799ca0bec9d969ce5f9ee02886855&query=${latitude},${longitude}`
   request({url,json:true},(error,{body}={})=>{
       if(error){
           callback("unable to connect to weather services")

       }else if(body.error){
           callback('unable to find location')

       }
       else{
           callback(undefined, body.current.weather_descriptions[0] + " the current tempeture is " + body.current.temperature + " it feels like " + body.current.feelslike)

       }
   })


}
module.exports=forecast;
// // const { response } = require("express");

// fetch('http://localhost:3000/weather?address=anantnag').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)

//         }else{
//             console.log(data.location)
//             console.log(data.forecast)

//         }
//     })
// })
const weatherForm=document.querySelector('form')
var messageOne=document.querySelector('#message-1')
var messageTwo=document.querySelector('#message-2')
const search=document.querySelector("input")
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value;
    messageOne.textContent='loading...'
    messageTwo.textContent="";
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                
                messageOne.textContent=data.error
            } else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
})
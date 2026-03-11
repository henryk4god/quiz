const API_URL="https://script.google.com/macros/s/AKfycbyXAW_LVbytV-ZQiNlSF1k0StOOtGgNXOoIUoE4jII1cvo_CP01DhpWYMr1tiSF00ZABQ/exec"

let quizData=[]
let answers=[]
let current=0

const quizId=new URLSearchParams(location.search).get("quizId")

async function loadQuiz(){

const fd=new FormData()
fd.append("action","getQuiz")
fd.append("quizId",quizId)

const res=await fetch(API_URL,{method:"POST",body:fd})
const data=await res.json()

quizData=JSON.parse(data.questions)

document.getElementById("quizTitle").innerText=data.title

showQuestion()

}

function showQuestion(){

const q=quizData[current]

let html=`<h3>${q.text}</h3>`

q.options.forEach(opt=>{
html+=`<label><input type="radio" name="opt" value="${opt}">${opt}</label><br>`
})

document.getElementById("quizBox").innerHTML=html

}

document.getElementById("nextBtn").onclick=function(){

const selected=document.querySelector("input[name=opt]:checked")

answers.push(selected.value)

current++

if(current<quizData.length){

showQuestion()

}else{

document.getElementById("leadCard").style.display="block"

}

}

document.getElementById("submitLeadBtn").onclick=submitLead

async function submitLead(){

const name=document.getElementById("leadName").value
const email=document.getElementById("leadEmail").value

const fd=new FormData()

fd.append("action","submitQuiz")
fd.append("quizId",quizId)
fd.append("answers",JSON.stringify(answers))
fd.append("name",name)
fd.append("email",email)

const res=await fetch(API_URL,{method:"POST",body:fd})
const data=await res.json()

document.getElementById("resultCard").style.display="block"

document.getElementById("resultBox").innerHTML=`
<p><strong>1. RESULT</strong></p>
<p>${data.result}</p>
`

}

loadQuiz()
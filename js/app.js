const API_URL="https://script.google.com/macros/s/AKfycbyXAW_LVbytV-ZQiNlSF1k0StOOtGgNXOoIUoE4jII1cvo_CP01DhpWYMr1tiSF00ZABQ/exec"

let createdQuizId=""

document.getElementById("saveQuizBtn").onclick=async function(){

const title=document.getElementById("quizTitle").value

const questions=[]

document.querySelectorAll(".question").forEach(q=>{

const text=q.querySelector(".questionText").value

const options=[]

q.querySelectorAll(".optionText").forEach(o=>{
options.push(o.value)
})

questions.push({text,options})

})

const formData=new FormData()

formData.append("action","createQuiz")
formData.append("title",title)
formData.append("questions",JSON.stringify(questions))

const res=await fetch(API_URL,{method:"POST",body:formData})
const data=await res.json()

createdQuizId=data.quizId

document.getElementById("resultBox").innerText="Quiz created: "+createdQuizId

}

document.getElementById("shareBtn").onclick=function(){

const link=
`quiz.html?quizId=${createdQuizId}`

navigator.clipboard.writeText(link)

alert("Quiz link copied")

}

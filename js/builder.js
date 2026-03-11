const container=document.getElementById("questionsContainer")

document.getElementById("addQuestionBtn").onclick=addQuestion

function addQuestion(){

const q=document.createElement("div")
q.className="question"

q.innerHTML=`
<input class="questionText" placeholder="Question">

<div class="options"></div>

<button class="addOption">Add Option</button>
`

container.appendChild(q)

q.querySelector(".addOption").onclick=function(){

const opt=document.createElement("input")
opt.className="optionText"
opt.placeholder="Option"

q.querySelector(".options").appendChild(opt)

}

}

function loadTemplate(data){

document.getElementById("quizTitle").value=data.title

data.questions.forEach(q=>{
addQuestion()
})

}

document.getElementById("loadTemplate").onclick=function(){

fetch("templates/entrepreneur.json")
.then(res=>res.json())
.then(data=>loadTemplate(data))

}
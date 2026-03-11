const API_URL="https://script.google.com/macros/s/AKfycbyXAW_LVbytV-ZQiNlSF1k0StOOtGgNXOoIUoE4jII1cvo_CP01DhpWYMr1tiSF00ZABQ/exec"

async function loadAnalytics(){

const fd=new FormData()

fd.append("action","getAnalytics")

const res=await fetch(API_URL,{method:"POST",body:fd})
const data=await res.json()

document.getElementById("analyticsBox").innerText=JSON.stringify(data,null,2)

}

loadAnalytics()
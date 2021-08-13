let signup = () => {
    var email = document.getElementById('email').value
    var password = document.getElementById('pass').value
    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data)
            alert("User Registered Successfully")

        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    document.getElementById('email').value=""
    document.getElementById('pass').value=""
    
}

let signin = () => {
    var email = document.getElementById('loginemail').value
    var password = document.getElementById('loginpass').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log("user signin")
            console.log(data)
            window.location.href = './home.html'
            alert("User Login Successfully")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            alert("Incorrect Email or Password")

        });

        var name1 = document.getElementById("loginname").value
        console.log(name1)
        localStorage.setItem("name",name1)
        localStorage.getItem("name")

        // setTimeout(function(){ 
        //     alert("Hello"); 
        // window.location.href = './home.html'},
        //  3000);
        // window.location.href = './home.html'

}

a=localStorage.getItem("name")



var quizDB = [
{
    question:"1. Who is the Current Prime Minister of Pakistan",
    a:"Imran Khan",
    b:"Nawaz Sharif",
    c:"Shah Mehmood Qureshi",
    d:"Iskandar Mirza",
    ans:"ans1"
},{
    question:"2. What is the National Animal of Pakistan",
    a:"Lion",
    b:"Markhor",
    c:"Tiger",
    d:"Wolf",
    ans:"ans2"
},{
    question:"3. Who made Pakistan Atomic State?",
    a:"Allama Iqbal",
    b:"Quaid e Azam",
    c:"Chaudary Rehmat Ali",
    d:"Dr. Abdul Qadeer Khan",
    ans:"ans4"
},
{
    question:"4. Who was the first governor general of Pakistan",
    a:"Qamar Javed Bajwa",
    b:"Liaquat Ali Khan",
    c:"Quaid e Azam",
    d:"Iskandar Mirza",
    ans:"ans3"
},
{
    question:"5. China is in which side of Pakistan",
    a:"North",
    b:"South",
    c:"East",
    d:"West",
    ans:"ans1"
},
]

var question = document.querySelector('.question')
var option1 = document.getElementById("option1")
var option2 = document.getElementById("option2")
var option3 = document.getElementById("option3")
var option4 = document.getElementById("option4")
var submit = document.getElementById("submit")
var answers = document.querySelectorAll(".answer")



var questionCount = 0;
let score = 0;

function loadquestion(){
    var questionlist = quizDB[questionCount];
    question.innerText = questionlist.question;

    option1.innerText = questionlist.a;
    option2.innerText = questionlist.b;
    option3.innerText = questionlist.c;
    option4.innerText = questionlist.d;
    
}

loadquestion()

const getcheckedanswer = () => {
    let answer;

    answers.forEach(currentelement => {
        if(currentelement.checked){
            answer = currentelement.id;
        }
    });
    return answer;

}

const deselectAll = () =>{
    answers.forEach((currentelement) => currentelement.checked = false)
}
  


var showscore = document.getElementById("showscore")

function signout(){
    localStorage.clear()
    window.location.href = './index.html'
    alert("User Signout successfully")

}


submit.addEventListener('click' , () =>{
    const checkedAnswer = getcheckedanswer();
    console.log(checkedAnswer);

    if (checkedAnswer === quizDB[questionCount].ans){
        score++
        console.log(score)

    }

    questionCount++

    deselectAll()

    if (questionCount<quizDB.length){
        loadquestion()
    }
    else{

        showscore.innerHTML =`
            <h3>Your Score is ${score}/${quizDB.length}</h3>
            <button class="btn" onclick="location.reload()">Reload</button>
            <button class="btn" onclick="signout()">signout</button>
            `

        showscore.classList.remove("scorearea")
        a = document.getElementById("submit")
        a.disabled = true;

        firebase.database().ref("score of "+localStorage.getItem("name")).set(score)
    }
})









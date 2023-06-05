const question =document.getElementById('question');
const choices=Array.from(document.getElementsByClassName('choice-text'));
const question_number=document.getElementById('questionnum');
const score_number=document.getElementById('scorenum');
const progressbarfull=document.getElementById('progressbarinner');
let score=0;
let question_counter=0;
score_number.innerText=score;
let accepting_answers=false;
let available_questions=[];
let currentquestion={};
let questions=[];
fetch("questions.json").then(res=>{
    return res.json();
}).then(loadedquestions=>{
    questions=loadedquestions;
    startgame();
})
.catch(err=>{
    console.error(err);
})
////////////////////////////constants///////////////////////////////////////////

const correct_bonus=10;
const max_questions=3;

////////////////////////////////////Functions////////////////////////////////////////////
function startgame(){
    question_counter=0;
    score=0;
    available_questions=[...questions];
    getnewquestion();
}
function getnewquestion()
{
 if(available_questions.length===0 || question_counter>=max_questions)
 {
    localStorage.setItem('mostrecentscore',score);
    return window.location.assign("/endgame.html");
 }
 question_counter++;
 question_number.innerText=`${question_counter}/${max_questions}`;
 progressbarfull.style.width=`${(question_counter/max_questions)*100}%`;
 const question_index=Math.floor( Math.random()*available_questions.length);
 currentquestion=available_questions[question_index];
 question.innerText=currentquestion.question;
 choices.forEach(choice =>{
    const number=choice.dataset['number'];
    choice.innerText=currentquestion['choice'+number];
 })
 available_questions.splice(question_index,1);
 accepting_answers=true;
}
choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!accepting_answers) return;
        accepting_answers=false;
        var selected_choice=e.target;
        var  selected_answer=selected_choice.dataset['number'];
        var classtoapply="incorrect";
          if(selected_answer==currentquestion.answer)
        {
            classtoapply="correct";
            increment_score(correct_bonus);
        }
        selected_choice.parentElement.classList.add(classtoapply);

        setTimeout( ()=>{
            selected_choice.parentElement.classList.remove(classtoapply);
            getnewquestion();
        },1000)
       
    })
})
function increment_score(num){
score+=num;
score_number.innerText=score;
}


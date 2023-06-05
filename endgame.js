const usertext=document.getElementById('username');
const savescorebtn=document.getElementById('save');
const mostrecentscore=localStorage.getItem('mostrecentscore');
const scoreupdate=document.getElementById('score_end');
const max_high_score=5;
scoreupdate.innerText=mostrecentscore;
const highscores=JSON.parse(localStorage.getItem('highscores')) || [];
usertext.addEventListener('keyup',()=>{
    savescorebtn.disabled=!usertext.value;
})
function savescore(e){
    const score={
        score:mostrecentscore,
        name:usertext.value
    }
   highscores.push(score);
   highscores.sort((a,b)=>b.score-a.score);
   highscores.splice(max_high_score);
   localStorage.setItem('highscores',JSON.stringify(highscores));
   window.location.assign('/app.html');
}
function callgame(){
    window.location.assign('/game.html');
}
function callhome(){
    window.location.assign('/app.html');
}

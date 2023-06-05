const highscorelist=document.getElementById('highscorelist');
const high=JSON.parse(localStorage.getItem('highscores'))|| [];
highscorelist.innerHTML = high.map(score=>{
    return `<li class="high-score">${score.name} : ${score.score}</li>`
}).join("");
window.onbeforeunload = () => {
    localStorage.removeItem('highscores');
  }
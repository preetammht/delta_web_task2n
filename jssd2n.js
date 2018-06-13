var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

var ct=0;
var timeoutId = null;
var result=false;
var score=0;
var scoreid=null;

var ball = {
  x: 100,
  y: 100,
  
  radius: 20,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = '15px Arial';
    ctx.fillText('Deep', this.x, this.y);
  }
};

function mouseMoveHandler(e){
	if(e.clientX - canvas.offsetLeft<20)
	{ball.x=20;
	ball.y=e.clientY - canvas.offsetTop;
     return;}
	if(e.clientX - canvas.offsetLeft>880)
	{ball.x=880;
	ball.y=e.clientY - canvas.offsetTop;
     return;}

    if(e.clientY - canvas.offsetTop<20)
	{ball.x=e.clientX - canvas.offsetLeft;
	ball.y=20;
     return;}
     if(e.clientY - canvas.offsetTop>580)
	{ball.x=e.clientX - canvas.offsetLeft;
	ball.y=580;
     return;} 
   
	
	ball.x=e.clientX - canvas.offsetLeft;
	ball.y=e.clientY - canvas.offsetTop;
}

function isColliding(a, b) {
  
  if(a.x>b.x-20&&a.x<b.x+50&&a.y>b.y&&a.y<b.y+b.l)
  	result=true;
  if(a.x>b.x&&a.x<b.x+30&&a.y>b.y-20&&a.y<b.y+b.l+20)
  	result=true;

  return result;
}
 
function sc(){score++;}

function menu() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000';
  ctx.font = '36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('deep maze game(normal)', canvas.width / 2, canvas.height / 4);
  ctx.font = '20px Arial';
  ctx.fillText('INSTRUCTIONS:Avoid the walls. ', canvas.width / 2, canvas.height / 2);
  ctx.fillText('Use mouse to move deep and maximize the score. ', canvas.width / 2, canvas.height / 2+30);
  ctx.strokeStyle = 'red';
  ctx.rect(375,500,150,50);
  ctx.stroke();
  ctx.fillText('Start game ', 450, 525);
  ctx.strokeStyle = '#000000';
   // Start the game on a click
  canvas.addEventListener('click', startGame);
}
  
  function makeSquare(x, y, length, breadth) {
  return {
    x: x,
    y: y,
    l: length,
    b: breadth,
    draw: function() {ctx.fillStyle = 'brown';
      ctx.fillRect(this.x, this.y, this.b, this.l);
      ctx.fillStyle = '#000000';   
    }
  };
}

var enemies = [];

function makeEnemy() {
  var enemyX = canvas.width;
  var enemySize = Math.floor(Math.random()*1000)%500;;
  var enemyY=Math.floor(Math.random()*1000)%(canvas.height - enemySize);
  enemies.push(makeSquare(enemyX, enemyY, enemySize, 30));
}
 
function setct(){ct=1;}

  function startGame(e) {
  var sngx=	e.clientX - canvas.offsetLeft;
  var sngy=	e.clientY - canvas.offsetTop;
  if(sngx>375&&sngx<525&&sngy>500&&sngy<550)
  {canvas.removeEventListener('click', startGame);
   timeoutId = setInterval(makeEnemy, 500);
  setTimeout(makeEnemy, 1000);
  setTimeout(setct, 1300);
  scoreid = setInterval(sc, 500);
    canvas.addEventListener("mousemove", mouseMoveHandler, false);

   // canvas.addEventListener("click", clickHandler, false);
    draw();}
  
}


function exitgame()
{ctx.clearRect(0,0, canvas.width, canvas.height);
 clearInterval(timeoutId);
 clearInterval(scoreid);
 canvas.removeEventListener("mousemove", mouseMoveHandler);
 ctx.fillStyle = '#000000';
  ctx.font = '36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('game over', canvas.width / 2, canvas.height / 4);
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' +score, canvas.width / 2, canvas.height / 2); 
  ctx.beginPath();
   ctx.rect(375,500,150,50);
  ctx.stroke();
  ctx.closePath();
  ctx.fillText('Restart', 450, 525);
  ct=0;
  timeoutId = null;
  result=false;
  score=0; ball.x=100;ball.y=100 ;enemies=[];
  canvas.addEventListener('click', startGame);}

function draw()
{ctx.clearRect(0,0, canvas.width, canvas.height);
	ball.draw();
ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText('Score:'+score, 125,50);	
enemies.forEach(function(enemy) {
    enemy.x -= 7;
    enemy.draw();
  });
if(ct==1)
{if(enemies[0].x +30<2)
	enemies.splice(0, 1);
}

enemies.forEach(function(enemy) {
   isColliding(ball,enemy);
  });

if(result)
exitgame();
else
requestAnimationFrame(draw);
}

menu();
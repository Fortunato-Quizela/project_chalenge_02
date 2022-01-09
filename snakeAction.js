window.onload = () => {
   document.getElementById('score').innerHTML = '10';
   document.getElementById('time').innerHTML = '00:00';
   var area = document.getElementById('gameArea');
   var score = document.getElementById('score');
   var ctx = area.getContext('2d');

   var playing = false;
   var dir = 1;
   var vx = vy = 0;
   var px = py = 10;
   var qtdPiece = 34;
   var sizePiece = 15;
   var snake = [];
   var length = 9;
   var food = {
      x: Math.floor(Math.random() * 33 + 1),
      y: Math.floor(Math.random() * 33 + 1)
   }
   snake[0] = {x: 10, y: 10};

   document.addEventListener('keydown', movingSnake);
   var play = setInterval(game, 150);
   var time = setInterval(timer, 1000);

   function game(){
      createGameArea(ctx, area);
      checkupMoving();
      createSnake(ctx, sizePiece);
      checkupEating();
      createFood(ctx, sizePiece, food);
   }
   //create game area
   function createGameArea(ctx, area) {
      ctx.fillStyle = 'rgb(100, 150, 60)';
      ctx.fillRect(0, 0, area.width, area.height);
   }
   //checkup the moving of the snake
   function checkupMoving(){
      px += vx;
      py += vy;

      if(px < 0){
         px = qtdPiece - 1;
      } else if(px > qtdPiece - 1){
         px = 0;
      }
      
      if(py < 0){
         py = qtdPiece - 1;
      }else if(py > qtdPiece - 1){
         py = 0;
      }
   }
   //create the snake body
   function createSnake(ctx) {
      for (let index = 0; index < snake.length - 1; index++) {
         ctx.fillStyle = 'rgb(34, 45, 1)';
         ctx.fillRect(snake[index].x * sizePiece, snake[index].y * sizePiece, sizePiece, sizePiece);
         
         ctx.fillStyle = '#111';
         ctx.fillRect(snake[index].x * sizePiece + 4, snake[index].y * sizePiece + 4, sizePiece - 8, sizePiece - 8);

         ctx.fillStyle = '#111';
         ctx.fillRect(snake[snake.length - 1].x * sizePiece, snake[snake.length - 1].y * sizePiece, sizePiece, sizePiece);

         if(snake[index].x == px && snake[index].y == py && playing){
            vx = vy = 0;
            length = 9;
            playing = false;
            clearInterval(play);
            clearInterval(time);
            if (confirm('Game Over\nDeseja continuar?')) {
               window.onload();
            }else{
               window.close();
            }
         }
      }
      snake.push({x: px, y: py});
      while (snake.length > length) {
         snake.shift();
      }
   }
   //chekup if it's eating
   function checkupEating(){
      if(food.x == px && food.y == py){
         length++;
         score.innerHTML = Number(score.innerHTML) + 5;
         food = {
            x: Math.floor(Math.random() * 33 + 1),
            y: Math.floor(Math.random() * 33 + 1)
         }
      }
   }
   //create the food
   function createFood(ctx, sizePiece, food) {
      ctx.beginPath();
      ctx.arc(food.x * sizePiece + (sizePiece / 2), food.y * sizePiece + (sizePiece / 2), sizePiece / 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
   }
   //moving the snake
   function movingSnake(key) {
      playing = true;
      switch (key.keyCode) {
         case 37: vx = (vx < dir)? -dir : vx; vy = 0; break;
         case 38: vy = (vy < dir)? -dir : vy; vx = 0; break;
         case 39: vx = (vx > -dir)? dir : vx; vy = 0; break;
         case 40: vy = (vy > -dir)? dir : vy; vx = 0; break;
      }
   }
   //time of the game
   function timer(){
      var tmp = document.getElementById('time');
      var min = tmp.innerHTML.substr(0,2);
      var sec = tmp.innerHTML.substr(3);

      if( sec < 59){
         tmp.innerHTML = min + ':' + 
         (Number(sec) < 9 ? '0' + (Number(sec) + 1) : Number(sec)  + 1);
      }else{
         tmp.innerHTML = (Number(min) < 9 ? '0' + (Number(min) + 1) : Number(min)  + 1) 
         + '00';
      }
   }
}
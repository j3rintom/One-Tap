const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const cursor = document.querySelector(".cursor");
// console.log(cursor);
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const scoreboard = document.querySelector(".scoreboard");
const loader = document.querySelector(".loading-container");
window.addEventListener("load", () => {
  loader.style.display = "none";
});
// Event Listeners
addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  cursor.setAttribute(
    "style",
    "left:" + (e.pageX - 3) + "px;top:" + (e.pageY - 3) + "px;"
  );
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Objects
class Ball {
  constructor(x, y, radius, color, dx, i) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.i = i;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x - 10, this.y - 10, this.radius, this.radius);
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
    c.closePath();
  }
  update() {
    if (this.x > canvas.width - 20 || this.x < 20) {
      this.dx = -1 * this.dx;
    }
    this.x += this.dx;
    xArray[this.i] = this.x;
    this.draw();
  }
}

// Implementation
let balls = [];
let hit = 0;
let score = 0;
let click = 0;
let xArray = [];
let yArray = [];
let accuracy = 0;
const Time = document.querySelector(".time");
const scoreText = document.querySelector(".score");
const accuText = document.querySelector(".accu");
let time = 60;
function init() {
  setInterval(() => {
    if (time <= 0) {
      time = 0;
      cancelAnimationFrame(anim);
      accuracy = hit / click;
      score = hit * accuracy;
      scoreText.innerHTML = `Score : ${Math.round(score).toFixed(1)}`;
      accuText.innerHTML = `Accuracy : ${Math.round(accuracy * 100).toFixed(
        1
      )}%`;
      scoreboard.style.display = "flex";
      //   console.log(accuracy, score);
    } else {
      time -= 1;
    }
    Time.innerHTML = time;

    // console.log(time);
  }, 1000);
  score = 0;
  hit = 0;
  xArray = [];
  yArray = [];
  for (let i = 0; i < 4; i++) {
    var x = Math.random() * (canvas.width - 190) + 90;
    var y = Math.random() * (canvas.height - 175) + 95;
    for (let j = 0; j < i; j++) {
      if (Math.abs(x - xArray[j]) <= 40) {
        x = x + 80;
        // console.log("collide");
      }
      if (Math.abs(y - yArray[j]) <= 40) {
        y = y + 80;
        // console.log("collide");
      }

      //   if (x+20 > canvas.width) {
      //     const diff = Math.abs(x - canvas.width);
      //     x = x - diff;
      //   }
    }
    xArray.push(x);
    yArray.push(y);
  }
  for (let i = 0; i < 4; i++) {
    let dx = Math.random() * 3 + 1.5;
    balls.push(new Ball(xArray[i], yArray[i], 40, "#035096", dx, i));
  }
}

// Animation Loop

function animate() {
  anim = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
  });
}
function randomX() {
  var x = Math.random() * (canvas.width - 100) + 20;
  return x;
}
function randomY() {
  var y = Math.random() * (canvas.height - 175) + 95;
  return y;
}
function createNewBall(x, y, i) {
  let dx = Math.random() * 3 + 1.5;
  const newBall = new Ball(x, y, 40, "#035096", dx, i);
  return newBall;
}
function shoot(i) {
  hit += 1;

  // console.log(hit);
  // console.log(click);
  //   console.log("x" + xArray);
  //   console.log("y" + yArray);

  let newX = randomX();
  let newY = randomY();
  let newBall = createNewBall(newX, newY, i);
  balls.splice(i, 1, newBall);
  xArray.splice(i, 1, newX);
  yArray.splice(i, 1, newY);
  //   for (let i = 0; i < 4; i++) {
  //     if (Math.abs(x - xArray[i]) < 10 && Math.abs(y - yArray[i]) < 10) {
  //     }
  //   }
}
const audio = new Audio("./static/shot.ogg");
window.addEventListener("click", (e) => {
  let x = e.clientX - 3;
  let y = e.clientY - 3;
  console.log(xArray, x);
  if (time > 0) {
    click += 1;
    for (let i = 0; i < 4; i++) {
      if (Math.abs(x - xArray[i]) < 23 && Math.abs(y - yArray[i]) < 23) {
        shoot(i);
        audio.play();
      }
    }
  }
});
const start = document.querySelector(".start");
const floater = document.querySelector(".floater");
start.addEventListener("click", () => {
  floater.style.display = "none";
  init();

  animate();
});

const outPlay = document.querySelector("#outPlay");
const inPlay = document.querySelector("#inPlay");
outPlay.addEventListener("mouseover", () => {
  inPlay.style.animation = "playAnim 1s forwards ease-in";

  setTimeout(() => {
    inPlay.style.animation = "none";
  }, 1000);
});

const svgDiv = document.querySelector(".svgDiv");
const retry = document.querySelector("#retry");
retry.addEventListener("mouseover", () => {
  svgDiv.style.animation = "retryAnim 0.7s forwards ease";

  setTimeout(() => {
    svgDiv.style.animation = "none";
  }, 1000);
});

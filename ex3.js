const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const cursor = document.querySelector(".cursor");

canvas.width = innerWidth;
canvas.height = innerHeight;
const loader = document.querySelector(".loading-container");
window.addEventListener("load", () => {
  loader.style.display = "none";
});
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const scoreboard = document.querySelector(".scoreboard");

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
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;

    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
    c.closePath();
  }
  update() {
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
let radi = 0;
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
      // console.log(accuracy, score);
    } else {
      time -= 1;
    }
    Time.innerHTML = time;

    // console.log(time);
  }, 1000);

  setInterval(() => {
    newBall(0);
  }, 1000);
  score = 0;
  hit = 0;
  xArray = [];
  yArray = [];

  var x = Math.random() * (canvas.width - 100) + 20;
  var y = Math.random() * (canvas.height - 175) + 95;
  let radius = Math.random() * 40 + 30;

  xArray[0] = x;
  yArray[0] = y;
  radi = radius;
  balls.push(new Ball(xArray[0], yArray[0], radius, "#035096"));
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
function createNewBall(x, y) {
  let radius = Math.random() * 40 + 30;
  const newBall = new Ball(x, y, radius, "#035096");
  return newBall;
}

function shoot(i) {
  balls = [];
  hit += 1;
}
function newBall(i) {
  let newX = randomX();
  let newY = randomY();
  let newBall = createNewBall(newX, newY);
  balls.splice(i, 1, newBall);
  xArray.splice(i, 1, newX);
  yArray.splice(i, 1, newY);
}

const audio = new Audio("./static/shot.ogg");
window.addEventListener("click", (e) => {
  let x = e.clientX - 3;
  let y = e.clientY - 3;
  if (time > 0) {
    click += 1;
    if (
      Math.abs(x - xArray[0]) <= radi / 2 &&
      Math.abs(y - yArray[0]) <= radi / 2
    ) {
      // console.log("click");

      audio.play();
      shoot(0);
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

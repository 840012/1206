// by SamuelYAN
// more works //
   // https://twitter.com/SamuelAnn0924
   // https://www.instagram.com/samuel_yan_1990/

   let particles = [];
   let colors = [];
   let song;
   let parNum = 1000; // パーティクルの総数
   let showMessage = false;
   var mySize;
   
   function setup() {
     //mySize = min(windowWidth,windowHeight);
     // pixelDensity(5);
     createCanvas(windowWidth, windowHeight);
     colorMode(HSB, 360, 100, 100, 100);
     colors[0] = color(15, 90, 90, random(25, 50));
     colors[1] = color(175, 90, 90, random(25, 50));
     for (let i = 0; i < parNum; i++) {
       particles.push(new Particle(random(width), random(height)));
     } // 全部のパーティクルを作る
     background(0, 0, 5, 100);
   }
   
   function draw() {

    if (showMessage) {
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text('顯示文字功能啟用！', width / 2, height / 2);
    }
     for (let j = particles.length - 1; j > 0; j--) {
       particles[j].update();
       particles[j].show();
       if (particles[j].finished()) {
         particles.splice(j, 1);
         background(0, 0, 5, 0.1);
       }
     }
     
     for (let i = particles.length; i < parNum; i++) {
       particles.push(new Particle(random(width), random(height)));
     } // パーティクルを補充
   }
   
   function keyTyped() {
    if (key === "s" || key === "S") {
      noLoop();
      saveCanvas("Sands-002", "png");
    }
   }

   function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.pos = createVector(this.x, this.y);
  
    this.life = random(1);
    this.c = color(random(colors));
    this.ff = 0;
  
    this.update = function () {
      this.ff = noise(this.pos.x / 100, this.pos.y / 100) * TWO_PI; // Flow Field
      let mainP = 1200;
      let changeDir = TWO_PI / mainP; // 方向を変わる
      let roundff = round((this.ff / TWO_PI) * mainP); // round ff
      // *** main point *** //
      this.ff = changeDir * roundff; // 新方向
      
      if (this.ff < 6 && this.ff > 3) {
        this.c = colors[0];
        stroke(this.c);
        this.pos.add(tan(this.ff)*random(1,3), tan(this.ff));
      } else {
        this.c = colors[1];
        stroke(this.c);
        this.pos.sub(sin(this.ff)*random(0.1,1), cos(this.ff));
      }
    };
  
    this.show = function () {
      noFill();
      strokeWeight(random(1.25));
      let lx = 20;
      let ly = 20;
      let px = constrain(this.pos.x, lx, width - lx);
      let py = constrain(this.pos.y, ly, height - ly);
      point(px, py);
    };
  
    this.finished = function () {
      this.life -= random(random(random(random()))) / 10;
    this.life = constrain(this.life, 0, 1);
      if (this.life == 0) {
        return true;
      } else {
        return false;
      }
    };
  }

function preload() {
  song = loadSound("SWAK.mp3");
}

function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  hamburger.classList.toggle('open');
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');
}

function showText() {
  showMessage = true;
  setTimeout(() => {
    showMessage = false;
  }, 200);
}

function refresh() {
  particles = [];
  for (let i = 0; i < parNum; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  background(0, 0, 5, 100);
}

function playMusic() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}
  
   
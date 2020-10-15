var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
canvas.Height = window.innerHeight;
canvas.Width = window.innerWidth;
var innerHeight = canvas.Height;
var innerWidth = canvas.Width;

window.addEventListener("resize", function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    innerHeight = canvas.Height;
    innerWidth = canvas.Width;
    init();
})



// var link = "https://github.com/aryanDhakad";
// var text1 = "I'm Aryan , A Web Developer";


// canvas.addEventListener("click", function (event) {

//     if (event.x > 500 && event.x < 860 && event.y > 320 && event.y < 360) {

//         window.open(link)
//     }
// })
var ministars = [];
var stars = [];
var bgStars = []
var ticker = 0;
var randomSpawn = 75;

function init() {
    ministars = [];
    stars = [];
    bgStars = []
    for (var i = 0; i < 100; i++) {
        var radius = Math.random() * 4;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (250);
        var r = new star(x, y, 0, 0, radius);
        r.g = 0;

        bgStars.push(r)

    }
    ticker = 0;
    randomSpawn = 75;
    for (var i = 0; i < 1; i++) {
        var radius = 9;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var vx = Math.random() * 40 - 20;
        var y = 0;

        stars.push(new star(x, y, vx, 0, radius));
    }

}


function star(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.g = 1.2;
    this.bounce = 0;
    this.bool1 = 0;

    this.color = "#ffffdd";

    this.draw = () => {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.shadowColor = "#E3EaEf";
        c.shadowBlur = 20;
        c.fillStyle = this.color;
        c.fill();

    };
    this.update = () => {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius + this.dy > window.innerHeight - 80) {
            this.dy = -this.dy * 0.65;
            if (this.radius > 2)
                this.radius -= 4;
            this.shatter();

            this.bounce += 1;
            if (this.bounce === 2) this.bool1 = 1;
        } else {
            this.dy += this.g;
        }


        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };

    this.shatter = () => {
        if (!this.bool1) {
            for (var i = 0; i < 6; i++) {
                var mx = Math.random() * 30 - 15;
                var my = -Math.random() * 17;

                var mY = this.y - Math.random() * 50 + 10;

                ministars.push(new miniStar(this.x, mY, mx, my, 3));
            }
        }
    };
}

function miniStar(x, y, dx, dy, radius) {
    star.call(this, x, y, dx, dy, radius);
    this.color = "black";
    this.g = 0.8;
    this.ttl = 200;
    this.opacity = 1;
    this.draw = () => {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = `rgb(192,192,192,${this.opacity})`;
        c.shadowColor = "#E3EaEf";
        c.shadowBlur = 20;
        c.fill();

    };
    this.update = () => {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius + this.dy > window.innerHeight - 80) {
            if (this.dy < 30) this.dy = -this.dy;
        } else {
            this.dy += this.g;
        }

        this.ttl -= 1;
        this.opacity -= 1 / this.ttl;
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}


// IMPLEMENTATION

const backgr = c.createLinearGradient(0, 0, 0, innerHeight);
backgr.addColorStop(0, "#171e36")
backgr.addColorStop(1, "#3f586b");

function drawMountain(amount, height, color) {
    const Mwidth = innerWidth / amount;
    for (var i = 0; i < amount; i++) {

        c.beginPath();
        c.moveTo(i * Mwidth, innerHeight - 80);
        c.lineTo(i * Mwidth + Mwidth, innerHeight - 80);
        c.lineTo(i * Mwidth + (Mwidth / 2), innerHeight - 80 - height);
        c.lineTo(i * Mwidth, innerHeight - 80);
        c.closePath();
        c.fillstyle = color;
        c.fill();


    }
}



init();
animate();

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = backgr;
    c.fillRect(0, 0, innerWidth, innerHeight);

    drawMountain(1, 330, "gray");
    drawMountain(3, 150, "#5e6f64");
    drawMountain(7, 60, "#3b6978");

    c.save()
    c.font = "30px Ariel";
    c.fillStyle = "white"

    // c.fillText(text1,500,350);

    c.restore();

    c.fillStyle = "#1b1c25";
    c.fillRect(0, innerHeight - 80, innerWidth, 80)
    stars.forEach((star, index) => {
        star.update();
        if (star.radius == 0) {
            stars.splice(index, 1);
        }
    });
    ministars.forEach((mini, index) => {
        mini.update();
        if (mini.ttl == 0) {
            ministars.splice(index, 1);
        }
    });
    ticker += 1;
    if (ticker % randomSpawn == 0) {
        var x = Math.random() * (innerWidth - 18) + 18;
        var vx = Math.random() * 40 - 20;
        stars.push(new star(x, 0, vx, 0, 9))
        randomSpawn = Math.floor(Math.random() * 200) + 75;
    }
    bgStars.forEach(star => {
        star.update();
    })


}
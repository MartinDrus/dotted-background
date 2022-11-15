
let canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
})

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})

let colorArray = [
    "#FD7B6D",
    "#E36277",
    "#FA78CF",
    "#D762E3",
    "#C86DFD"
]

console.log();

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = radius; 
    this.color = Math.floor(Math.random() * colorArray.length);



    this.draw = function(){

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = colorArray[this.color]
        c.fill();
    }

    this.update = function(){

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.y - this.y < 50 && mouse.x - this.x > -50 && mouse.y - this.y > -50 ) {
            if (this.radius < 35) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();
    }
}

let circle = new Circle(200, 200, 3, 3, 30);




let circleArray = [];

function init() {

    circleArray = []

    for (let i = 0; i < 2000; i++) {
        let radius = Math.random() * 3 + 1;
    
        let x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
        let y = Math.floor(Math.random() * innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
    
        circleArray.push(new Circle(x, y, dx, dy, radius));
    
    }
}

init();



function animate() {
    //Wiederholung der Funktion
    requestAnimationFrame(animate);
    //Das Canvas wird neu geladen
    c.clearRect(0, 0, innerWidth, innerHeight);

    //circle.update();

    circleArray.forEach(circle => {
        circle.update()
    })

}
animate();


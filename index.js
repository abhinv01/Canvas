const canvas = document.getElementById("drawing-board")
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;


canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let strokeColor = "#000000"
let startX,startY;



function draw(e){
    if(!isPainting) return


    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.roundCap = "round";
    // console.log(e.clientX,e.clientY );
    // console.log(canvasOffsetX);

    //clientX is X-value from browser window, subtracting canvasOffset as there is toolbar on left side
    //lineTo method takes X-value of canvas and not browser
    // start drawing from this coords 
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY );
    //actually draw
    ctx.stroke();
}



toolbar.addEventListener("click",e => {
    if(e.target.id === "clear"){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
})

toolbar.addEventListener("change",e => {
    if(e.target.id === "stroke"){
        strokeColor = e.target.value
    }
    if(e.target.id === "lineWidth"){
        lineWidth = e.target.value;
    }
})

canvas.addEventListener("mousedown",(e) => {
    isPainting=true;
    // startX = e.clientX
    // startY = e.clientY
})

canvas.addEventListener("mousemove",draw)

canvas.addEventListener("mouseup",(e) => {
    isPainting=false;
    // ctx.stroke();
    //beginpath to close the path we drew and new line will start from mouse pointers line
    ctx.beginPath();
})

//if mouse goes out of canvas stop painting
canvas.addEventListener("mouseout",(e) => {
    isPainting=false;
})

const canvas = document.getElementById("drawing-board-id")
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

let canvasOffsetX = canvas.offsetLeft;
let canvasOffsetY = canvas.offsetTop;


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


   /*  // alternate method
    // const rect = canvas.getBoundingClientRect();
    //     const x = touch.clientX - rect.left;
    //     const y = touch.clientY - rect.top;

    //     // Draw a line to the current touch position
    //     ctx.lineTo(x, y); */
   
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY );
    //actually draw
    ctx.stroke();
}

function handleResize(e){
    // console.log(window.innerWidth);  
    console.log(canvas.width);

    canvasOffsetX = canvas.offsetLeft;
    canvasOffsetY = canvas.offsetTop;


    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;
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



canvas.addEventListener("touchstart", (e) => {
    isPainting = true;
    // Start painting at the touch point
    console.log(e.touches[0]);
    draw(e.touches[0]);
});

// Function to handle touchmove event
canvas.addEventListener("touchmove", (e) => {
    // Prevent scrolling on touch devices
    e.preventDefault();
    // Continue painting while moving the touch point
    draw(e.touches[0]);
});

// Function to handle touchend event
canvas.addEventListener("touchend", () => {
    isPainting = false;
    // Begin a new path to start a new line after lifting the touch
    ctx.beginPath();
});


window.addEventListener('resize', handleResize);

// Function to handle drawing based on touch coordinates
// function draw(touch) {
//     if (!isPainting) return;

//     // Get touch coordinates relative to the canvas
//     const rect = canvas.getBoundingClientRect();
//     const x = touch.clientX - rect.left;
//     const y = touch.clientY - rect.top;

//     // Draw a line to the current touch position
//     ctx.lineTo(x, y);
//     ctx.stroke();
// }

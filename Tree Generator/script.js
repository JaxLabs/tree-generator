const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let curve = 10;

function drawTree(startX, startY, length, angle, branchWidth, baseColor, leafColor) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = baseColor;
    ctx.fillStyle = leafColor
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    if (angle > 0){
        ctx.bezierCurveTo(curve, -length/2, 20, -length/2, 0, -length); 
    } else {
        ctx.bezierCurveTo(curve, -length/2, -20, -length/2, 0, -length);
    }

    ctx.stroke();

    if(length < 12) {
        //leafs
        ctx.beginPath();
        ctx.arc(0, -length, 10, 0, Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }
    

    drawTree(0, -length,length * 0.75, angle + curve, branchWidth * 0.6);
    drawTree(0, -length,length * 0.75, angle - curve, branchWidth * 0.6);

    ctx.restore();
}
drawTree(canvas.width/2, canvas.height - 80, 120, 0, 25, 'brown', 'pink');

function generateRandomTree() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    let centerPointX = canvas.width/2;
    let length = Math.floor((Math.random() * 20) + 100);
    let angle = 0;
    let branchWidth = (Math.random() * 140) + 1;
    let baseColor = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    let leafColor = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';

    generateButton.style.background = baseColor;
    curve = (Math.random() * 20) + 10;
    drawTree(centerPointX, canvas.height - 80, length, angle, branchWidth,baseColor, leafColor);
}

generateButton.addEventListener('click', generateRandomTree);



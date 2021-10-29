const {
    createCanvas
} = require('canvas');

// 添加干扰点
const addDot = (ctx, W, H) => {
    const num = 100; // 干扰点数量
    for (let i = 0; i < num; i++) {
        ctx.fillStyle = getColor();
        let x = Math.random() * W;
        let y = Math.random() * H;
        ctx.fillRect(x, y, 2, 2);
    }
}

// 添加横线
const addLine = (ctx, W, H) => {
    const num = 4; // 横线数量
    for (let i = 0; i < num; i++) {
        ctx.strokeStyle = getColor();
        ctx.beginPath();
        ctx.lineTo(Math.random() * W, Math.random() * H);
        ctx.lineTo(Math.random() * W, Math.random() * H);
        ctx.stroke();
    }
}

// 获取随机颜色
const getColor = () => {
    return `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`;
}

module.exports = (num) => {
    const W = 200;
    const H = 100;
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');
    ctx.font = '60px monospace';
    ctx.rotate(0.1);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = getColor();
    ctx.fillText(num, W / 2, H / 2);
    addDot(ctx, W, H);
    addLine(ctx, W, H);
    return canvas.toDataURL();
}
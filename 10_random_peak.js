const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function radian(degree) {
    return (degree * Math.PI) / 180;
}

function generateRandomPosition(startPos, endPos, noOfPoints) {
    const randomPosition = [];
    //y = cos (x*freq)* amplitude + 100
    for (let i = 0; i < noOfPoints; i++) {
        const x = Math.random() * (endPos.x - startPos.x) + startPos.x;

        const randomHeight = Math.random() * (endPos.y - startPos.y);

        const y = Math.cos(x * 0.01) * 250 + startPos.y;
        randomPosition.push({ x, y });
    }

    return randomPosition;
}

function setup() {
    const width = 700;
    const height = 500;
    const title = "points in translated circle";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    const minX = 0;
    const maxX = width;
    const minY = height / 2;
    const maxY = height;

    const noOfPoints = 500;
    const randomPeakVal = generateRandomPosition(
        { x: minX, y: minY },
        { x: maxX, y: maxY },
        noOfPoints,
    );

    const pallete = {
        bg: r.DARKBLUE,
        circle: {
            r: 255,
            g: 255,
            b: 0,
            a: 200,
        },
    };

    return {
        screen: { width, height },
        randomPeakVal,
        pallete,
    };
}

function update(w) {}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    for (const value of w.randomPeakVal) {
        r.DrawCircleV(value, 4, w.pallete.circle);
    }

    r.EndDrawing();
}

function tearDown() {
    r.CloseWindow();
}

function loop(world) {
    while (running()) {
        update(world);
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
    tearDown();
}

main();

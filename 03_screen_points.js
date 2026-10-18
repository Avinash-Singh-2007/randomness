const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandomPosition(startPos, endPos, noOfPoints) {
    const randomPosition = [];

    for (let i = 0; i < noOfPoints; i++) {
        const x = Math.random() * (endPos.x - startPos.x) + startPos.x;
        const y = Math.random() * (endPos.y - startPos.y) + startPos.y;
        randomPosition.push({ x, y });
    }

    return randomPosition;
}

function setup() {
    const width = 700;
    const height = 500;
    const title = "screen points";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    const minX = 0;
    const maxX = width;
    const minY = 0;
    const maxY = height;

    const noOfPoints = 500;

    const randomValues = generateRandomPosition(
        { x: minX, y: minY },
        { x: maxX, y: maxY },
        noOfPoints,
    );

    const pallete = {
        bg: r.DARKBLUE,
        circle: {
            r: 255,
            g: 255,
            b: 255,
            a: 150,
        },
    };

    return {
        screen: { width, height },
        randomValues,
        pallete,
    };
}

function update(w) {}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    for (const value of w.randomValues) {
        r.DrawCircleV(value, 8, w.pallete.circle);
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

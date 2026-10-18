const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function generateRandomPositionX(startPos, endPos, noOfPoints) {
    const randomPositionX = [];

    for (let i = 0; i < noOfPoints; i++) {
        const x = Math.random() * (endPos - startPos) + startPos;
        randomPositionX.push(x);
    }

    return randomPositionX;
}

function setup() {
    const width = 700;
    const height = 500;
    const title = "lines between";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    const minX = 200;
    const maxX = width - 200;

    const noOfPoints = 100;

    const randomValuesX = generateRandomPositionX(minX, maxX, noOfPoints);

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
        randomValuesX,
        pallete,
    };
}

function update(w) {}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    for (const value of w.randomValuesX) {
        r.DrawRectangle(value, 0, 2, w.screen.height, w.pallete.circle);
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

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
    const heigth = 500;
    const title = "rectangle points";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, heigth, title);
    r.SetTargetFPS(fps);

    const rect = { x: 100, y: 100, width: 500, height: 300 };

    const minX = rect.x;
    const maxX = rect.x + rect.width;
    const minY = rect.y;
    const maxY = rect.y + rect.height;

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
        screen: { width, heigth },
        rect,
        randomValues,
        pallete,
    };
}

function update(w) {}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    r.DrawRectangleLinesEx(w.rect, 2, r.WHITE);

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

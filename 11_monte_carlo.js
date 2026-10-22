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
    const width = 500;
    const heigth = 500;
    const title = "monte carlo";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, heigth, title);
    r.SetTargetFPS(fps);

    const rect = { x: 100, y: 100, width: 300, height: 300 };
    const circle = { x: 250, y: 250, radius: 50 };

    const minX = rect.x;
    const maxX = rect.x + rect.width;
    const minY = rect.y;
    const maxY = rect.y + rect.height;

    const noOfPoints = 100000;

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
        circle,
        noOfPoints,
    };
}

function update(w) {}

function distance(point1, point2) {
    return Math.abs(
        Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2),
    );
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    r.DrawRectangleLinesEx(w.rect, 2, r.WHITE);

    let totalPointsInsideCircle = 0;
    for (const value of w.randomValues) {
        r.DrawCircleV(value, 1, w.pallete.circle);
        if (distance(value, { x: w.circle.x, y: w.circle.y }) < w.circle.radius)
            totalPointsInsideCircle += 1;
    }
    r.DrawCircleLines(w.circle.x, w.circle.y, w.circle.radius, r.RED);

    const areaOfSquare = w.rect.width ** 2;
    const density = areaOfSquare / w.noOfPoints;
    const circleArea = Math.floor(Math.PI * w.circle.radius ** 2);
    const predictedArea = Math.floor(density * totalPointsInsideCircle);

    r.DrawText(`Actual area : ${circleArea}`, 100, 10, 30, r.WHITE);
    r.DrawText(`Predicted area : ${predictedArea}`, 100, 50, 30, r.WHITE);

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

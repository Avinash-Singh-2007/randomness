const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function radian(degree) {
    return (degree * 180) / Math.PI;
}

function generateRandomPosition(distance, angle, noOfPoints, origin) {
    const randomPosition = [];

    for (let i = 0; i < noOfPoints; i++) {
        const randomAngle = Math.random() * angle;
        const randomdistance = Math.random() * distance;

        const x = randomdistance * Math.cos(radian(randomAngle)) + origin.x;
        const y = randomdistance * Math.sin(radian(randomAngle)) + origin.y;
        randomPosition.push({ x, y });
    }

    return randomPosition;
}

function setup() {
    const width = 700;
    const heigth = 500;
    const title = "points in translated circle";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, heigth, title);
    r.SetTargetFPS(fps);

    const circle = { x: width / 2, y: heigth / 2, radius: 200 };

    const angle = 360;
    const noOfPoints = 300;

    const randomValues = generateRandomPosition(
        circle.radius,
        angle,
        noOfPoints,
        { x: circle.x, y: circle.y },
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
        screen: { width, heigth },
        circle,
        randomValues,
        pallete,
    };
}

function update(w) {}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    r.DrawCircleLines(w.circle.x, w.circle.y, w.circle.radius, r.WHITE);

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

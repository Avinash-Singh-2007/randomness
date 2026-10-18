const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function radian(degree) {
    return (degree * Math.PI) / 180;
}

function generateRandomPosition(start, angle, parallelogram, noOfPoints) {
    const randomPosition = [];

    for (let i = 0; i < noOfPoints; i++) {
        const randomAngle = Math.random() * angle;

        const shift = parallelogram.heigth / Math.tan(radian(randomAngle));
        // console.log(shift);

        const x = shift + start.x;
        const y = Math.random() * parallelogram.heigth + start.y;

        randomPosition.push({ x, y });
    }

    return randomPosition;
}

function setup() {
    const width = 700;
    const heigth = 500;
    const title = "points in parallelogram";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, heigth, title);
    r.SetTargetFPS(fps);

    const angleA = 100;

    const parallelogram = {
        width: 300,
        heigth: 150,
    };

    const point1 = {
        x: 200,
        y: 200,
    };

    const point2 = {
        x: point1.x + parallelogram.width,
        y: point1.y,
    };

    const shift = parallelogram.heigth / Math.tan(radian(angleA));

    const point3 = {
        x: point2.x + shift,
        y: point2.y + parallelogram.heigth,
    };

    const point4 = {
        x: +point1.x + shift,
        y: point3.y,
    };

    const noOfPoints = 300;

    const randomValues = generateRandomPosition(
        { x: point1.x, y: point1.y },
        angleA,
        parallelogram,
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
        screen: { width, heigth },
        randomValues,
        pallete,
        point1,
        point2,
        point3,
        point4,
    };
}

function update(w) {}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    r.DrawLineEx(w.point1, w.point2, 2, r.WHITE);
    r.DrawLineEx(w.point2, w.point3, 2, r.WHITE);
    r.DrawLineEx(w.point3, w.point4, 2, r.WHITE);
    r.DrawLineEx(w.point4, w.point1, 2, r.WHITE);

    for (const value of w.randomValues) {
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

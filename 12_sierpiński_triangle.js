const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const width = 500;
    const heigth = 500;
    const title = "Sierpinski";
    const fps = 10;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, heigth, title);
    r.SetTargetFPS(fps);

    const noOfPoints = 10000;

    const point1 = {
        x: 100,
        y: 400,
    };
    const point2 = {
        x: 400,
        y: 400,
    };
    const point3 = {
        x: 250,
        y: 100,
    };

    const initial = {
        x: 250,
        y: 250,
    };

    const pallete = {
        bg: r.BLACK,
        circle: {
            r: 255,
            g: 255,
            b: 255,
            a: 150,
        },
    };

    const coordinatesArr = getSierpinskiTriangleCoor(
        { 1: point1, 2: point2, 3: point3 },
        noOfPoints,
        initial,
    );

    return {
        screen: { width, heigth },
        pallete,
        coordinatesArr,
        point1,
        point2,
        point3,
    };
}

function update(w) {}

function getSierpinskiTriangleCoor(points, noOfPoints, initial) {
    const coordinatesArr = [];
    for (let i = 0; i < noOfPoints; i++) {
        const randomNum = Math.floor(Math.random() * 3 + 1);

        const midPointX = (points[randomNum].x + initial.x) / 2;
        const midPointY = (points[randomNum].y + initial.y) / 2;

        coordinatesArr.push({ x: midPointX, y: midPointY });
        initial.x = midPointX;
        initial.y = midPointY;
    }

    return coordinatesArr;
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    r.DrawTriangleLines(w.point1, w.point2, w.point3, r.WHITE);

    for (const value of w.coordinatesArr) {
        r.DrawCircleV(value, 2, r.WHITE);
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

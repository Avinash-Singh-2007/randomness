const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function calcAverage(arr) {
    let sum = 0;
    for (const value of arr) {
        sum += value;
    }

    return sum / arr.length;
}

function getRandomAverage(noOfRandomNumber, range) {
    const randomValArr = [];
    for (let i = 0; i < noOfRandomNumber; i++) {
        randomValArr.push(
            Math.random() * (range.end - range.start) + range.start,
        );
    }

    return calcAverage(randomValArr);
}

function generateRandomPosition(range, noOfPoints, noOfRandomNumber) {
    const randomPosition = [];

    for (let i = 0; i < noOfPoints; i++) {
        const x = Math.random() * getRandomAverage(noOfRandomNumber, range);
        const y = Math.random() * getRandomAverage(noOfRandomNumber, range);
        randomPosition.push({ x, y });
    }

    return randomPosition;
}

function setup() {
    const width = 500;
    const height = 500;
    const title = "random average";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    const noOfPoints = 400;
    const range = { start: 400, end: width };

    const randomValues = generateRandomPosition(range, noOfPoints, 2);

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

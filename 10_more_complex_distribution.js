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

function generateRandomness(noOfPoints, noOfRandoms) {
    const randomness = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < noOfPoints; i++) {
        const random = [];
        for (let i = 0; i < noOfRandoms; i++) {
            random.push(Math.random());
        }

        const average = calcAverage(random);
        randomness[Math.floor(average * 10)] += 1;
    }

    return randomness;
}

function setup() {
    const width = 1000;
    const height = 500;
    const title = "points in translated circle";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    const noOfPoints = 100;
    const randomness = generateRandomness(noOfPoints, 2);

    const pallete = {
        bg: r.WHITE,
    };

    return {
        screen: { width, height },
        pallete,
        randomness,
    };
}

function update(w) {}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(w.pallete.bg);

    for (let i = 0; i < w.randomness.length; i++) {
        const height = w.randomness[i] * 15;
        r.DrawRectangle(i * 100, w.screen.height - height, 30, height, r.BLACK);
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

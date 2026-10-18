const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const width = 300;
    const heigth = 300;
    const title = "screen points";
    const fps = 60;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, heigth, title);
    r.SetTargetFPS(fps);

    return {
        screen: { width, heigth },
        circle: { x: 0, y: 0 },
    };
}

function update(w) {
    const min = 0;
    const max = w.screen.width;
    w.circle.x = Math.floor(Math.random() * (max - min)) + min;
    w.circle.y = Math.floor(Math.random() * (max - min)) + min;
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawCircle(w.circle.x, w.circle.y, 5, r.WHITE);

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

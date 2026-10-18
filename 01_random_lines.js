const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const width = 500;
    const heigth = 500;
    const title = "Random";
    const fps = 50;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, heigth, title);
    r.SetTargetFPS(fps);

    return {
        screen: { width, heigth },
        rect: { x: 0, y: 0 },
    };
}

function update(w) {
    const min = 0;
    const max = w.screen.width;
    w.rect.x = Math.floor(Math.random() * (max - min)) + min;
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawRectangle(w.rect.x, w.rect.y, 2, w.screen.heigth, r.WHITE);

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

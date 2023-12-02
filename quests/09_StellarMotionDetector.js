// TASK 1

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 10;

// Any helper functions and constants go here.
const red_threshold = 230;
let red_x_0 = Infinity;
let red_x_1 = -Infinity;
let red_y_0 = Infinity;
let red_y_1 = -Infinity;

function draw_blue_rect(dst, x_0, x_1, y_0, y_1) {
    for (let y = y_0; y < y_1; y = y + 1) {
        for (let x = x_0; x < x_1; x = x + 1) {
            dst[y][x][2] = 255;
        }
    }
}

function stellar_motion_detector(src, dst) {
    const width = image_width();
    const height = image_height();
    
    function reset_reds() {
        red_x_0 = Infinity;
        red_x_1 = -Infinity;
        red_y_0 = Infinity;
        red_y_1 = -Infinity;
    }
    
    let new_red_x_0 = red_x_0;
    let new_red_x_1 = red_x_1;
    let new_red_y_0 = red_y_0;
    let new_red_y_1 = red_y_1;
    
    let there_is_red = false;
    
    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            dst[y][x] = src[y][x];
            
            if (src[y][x][0] >= red_threshold) {
                there_is_red = true;
                if (x < new_red_x_0) {
                    new_red_x_0 = x;
                } else if (x > new_red_x_1) {
                    new_red_x_1 = x;
                }
                
                if (y < new_red_y_0) {
                    new_red_y_0 = y;
                } else if (y > new_red_y_1) {
                    new_red_y_1 = y;
                }
            }
        }
    }
    
    draw_blue_rect(dst, new_red_x_0, new_red_x_1, new_red_y_0, new_red_y_1);
    
    if (!there_is_red) {
        reset_reds();
    }
    
    if (new_red_x_0 !== new_red_x_0 
        || new_red_x_1 !== new_red_x_1 
        || new_red_y_0 !== new_red_y_0 
        || new_red_y_1 !== new_red_y_1 
        && !red_x_0 === -Infinity
        ) {
        draw_blue_rect(dst, new_red_x_0, new_red_x_1, new_red_y_0, new_red_y_1);
        red_x_0 = new_red_x_0;
        red_x_1 = new_red_x_1;
        red_y_0 = new_red_y_0;
        red_y_1 = new_red_y_1;
    }
}

install_filter(stellar_motion_detector);

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
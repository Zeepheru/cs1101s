// Q1
// TASK 1

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 2;

function invert(src, dst) {
    const width = image_width();
    const height = image_height();

    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            dst[y][x][0] = 255 - src[y][x][0]; // invert red intensity
            dst[y][x][1] = 255 - src[y][x][1]; // invert green intensity
            dst[y][x][2] = 255 - src[y][x][2]; // invert blue intensity
            dst[y][x][3] = 255;                // always 255
        }
    }
}

function my_first_filter(src, dst) {
    /*
    0,0     0000ff
    0,255   ff0000
    255,0   00ff00
    255,255 ffff00
    */
    const width = image_width();
    const height = image_height();

    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            // set alpha, always 255
            dst[y][x][3] = 255;
            
            // set R
            dst[y][x][0] = y / height * 255;
            
            // set G
            dst[y][x][1] = x / width * 255;
            
            // set B
            dst[y][x][2] = 255 - (x / width + y / height) * 255;
        }
    }
}

// Imma use my art lol
use_image_url("https://pbs.twimg.com/media/F1_Er0RagAA7ov_?format=jpg");
set_dimensions(math_floor(image_width()), math_floor(image_height()));

install_filter(my_first_filter);
// set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q2
// TASK 2

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 2;

function copy(src, dst) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
           dst[i][j][0] = src[i][j][0];
           dst[i][j][1] = src[i][j][1];
           dst[i][j][2] = src[i][j][2];
           dst[i][j][3] = src[i][j][3];
        }
    }
}

// ignore
// function pixel_overlay_rgba(src, dst, x, y, color) {
//     // color is [r, g, b]
//     // didn't need overlay lol.
//     for (let i = 0; i < 3; i = i + 1) {
//         const a = src[y][x][i];
//         const b = color[i];
    
//         if (a < 127) {
//             dst[y][x][i] = 2 * a * b;
//         } else {
//             dst[y][x][i] = 255 - 2 * (255 - a) * (255 - b);
//         }
//     }
// }

// function pixel_lighten(src, dst, x, y, color) {
//     for (let i = 0; i < 3; i = i + 1) {
//         const a = src[y][x][i];
//         const b = color[i];
        
//         dst[y][x][i] = math_max(a, b);
//     }
// }

// function copy_pixel(src, dst, x, y) {
//     for (let i = 0; i < 4; i = i + 1) {
//         dst[y][x][i] = src[y][x][i];
//     }
// }

function set_pixel_rgb(img, x, y, color) {
    for (let i = 0; i < 3; i = i + 1) {
        img[y][x][i] = color[i];
    }
}



function crosshair(src, dst) {
    const crosshair_c = [255, 0, 0];
    const circle_c = [0, 0, 255];
    
    const width = image_width();
    const height = image_height();
    const x_mid = math_floor(width / 2);
    const y_mid = math_floor(height / 2);
    
    function is_circle(x, y) {
        x = x - x_mid;
        y = y - y_mid;
        x = (x / 25);
        y = (y / 25);
        
        return math_ceil(math_sqrt(x * x + y * y)) % 2 === 0;
    }
    
    // first apply the crosshair and copy
    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
           if (x === x_mid) {
               set_pixel_rgb(dst, x_mid, y, crosshair_c);
           } else if (y === y_mid) {
               set_pixel_rgb(dst, x, y_mid, crosshair_c);
           } else {
               dst[y][x] = src[y][x];
           }
        }
    }
    
    // then draw the cirlces on top (as depicted in the ref img)
    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            if (is_circle(x, y)) {
                // set b to 255;
                dst[y][x][2] = 255;
            }
        }
    }
}

// TEST IMAGE
// use_image_url("https://pbs.twimg.com/media/FfSj9UVVUAADoZ9?format=jpg");
// 

install_filter(copy);

install_filter(crosshair);  // use this filter when crosshair function is ready.

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q3
// TASK 3

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

// function copy_pixel_from(src, dst, x1, y1, x0, y0) {
//     for (let i = 0; i < 4; i = i + 1) {
//         dst[y1][x1][i] = src[y0][x0][i];
//     }
// }

function zoom(factor) {
    // antialiasing? nah
    // using nearest-neighbour interpolation
    function zoom_filter(src, dst) {
        const width = image_width();
        const height = image_height();
        const x_mid = math_floor(width / 2);
        const y_mid = math_floor(height / 2);
        
        for (let y = 0; y < height; y = y + 1) {
            for (let x = 0; x < width; x = x + 1) {
                const x_old = math_round((x - x_mid) / factor) + x_mid;
                const y_old = math_round((y - y_mid) / factor) + y_mid;
                
                dst[y][x] = src[y_old][x_old];
            }
        }
    }
    
    return zoom_filter;
}

// TEST IMAGE
// use_image_url("https://pbs.twimg.com/media/FfSj9UVVUAADoZ9?format=jpg");
// 

install_filter(zoom(2));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q4
// TASK 4

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dst) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dst[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dst) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dst[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}

// Copy your solution for Task 3 (zoom) here.
function zoom(factor) {
    function zoom_filter(src, dst) {
        const width = image_width();
        const height = image_height();
        const x_mid = math_floor(width / 2);
        const y_mid = math_floor(height / 2);
        
        for (let y = 0; y < height; y = y + 1) {
            for (let x = 0; x < width; x = x + 1) {
                const x_old = math_round((x - x_mid) / factor) + x_mid;
                const y_old = math_round((y - y_mid) / factor) + y_mid;
                
                dst[y][x] = src[y_old][x_old];
            }
        }
    }
    
    return zoom_filter;
}


function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function stack(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);

    return (src, dst) => {
        const width = image_width();
        const height = image_height();
        const half_height = math_floor(height / 2);

        filter1(src, temp1);
        filter2(src, temp2);

        for (let i = 0; i < half_height; i = i + 1) {
            dst[i] = temp1[i * 2];
            dst[i + half_height] = temp2[i * 2];
        }

        // take last row from temp2, if height is odd
        for (let i = half_height * 2; i < height; i = i + 1) {
            dst[i] = temp2[i];
        }
    };
}

function beside(filter1, filter2) {
    const tmp1 = make_image(WIDTH, HEIGHT);
    const tmp2 = make_image(WIDTH, HEIGHT);
    
    return (src, dst) => {
        const width = image_width();
        const height = image_height();
        const x_mid = math_floor(width / 2);

        filter1(src, tmp1);
        filter2(src, tmp2);
        
        for (let y = 0; y < height; y = y + 1) {
            for (let x = 0; x < x_mid; x = x + 1) {
                dst[y][x] = tmp1[y][x * 2];
                dst[y][x + x_mid] = tmp2[y][x * 2];
            }
            
            // take last col from tmp2, if width is odd
            for (let x = x_mid * 2; x < width; x = x + 1) {
                dst[y][x] = tmp2[y][x];
            }
        }
    };
}

// TEST IMAGE
// use_image_url("https://pbs.twimg.com/media/FfSj9UVVUAADoZ9?format=jpg");
// 


install_filter(stack(beside(flip_vertically, color_invert),
                     beside(copy_image, zoom(2))));
                     
// install_filter(stack(color_invert, zoom(1.5)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q5
// TASK 5

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dst) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dst[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dst) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dst[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}

function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function compose(filter1, filter2) {
    const tmp_img = make_image(WIDTH, HEIGHT);
    
    return (src, dst) => {
        filter1(src, tmp_img);
        filter2(tmp_img, dst);
    };
}

// TEST IMAGE
// use_image_url("https://pbs.twimg.com/media/FfSj9UVVUAADoZ9?format=jpg");
// 


install_filter(compose(flip_vertically, color_invert));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
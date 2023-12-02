// Q1
// TASK 1

function red_rectangle_stream(s) {
    return stream_map(get_img_rect, s);
}

function get_img_rect(img) {
    const r_thres = 250;
    const gb_thres = 10;
    
    let x_0 = Infinity;
    let x_1 = -Infinity;
    let y_0 = Infinity;
    let y_1 = -Infinity;
    
    let there_is_red = false;
    
    for (let y = 0; y < HEIGHT; y = y + 1) {
        for (let x = 0; x < WIDTH; x = x + 1) {
            
            if (img[y][x][0] >= r_thres && img[y][x][1] < gb_thres && img[y][x][2] < gb_thres) {
                there_is_red = true;
                if (x < x_0) {
                    x_0 = x;
                } else if (x > x_1) {
                    x_1 = x;
                }
                
                if (y < y_0) {
                    y_0 = y;
                } else if (y > y_1) {
                    y_1 = y;
                }
            }
        }
    } 
    
    if (there_is_red) {
        return pair(pair(y_0, x_0), pair(y_1, x_1));
    } else {
        return pair(pair(0, 0), pair(0, 0));
    }
}

const stream_head = head(red_rectangle_stream(anomaly_stream));
display(stream_head);
// should evaluate to: [[141, 191], [159, 209]]


// Q2
// TASK 2

// Copy your function red_rectangle_stream from TASK 1 here.
function red_rectangle_stream(s) {
    return stream_map(get_img_rect, s);
}

function get_img_rect(img) {
    const r_thres = 250;
    const gb_thres = 10;
    
    let x_0 = Infinity;
    let x_1 = -Infinity;
    let y_0 = Infinity;
    let y_1 = -Infinity;
    
    let there_is_red = false;
    
    for (let y = 0; y < HEIGHT; y = y + 1) {
        for (let x = 0; x < WIDTH; x = x + 1) {
            
            if (img[y][x][0] >= r_thres && img[y][x][1] < gb_thres && img[y][x][2] < gb_thres) {
                there_is_red = true;
                if (x < x_0) {
                    x_0 = x;
                } else if (x > x_1) {
                    x_1 = x;
                }
                
                if (y < y_0) {
                    y_0 = y;
                } else if (y > y_1) {
                    y_1 = y;
                }
            }
        }
    } 
    
    if (there_is_red) {
        return pair(pair(y_0, x_0), pair(y_1, x_1));
    } else {
        return pair(pair(0, 0), pair(0, 0));
    }
}

function stream_combine(f, s1, s2) {
    // assuming infin streams, so no base cases. 
    const x = f(head(s1), head(s2));
    
    return pair(x, () => stream_combine(f, stream_tail(s1), stream_tail(s2)));
}


// Trim the given image using the given rectangle.
// Returns an image that includes all purely red
// pixels of the given image.

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

// Example:

const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));
                           
const stream_head = head(focused_stream);

display(array_length(stream_head));
display(array_length(stream_head[0]));

// Should return a close-up of the anomaly, a 19x19 image of black,
// red and white pixels.

// Q3
// Use your solutions of the previous tasks and
// write other functions HERE that might be helpful
// to answer the questions in this task.
// Copy your function red_rectangle_stream from TASK 1 here.
function red_rectangle_stream(s) {
    return stream_map(get_img_rect, s);
}

function get_img_rect(img) {
    const r_thres = 250;
    const gb_thres = 10;
    
    let x_0 = Infinity;
    let x_1 = -Infinity;
    let y_0 = Infinity;
    let y_1 = -Infinity;
    
    let there_is_red = false;
    
    for (let y = 0; y < HEIGHT; y = y + 1) {
        for (let x = 0; x < WIDTH; x = x + 1) {
            
            if (img[y][x][0] >= r_thres && img[y][x][1] < gb_thres && img[y][x][2] < gb_thres) {
                there_is_red = true;
                if (x < x_0) {
                    x_0 = x;
                } else if (x > x_1) {
                    x_1 = x;
                }
                
                if (y < y_0) {
                    y_0 = y;
                } else if (y > y_1) {
                    y_1 = y;
                }
            }
        }
    } 
    
    if (there_is_red) {
        display(pair(pair(y_0, x_0), pair(y_1, x_1)));
        return pair(pair(y_0, x_0), pair(y_1, x_1));
    } else {
        return pair(pair(0, 0), pair(0, 0));
    }
}

function stream_combine(f, s1, s2) {
    // assuming infin streams, so no base cases. 
    const x = f(head(s1), head(s2));
    
    return pair(x, () => stream_combine(f, stream_tail(s1), stream_tail(s2)));
}


// Trim the given image using the given rectangle.
// Returns an image that includes all purely red
// pixels of the given image.

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));
                           
const anom_img = head(focused_stream);

let anom_x = array_length(anom_img);
let anom_y = array_length(anom_img[0]);
display("anomaly size - x:" + stringify(anom_x) + "; y:" + stringify(anom_y));

// process colours in anomaly
function check_eq_color(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

let color_list = null;

for (let x = 0; x < anom_x; x = x + 1) {
    for (let y = 0; y < anom_y; y = y + 1) {
        let color = anom_img[y][x];
        if (is_null(filter(x => check_eq_color(x, color), color_list))) {
            color_list = pair(color, color_list);
        }
    }
}

// unique colours of anomaly
display_list(color_list);
// list([255, 255, 255, 255], [255, 0, 0, 255], [0, 0, 0, 255])






/*

Q1: What color it might absorb?
ANS: 
0 < a <= 255, 0 < b <= 255
[0, a, b, 255]

Q2: What color of laser beam would you use?
ANS: 
[0, 255, 255, 255]

Q3: Which part of the shield would you target?
ANS: 
The outer ring 
(color !== [255, 255, 255, 255] && color === [255, 0, 0, 255] &&)


Q4: How did you find the answer?
ANS: 
The anomaly is made up of two colours: [255, 0, 0, 255] (#ff0000 - red) and 
[255, 255, 255, 255] (#ffffff - white). White is the result of all wavelengths
of light being reflected, no light is absorbed, hence the red outer ring has to
be targeted as it can absorb some wavelengths of light. 
We hence maximise green and blue light for the laser beam, as all light will be 
absorbed and none reflected.

*/
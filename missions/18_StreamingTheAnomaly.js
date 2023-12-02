// Q1
// TASK 1

import { alpha_of, blue_of, compose_filter, copy_image, get_video_time,
    green_of, image_height, image_width, install_filter, keep_aspect_ratio,
    pause_at, red_of, reset_filter, set_dimensions, set_fps, set_loop_count,
    set_rgba, set_volume, start, use_image_url, use_local_file, use_video_url
} from "pix_n_flix";

function array_to_stream(a) {
    function streamify(i) {
        return a[i] === undefined 
                ? null
                : pair(a[i], () => streamify(i + 1));
    }
    return streamify(0);
}


display(array_length(anomaly_data) ===
        stream_length(array_to_stream(anomaly_data)));
display(anomaly_data[7] ===
        stream_ref(array_to_stream(anomaly_data), 7));
        
display(stream_ref(array_to_stream(anomaly_data), 7));

// Q2
// TASK 2

import { alpha_of, blue_of, compose_filter, copy_image, get_video_time,
    green_of, image_height, image_width, install_filter, keep_aspect_ratio,
    pause_at, red_of, reset_filter, set_dimensions, set_fps, set_loop_count,
    set_rgba, set_volume, start, use_image_url, use_local_file, use_video_url
} from "pix_n_flix";

const FPS = 10;

// Your array_to_stream function from TASK 1 goes here.
function array_to_stream(a) {
    function streamify(i) {
        return a[i] === undefined 
                ? null
                : pair(a[i], () => streamify(i + 1));
    }
    return streamify(0);
}

function stream_to_filter(s) {
    // 1 img per frame
    const delay = 1000 / FPS; 
    
    const width = image_width();
    const height = image_height();
        
    let ctime = 0;
    let current_stream = s;
    let current_img = head(s);
    
    function get_stream_value_then_inc() {
        if (!is_null(stream_tail(current_stream))) {
            const value = head(current_stream);
            current_stream = stream_tail(current_stream);
            return value;
        } else {
            return head(current_stream);
        }
    }
    
    function stream_filter(src, dst) {
        if (get_video_time() > ctime + delay) {
            ctime = get_video_time();
            
            current_img = get_stream_value_then_inc();
        }
    
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
              dst[i][j] = current_img[i][j];
            }
        }
    }
    
    return stream_filter;
}



const data_stream = array_to_stream(anomaly_data);

install_filter(stream_to_filter(data_stream));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q3
// TASK 3

import { alpha_of, blue_of, compose_filter, copy_image, get_video_time,
    green_of, image_height, image_width, install_filter, keep_aspect_ratio,
    pause_at, red_of, reset_filter, set_dimensions, set_fps, set_loop_count,
    set_rgba, set_volume, start, use_image_url, use_local_file, use_video_url
} from "pix_n_flix";

const FPS = 10;

// TASKS 1, 2
function array_to_stream(a) {
    function streamify(i) {
        return a[i] === undefined 
                ? null
                : pair(a[i], () => streamify(i + 1));
    }
    return streamify(0);
}

function stream_to_filter(s) {
    // 1 img per frame
    const delay = 1000 / FPS; 
    
    const width = image_width();
    const height = image_height();
        
    let ctime = 0;
    let current_stream = s;
    let current_img = head(s);
    
    function get_stream_value_then_inc() {
        if (!is_null(stream_tail(current_stream))) {
            const value = head(current_stream);
            current_stream = stream_tail(current_stream);
            return value;
        } else {
            return head(current_stream);
        }
    }
    
    function stream_filter(src, dst) {
        if (get_video_time() > ctime + delay) {
            ctime = get_video_time();
            
            current_img = get_stream_value_then_inc();
        }
    
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
              dst[i][j] = current_img[i][j];
            }
        }
    }
    
    return stream_filter;
}

function loop(s) {
    function loop_int(s_full, s) {
        if (is_null(s)) {
            s = s_full;
        }
        return pair(head(s), () => loop_int(s_full, stream_tail(s)));
    }
    
    return pair(head(s), () => loop_int(s, stream_tail(s)));
}

const looped_data = loop(array_to_stream(anomaly_data));
install_filter(stream_to_filter(looped_data));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q4
// TASK 4

import { alpha_of, blue_of, compose_filter, copy_image, get_video_time,
    green_of, image_height, image_width, install_filter, keep_aspect_ratio,
    pause_at, red_of, reset_filter, set_dimensions, set_fps, set_loop_count,
    set_rgba, set_volume, start, use_image_url, use_local_file, use_video_url
} from "pix_n_flix";

const FPS = 10;

// TASKS 1, 2, 3
function array_to_stream(a) {
    function streamify(i) {
        return a[i] === undefined 
                ? null
                : pair(a[i], () => streamify(i + 1));
    }
    return streamify(0);
}

function stream_to_filter(s) {
    // 1 img per frame
    const delay = 1000 / FPS; 
    
    const width = image_width();
    const height = image_height();
        
    let ctime = 0;
    let current_stream = s;
    let current_img = head(s);
    
    function get_stream_value_then_inc() {
        if (!is_null(stream_tail(current_stream))) {
            const value = head(current_stream);
            current_stream = stream_tail(current_stream);
            return value;
        } else {
            return head(current_stream);
        }
    }
    
    function stream_filter(src, dst) {
        if (get_video_time() > ctime + delay) {
            ctime = get_video_time();
            
            current_img = get_stream_value_then_inc();
        }
    
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
              dst[i][j] = current_img[i][j];
            }
        }
    }
    
    return stream_filter;
}

function loop(s) {
    function loop_int(s_full, s) {
        if (is_null(s)) {
            s = s_full;
        }
        return pair(head(s), () => loop_int(s_full, stream_tail(s)));
    }
    
    return pair(head(s), () => loop_int(s, stream_tail(s)));
}

function time_lapse(s, n) {
    function check_next(s, i) {
        if (is_null(s)) {
            return s;
        } else if (i % n === 0) {
            return pair(head(s), () => check_next(stream_tail(s), i + 1));
        } else {
            return check_next(stream_tail(s), i + 1);
        }
    }
    
    return pair(head(s), () => check_next(s, 1));
}


install_filter(
    stream_to_filter(
        time_lapse(loop(array_to_stream(anomaly_data)),
                   3)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
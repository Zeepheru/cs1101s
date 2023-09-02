// Brief 3a - Curves

import {
    make_point, draw_connected, draw_connected_full_view_proportional,
    draw_3D_connected_full_view_proportional,
    x_of, y_of, rotate_around_origin, translate, make_color_point,
    make_3D_color_point,
    arc
} from "curve";
// t \isin [0, 1]


function unit_circle(t) {
    return make_point(math_cos(2 * math_PI * t), math_sin(2 * math_PI * t));
}

function unit_line_at(y) {
    return t => make_point(t, y);
}

const unit_line = unit_line_at(0);

// example - spiral curves
function spiral_one(t) {
    const p = unit_circle(t);    
    return make_point(t * x_of(p), t * y_of(p));
}

function spiral(rev) {
    return t => {
        const p = unit_circle((t * rev) % 1);
        return make_point(t * x_of(p), t * y_of(p));
    };
}

// transformations
const rot_line = rotate_around_origin(0, 0, math_PI / 6)(unit_line);
// const shifted_rot_line = translate(0, 0.25, 0)(rot_line);

// or 
function compose(f, g) {
    return x => f(g(x));
}

const shift_rot = compose(
                        translate(0, 0.25, 0),
                        rotate_around_origin(0, 0, math_PI / 6));
                        
const shifted_rot_line = shift_rot(unit_line);

// Connecting Curves
function connect_rigidly(curve1, curve2) {
    // ah okay
    return t => t < 1/2
            ? curve1(2 * t)
            : curve2(2 * t - 1);
}

const result_curve = connect_rigidly(arc, translate(1, 0, 0)(arc));

// Color
function colorful_spiral(rev) {
    return t => {
        const p = unit_circle((t * rev) % 1);
        const R = math_max(0, 1 - 2* t) * 255;
        const G = (1 - math_abs(1 - 2 * t)) * 255;
        const B = math_max(0, 2 * t - 1) * 255;
        return make_color_point(t * x_of(p), t * y_of(p), R, G, B);
    };
}

function colorful_3D_spiral(rev) {
    return t => {
        const p = unit_circle((t * rev) % 1);
        const R = math_max(0, 1 - 2* t) * 255;
        const G = (1 - math_abs(1 - 2 * t)) * 255;
        const B = math_max(0, 2 * t - 1) * 255;
        return make_3D_color_point(t * x_of(p), t * y_of(p), 2 * t, R, G, B);
    };
}

// Draw Calls // 
// draw_connected_full_view_proportional(200)(spiral_one);
// draw_connected(200)(shifted_rot_line);
// draw_connected_full_view_proportional(200)(result_curve);

// draw_connected_full_view_proportional(200)(colorful_spiral(4));
draw_3D_connected_full_view_proportional(200)(colorful_3D_spiral(33));
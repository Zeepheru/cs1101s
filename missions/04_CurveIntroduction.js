// Q1
// Part 1
// Number -> Point


// Part 2
function vertical_line(pt, length) {
    const x_0 = x_of(pt);
    const y_0 = y_of(pt);
    
    return t => make_point(x_0, y_0 + length * t);
}


// Part 3
// (Point, Number) -> Curve


// Part 4
draw_connected(2)(vertical_line(make_point(0.5, 0.25), 0.5));

// Q2
function three_quarters(pt) {
    const delta_x = x_of(pt);
    const delta_y = y_of(pt);
    
    return t => make_point(
                    math_cos(2 * math_PI * t * 0.75) + delta_x, 
                    math_sin(2 * math_PI * t * 0.75) + delta_y);
}

// Test
draw_connected_full_view_proportional(200)(three_quarters(make_point(0.5, 0.25)));

// Q3
function s_generator(pt) {
    const delta_x = x_of(pt);
    const delta_y = y_of(pt);
    
    // coefficient to simplify trigo input
    const k = 0.75 * 2 * math_PI;
    
    return t => t < 1/2
                ? make_point(math_cos(k * 2 * t) + delta_x, 
                            math_sin(k * 2 * t) + delta_y + 1)
                : make_point(math_sin(k * (2 * t - 1)) + delta_x, 
                            math_cos(k * (2 * t - 1)) + delta_y - 1);
}

// Test
draw_connected_full_view_proportional(200)(s_generator(make_point(0.5, 0.25)));
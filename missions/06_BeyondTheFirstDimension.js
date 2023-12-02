// Q1
// feel free to add helper functions!

function fractal(level, transformation, curve) {
    return level === 0
            ? curve
            : fractal(level - 1, transformation, transformation(curve));
}

function levycize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_rigidly(
        (rotate_around_origin(0, 0, math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5, 0))
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
}

// Test
draw_connected_full_view_proportional(10000)
    (fractal(5, levycize, unit_line));
draw_connected_full_view_proportional(10000)
    (fractal(11, levycize, unit_line));

// Q2
// copy your fractal function here
function fractal(level, transformation, curve) {
    return level === 0
            ? curve
            : fractal(level - 1, transformation, transformation(curve));
}

function invert(curve) {
    return t => curve(1 - t);
}

function dragonize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return (translate(0.5, 0.5, 0))(connect_rigidly(
        invert(((rotate_around_origin(0, 0, - 3 * math_PI / 4))
            (scaled_curve))),
        ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve))));
}

// Test
draw_connected_full_view_proportional(10000)
    (fractal(1, dragonize, unit_line));
draw_connected_full_view_proportional(10000)
    (fractal(2, dragonize, unit_line));
draw_connected_full_view_proportional(10000)
    (fractal(11, dragonize, unit_line));


// Q3
function kochize(curve) {
    const up_60 = rotate_around_origin(0, 0, math_PI / 3);
    const down_60 = rotate_around_origin(0, 0, - math_PI / 3);
    return put_in_standard_position(
               connect_ends(curve,
                            connect_ends(up_60(curve),
                                         connect_ends(down_60(curve),
                                                      curve))));
}

// copy your fractal function here
function fractal(level, transformation, curve) {
    return level === 0
            ? curve
            : fractal(level - 1, transformation, transformation(curve));
}

function invert(curve) {
    return t => curve(1 - t);
}

function connect_ends_frac(frac, curve1, curve2) {
    // both curve1 and curve2 need to be translated beforehand!
    const k = 1 / (1 - frac);
    return t => {
        if (t < frac) {
            return make_point(
                    x_of(curve1(t / frac)), 
                    y_of(curve1(t / frac)));
        } else {
            return make_point(
                    x_of(curve2(k * t - k + 1)), 
                    y_of(curve2(k * t - k + 1)));
        }
    };
}

function polygon_recur(sides, n) {
    // Recursion boiiii
    // Has uniform point distribution ... I think
    const side = fractal(n, kochize, unit_line);
    const rot = angle => curve => rotate_around_origin(0, 0, angle)(curve);
    
    function hexagons_are_the_bestagons(n, side, angle) {
        // not just hexagons anymore, but I want the joke
        return n === 1
                ? side
                : connect_ends_frac(
                        1 / n, 
                        side,
                        (translate(0, 1, 0))((rot(angle))
                            (hexagons_are_the_bestagons(
                                n - 1, side, 
                                angle))));
    }   
    
    return hexagons_are_the_bestagons(
                sides, (rot(math_PI / 2)(side)), 
                2 * math_PI / sides);
}

function snowflake_recur(n) {
    return polygon_recur(6, n);
}

function snowflake(n) {
    // the sane solution
    const side = fractal(n, kochize, unit_line);
    const rot = angle => curve => rotate_around_origin(0, 0, angle)(curve);
    
    const half_flake = connect_ends(
                            (rot(math_PI / 6)(side)),
                            connect_ends(
                                (rot(3 * math_PI / 6)(side)),
                                (rot(5 * math_PI / 6)(side))));
    
    return connect_ends(half_flake, (rot(math_PI)(half_flake)));
}

// Test

draw_connected_full_view_proportional(10000)(snowflake(5));
draw_connected_full_view_proportional(10000)(snowflake_recur(5));

// draw_connected_full_view_proportional(10000)(polygon_recur(9, 3));
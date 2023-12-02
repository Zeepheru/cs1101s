// Q1
function fractal(pic, n) {
    // your answer here
    function fractal_internal(rune, pic, n) {
        return n === 1
               ? pic
               : fractal_internal(
                    rune,
                    beside(rune, stack(pic, pic)), 
                    n - 1);
    }
    
    return fractal_internal(pic, pic, n);
}

// Test
show(fractal(make_cross(rcross), 3));
show(fractal(make_cross(rcross), 5));

// Q2
function hook(frac) {
    // your answer here
    return quarter_turn_right(stack_frac(
                frac, square,
                beside(square, blank)));
}

// Test
show(hook(1));
show(hook(0));
show(hook(1 / 2));
show(hook(1 / 5));

// Q3
// copy your hook function from Question 2 here if required
function hook(frac) {
    return quarter_turn_right(stack_frac(
                frac, square,
                beside(square, blank)));
}

function spiral(thickness, depth) {
    // your answer here
    function spiral_internal(pic, thickness, depth) {
        return depth === 0
               ? pic
               : spiral_internal(
                    stack_frac(
                        thickness,
                        hook(thickness / 2),
                        quarter_turn_right(pic)),
                    thickness, depth - 1);
    }
    
    return spiral_internal(blank, thickness, depth);
}

// Test
show(spiral(1 / 5, 20));
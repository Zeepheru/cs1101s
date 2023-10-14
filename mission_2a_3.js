import { stack, heart, show, stackn, make_cross, 
        stack_frac, beside, beside_frac, quarter_turn_left, quarter_turn_right,
        turn_upside_down, square, blank
    
} from "rune";

// copy your hook function from Question 2 here if required
function hook(frac) {
    return quarter_turn_right(stack_frac(
            frac,
            square,
            beside(square, blank)));
}

function spiral(thickness, depth) {
    // your answer here
    function internal_spiral(pic, thickness, depth) {
        return depth === 0
                ? pic
                : internal_spiral(
                    stack_frac(
                        thickness,
                        hook(thickness / 2),
                        quarter_turn_right(pic)),
                    thickness, depth - 1);
    }
    
    return internal_spiral(blank, thickness, depth);
}

// Test
show(spiral(1 / 5, 20));
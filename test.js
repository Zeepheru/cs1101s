import { sail, rcross, heart, nova, corner, pentagram, square,
         stackn, stack, show, beside, random_color,
         repeat_pattern, turn_upside_down, 
         quarter_turn_left, quarter_turn_right,
         beside_frac, scale_independent }
from 'rune';

function test1(rune) {
    return 1;
}

// show(sail);

function make_cross(r) {
    return stack(
        beside(
            quarter_turn_right(r),
            turn_upside_down(r)
            ), 
        beside(
            r, 
            quarter_turn_left(r)
            ));
}

function make_grid(rune, x, y) {
    return stackn(y, quarter_turn_left(stackn(x, quarter_turn_right(rune))));
}
            
// Q1
function persian(rune, count) {
    const central_ratio_1_side = (count - 2) / (count - 1);
    const border_ratio = 1 / count;
    
    const border_horiz_full = quarter_turn_left(
                                    stackn(count, quarter_turn_right(rune)));
    const border_vert_partial = stackn(count - 2, rune);
    
    return stack_frac(
        border_ratio,
        border_horiz_full,
        stack_frac(
            central_ratio_1_side,
            beside_frac(
                border_ratio,
                border_vert_partial,
                beside_frac(
                    central_ratio_1_side,
                    make_cross(rune),
                    border_vert_partial)),
            border_horiz_full));
}

// Tests
show(persian(heart, 7));
show(persian(make_cross(rcross), 5));


const paw = from_url("https://i.imgur.com/GJg95B8.png");

show(persian(paw, 5));

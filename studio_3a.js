// S3a

import {
    circle, square, show, beside, beside_frac,
    stackn, blank, ribbon, stack, repeat_pattern, stack_frac
} from "rune";

function moony_1(bottom_right) {
    return beside(
                stack(circle, square),
                stack(blank, bottom_right));
}

function moony_2(n) {
    return n === 1
            ? circle
            : moony_1(moony_2(n - 1));
}

function moony(n) {
    // anyhow whack also can reach 
    return n === 0
            ? circle
            : beside_frac(
                1/n,
                stack_frac(1/n, circle, square),
                stack_frac(1/n, blank, moony(n - 1)));
}


// show(moony_1(ribbon));
show(moony(5));

// Qn 4
/*
Recursive (since result of function is not 
the result of the recursive call)

\Theta(n)? for both time and space
Since it seems linear

assumes that primitive runes take the same amt of space
primitive operations take the same amt of time

*/
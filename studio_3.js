// S3

import {
    stack, blank, square, heart, show, beside
} from "rune";

function f1(rune_1, n, rune_2) {
    return n === 0
           ? rune_2
           : f1(rune_1, n - 1, beside(rune_1, stack(blank, rune_2)));
}

function f2(rune, n) {
    return n === 0
           ? rune
           : stack(beside(blank, f2(rune, n - 1)),
                    square);
}


show(f1(square, 3, heart));
show(f2(heart, 3));
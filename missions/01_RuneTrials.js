// Q1

/*
I'm not sure which question it was, but I got this first Source mission wrong because accidentally I hardoded stuff :)

*/



// The function mirror shows a rune next to its mirror image.

function mirror(rune) {
    return beside(rune, flip_horiz(rune));
}

/*
The function more_love takes a rune as
argument and returns a rune that shows
it next to a red heart.
*/

function more_love(rune) {
    return beside(rune, red(heart));
}

show(more_love(mirror(sail)));

// Q2
function mosaic(r1, r2, r3, r4) {
    return stack(
        beside(r1, r2),
        beside(r3, r4));
}

// Test
show(mosaic(nova, rcross, corner, sail));

// Q3
function mosaic(r1, r2, r3, r4) {
    return stack(
        beside(r1, r2),
        beside(r3, r4));
}

function upside_down_mosaic(r1, r2, r3, r4) {
    return turn_upside_down(mosaic(r1, r2, r3, r4));
}

// Test
show(upside_down_mosaic(nova, rcross, corner, sail));

// Q4
function mosaic(r1, r2, r3, r4) {
    return stack(
        beside(r1, r2),
        beside(r3, r4));
}

function transform_mosaic(r1, r2, r3, r4, transform) {
    return transform(mosaic(r1, r2, r3, r4));
}

// Test
show(transform_mosaic(nova, rcross, corner, sail, make_cross));
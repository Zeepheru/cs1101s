/*
Studio S2

Answers
PS: Not having error catching really irks me
*/

// Q1
function biggie_size(combo) {
    return combo + 4;
}

// Q2
function unbiggie_size(combo) {
    return combo - 4;
}

// Q3
function is_biggie_size(combo) {
    return combo > 4 ? true : false;
}

// Q4 
function combo_price(combo) {
    return is_biggie_size(combo) ? unbiggie_size(combo) * 1.17 + 0.5 : combo * 1.17;
}

// Q5
function empty_order() {
    return 0;
}

// Q6
function add_to_order(order, combo) {
    return order * 10 + combo;
}

// Q7 
function last_combo(order) {
    return order - math_floor(order / 10) * 10;
}

// Q8
function other_combos(order) {
    return math_floor(order / 10);
}

// testing
const a1 = last_combo(5463);
const a2 = other_combos(54785);

display(a1);
a2;






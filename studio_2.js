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
    // return combo > 4 ? true : false;
    return combo > 4; // yes it just outputs the bool
}

// Q4 
function combo_price(combo) {
    // yes, done't hard code the "-4" and use the prior function
    // also, yes this kind of multiline
    return is_biggie_size(combo) 
        ? unbiggie_size(combo) * 1.17 + 0.5 
        : combo * 1.17;
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
    // return order - math_floor(order / 10) * 10;
    return order % 10;
}

// Q8
function other_combos(order) {
    // return (order - order % 10) / 10; // alt, this is most definitely slower lmao
    return math_floor(order / 10);
}

// testing
const a1 = combo_price(1);
const a2 = combo_price(7);

display(a1);
a2;






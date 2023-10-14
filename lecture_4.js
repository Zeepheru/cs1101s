// Lecture 4: Intro to Data Abstraction
// pairs and empty lists

// point (x, y) represented as a function
function make_point(x, y) {
    return component => component === 0 ? x : y;
}

// selectors
const x_of = point => point(0); 
const y_of = point => point(1);

// pair and head (another way, from the quest lol)
const pair = (x, y) => f => f(x, y);
// generated pair is a function f => f(a, b)
const head = pair => pair((x, y) => x);
const tail = pair => pair((x, y) => y);


// CASE STUDY: Rational Numbers
// also just randomly trying verbose variable naming
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
function make_rational_number(numerator, denominator) {
    const g = gcd(numerator, denominator);
    return pair(numerator / g, denominator / g);
}
function numerator(rational) {
    return head(rational);
}
function denominator(rational) {
    return tail(rational);
}
function add_rational_numbers(a, b) {
    // etc for subtract, multiply
    return make_rational_number(
                numerator(a) * denominator(b) +
                numerator(b) * denominator(a),
                denominator(a) * denominator(b));
}
function check_rational_numbers_equal(a, b) {
    return numerator(a) * denominator(b) === 
            denominator(a) * numerator(a);
}
function rational_to_string(rational) {
    return stringify(numerator(rational)) + 
            "/" + 
            stringify(denominator(rational));
}
// etc, etc...


// LENGTH OF A LIST
function length(xs) {
    return is_null(xs) // base case, list is empty!
            ? 0
            : 1 + length(tail(xs));
}

function length_iter(xs) {
    draw_data("length_iter", xs);
    function len(ys, counted_so_far) {
        draw_data("len", ys, counted_so_far);
        return is_null(ys)
                ? counted_so_far
                : len(tail(ys), counted_so_far + 1);
    }
    
    return len(xs, 0);
}

length_iter(pair(20, pair(30, pair(40, null))));
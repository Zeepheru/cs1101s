// Q1
// function change(x, new_value) {
//     x = new_value;
// }
// let x = 0;
// change(x, 1);
/*
x = 0
x is substituted replaced by 0, not the reference to the 
original x when change(x, 1) is called. 
*/

// Q2
function d_filter(pred, xs) {
    if (is_null(xs)) {
        return xs;
    } else if (pred(head(xs))) {
        set_tail(xs, d_filter(pred, tail(xs)));
        return xs;
    } else {
        return d_filter(pred, tail(xs));
    }
}

const L = list(1, 2, 3, 4, 5, 6, 7, 8, 9, 11);
const q2 = d_filter(x => x % 2 === 0, L); // returns [2, [4, [6, [8, null]]]]
// L; // What is L now?

// q2;

// Q3
// check drawings lol, breakpoints are not easy to code into Source. 
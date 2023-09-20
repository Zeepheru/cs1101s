// Lecture 6


// BINARY SEARCH; BST!
const N = 100;
function guess_secret_num(start, end) {
    // O(log n) => since max of k calls for N = 2^k
    
    if (start === end) {
        return start;
    } else {
        const guess = math_floor((start + end) / 2);
        const check = check_guess(guess);
        return check === "correct"
        ? guess
        : check === "too low"
        ? guess_secret_num(guess + 1, end) // when "too low"
        : guess_secret_num(start, guess - 1); // when "too high"
    }
}
// guess_secret_num(1, N);

//  -----------------------------------------
// SORTING BABY SORTING //
// QUOTE: sorry my drawings [annotations] are only in 1 color because my script isn't working today morning
function insertion_sort(xs) {
    // O(n^2!)??? lol
    function insert(x, xs) {
        return is_null(xs)
                ? list(xs) // input sorted list is empty.
                : x <= head(xs)
                ? pair(x, xs)
                : insert(x, tail(xs));
    }
    
    return is_null(xs)
            ? xs
            : insert(head(xs), insertion_sort(tail(xs)));
}

function selection_sort(xs) {
    function smallest(xs) {
        // Ooooh
        return accumulate((x, y) => x < y ? x : y, head(xs), tail(xs));
    }
    
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}

function merge_sort(xs) {
    // Incomplete btw
    function merge(xs, ys) {
        // Ooooohhh
        // Time-oog is O(n^2)?
        if (is_null(xs)) {
            return ys;
        } else if (is_null(ys)) {
            return xs;
        } else {
            const x0 = head(xs);
            const y0 = head(ys);
            return x0 < y0
                ? pair(x0, merge(tail(xs), ys))
                : pair(y0, merge(xs, tail(ys)));
        }
    }
    function middle(n) {
        return math_floor(n / 2);
    } 
    function take(xs, n) {
        return false;
    }
    function drop(xs, n) {
        return false;
    }
    
    if (is_null(xs) || is_null(tail(xs))) {
        // have to make sure length of list to be broken up > 1
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)),
                    merge_sort(drop(xs, mid))); 
    }
}

function quick_sort(xs) {
    // in the mission "Sorting things out"
    return false;
}

const sort_this = insertion_sort;

// display_list(sort_this(list(10, 2, 3, 9, 6, 1, 2, 7, 11, 5, 7, 3, -1)))

//  -----------------------------------------

// SYMBOLIC REPRESENTATION //
/*
Just check the slides and show in playground
*/
const my_exp = make_sum(make_product("x", "x"), make_sum("x", 4));

function eval_symbolic(exp, name, val) {
    // lots of assumed functions to exist here
    return is_number(exp) 
            ? exp
            : is_variable(exp)
            ? (is_same_variable(exp, name) ? val : NaN)
            : is_sum(exp)
            ? eval_symbolic(addend(exp), name, val) + 
                eval_symbolic(augend(exp), name, val)
            : is_product(exp)
            ? eval_symbolic(addend(exp), name, val) * 
                eval_symbolic(augend(exp), name, val)
            : error(exp, "unkown expression type");
}

function deriv_symbolic(exp, x) {
    return is_number(exp)
            ? 0
            : is_variable(exp)
            ? (is_same_variable(exp, x) ? 1 : 0)
            : is_sum(exp)
            ? make_sum(deriv_symbolic(addend(exp), x),
                        deriv_symbolic(augend(exp), x))
            : is_product(exp)
            ? make_sum(make_product(multiplier(exp),
                            deriv_symbolic(multiplicand(exp),x)),
                        make_product(
                            deriv_symbolic(multiplier(exp), x),
                            multiplicant(exp)))
            : error(exp, "unkown expression type");
}

// required funcs!
function make_sum(a1, a2) {
    //  w/ simplifications!
    return number_equal(a1, 0)
            ? a2
            : number_equal(a2, 0)
            ? a1
            : is_number(a1) && is_number(a2)
            ? a1 + a2
            : is_variable(a1) && is_variable(a2) && is_same_variable(a1, a2)
            ? list("*", 2, a1)
            : list("+", a1, a2);
}

function make_product(m1, m2) {
    return number_equal(m1, 0) || number_equal(m2, 0)
            ? 0
            : number_equal(m1, 1)
            ? m2
            : number_equal(m2, 1)
            ? m1
            : is_number(m1) && is_number(m2)
            ? m1 * m2
            : list("*", m1, m2);
}

function addend(s) {
    return head(tail(s));
}

function augend(s) {
    return head(tail(tail(s)));
}

function multiplier(s) {
    return head(tail(s));
}

function multiplicand(s) {
    return head(tail(tail(s)));
}

function is_variable(x) {
    return is_string(x);
}

function is_same_variable(v1, v2) {
    return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function is_sum(x) {
    return is_pair(x) && head(X) === "+";
}

function is_product(x) {
    return is_pair(x) && head(X) === "*";
}
// eval_symbolic(my_exp, "x", 3);



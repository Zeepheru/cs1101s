// Lecture 5

// appending two lists
function append(xs, ys) {
    // my own idea? Yes, it is correct!
    // Time complexity: Theta(n), n is len(xs)
    // Space complxity: Theta(n) as well, since there are 2n's, but that's still n.
    return is_null(xs) 
            ? ys
            : pair(head(xs), append(tail(xs), ys));
}
// list reversing
function reverse(xs) {
    // Time complexity: Theta(n^2) Since n times, each time decreasing by 1 from n
    // So the number of ops is n(n+1)/2
    return is_null(xs)
            ? null
            : append(reverse(tail(xs)), list(head(xs)));
            // note the second list, since append needs two lists
}

function reverse2(xs) {
    // no deferred ops -> iterative
    // Time complexity: Theta(n)
    // Space complexity: Theta(n) 
    // - length of ops is constant, length of new list grows with n
    function rev(original, reversed) {
        return is_null(original)
                ? reversed
                : rev(tail(original), pair(head(original), reversed));
    }
    return rev(xs, null);
}

// HOF operations on list
function scale_list(xs, k) {
    // check lecture notes for typed version! Pretty cool to catch errors. 
    return is_null(xs)
            ? null
            : pair(k * head(xs), scale_list(tail(xs), k));
}

// element mapping. 
function apply_func(xs, f) {
    return is_null(xs)
            ? null
            : pair(f(head(xs)), apply_func(tail(xs), f));
}

apply_func(list(1, 2, 3, 4, 5), x => x * 10);
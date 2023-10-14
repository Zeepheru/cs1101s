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
function map(f, xs) {
    return is_null(xs)
            ? null
            : pair(f(head(xs)), map(tail(xs), f));
}

function filter(cond, xs) {
    return is_null(xs)
            ? null
            : cond(head(xs))
            ? pair(head(xs), filter(cond, tail(xs)))
            : filter(cond, tail(xs));
}

// and accumulate/reduce. Pretty straightforward:
function accumulate(op, initial, xs) {
    return is_null(xs) 
            ? initial
            : op(head(xs), accumulate(op, initial, tail(xs)));
}
////


function copy(xs) {
    return map(x => x, xs);
}

// map(x => x * x, list(1, 2, 3, 4));
// filter(x => x % 2 === 0, list(1, 2, 3, 4, 5, 6, 7, 8, 9));


// TREE OPS
function count_data_items(tree) {
    return is_null(tree)
            ? 0
            : ( is_list(head(tree))
                ? count_data_items(head(tree))
                : 1 )
                + 
                count_data_items(tail(tree));
            
}

function scale_tree(tree, k) {
    return map(sub_tree => 
                    !is_list(sub_tree)
                    ? k * sub_tree
                    : scale_tree(sub_tree, K),
            tree);
            
}
// AND A CORRESPONDING MAP FUNC


count_data_items(list(list(1, 2), null, 3, list(4, null)));

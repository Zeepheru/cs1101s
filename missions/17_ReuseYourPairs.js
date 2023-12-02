// Q1
// TASK 1

function d_split_list(xs) {
    if (is_null(tail(xs))) {
        return xs;
    }
    
    function set_null_after(xs, n) {
        return n === 1 ? set_tail(xs, null) : set_null_after(tail(xs), n - 1);
    }
    
    function get_list_after(xs, n) {
        return n === 0 ? xs : get_list_after(tail(xs), n - 1);
    }
    
    const len = length(xs);
    const mid_ceil = math_ceil(len / 2);
    
    const second = get_list_after(xs, mid_ceil);
    set_null_after(xs, mid_ceil);
    
    return pair(xs, second);

}

// TEST:
const my_list1 = list(1, 2, 3, 4, 5, 6);
const my_list2 = list(5, 4, 3, 2, 1);
d_split_list(my_list1);
d_split_list(my_list2);

// Q2
// TASK 2

function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else if (head(xs) < head(ys)) {
        set_tail(xs, d_merge(tail(xs), ys));
        return xs;
    } else {
        set_tail(ys, d_merge(tail(ys), xs));
        return ys;
    }
}

// TEST:
const my_list1 = list(2, 4, 5, 9);
const my_list2 = list(3, 5, 8);
d_merge(my_list1, my_list2);

// Q3
// TASK 3

// Copy-and-paste your d_split_list function for Task 1 here.
function d_split_list(xs) {
    // display(xs);
    if (is_null(tail(xs))) {
        return xs;
    }
    
    function set_null_after(xs, n) {
        return n === 1 ? set_tail(xs, null) : set_null_after(tail(xs), n - 1);
    }
    
    function get_list_after(xs, n) {
        return n === 0 ? xs : get_list_after(tail(xs), n - 1);
    }
    
    const len = length(xs);
    const mid_ceil = math_ceil(len / 2);
    
    const second = get_list_after(xs, mid_ceil);
    set_null_after(xs, mid_ceil);
    
    return pair(xs, second);

}

// Copy-and-paste your d_merge function for Task 2 here.
function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else if (head(xs) < head(ys)) {
        set_tail(xs, d_merge(tail(xs), ys));
        return xs;
    } else {
        set_tail(ys, d_merge(tail(ys), xs));
        return ys;
    }
}

function d_merge_sort(xs) {
    function split_helper(xs) {
        if (is_null(tail(xs))) {
            return xs;
        } else {
            const split = d_split_list(xs);
            return pair(split_helper(head(split)), split_helper(tail(split)));
        }
    }
    
    function merge_helper(p) {
        if (is_null(tail(p))) {
            return p;
        } else {
            return d_merge(merge_helper(head(p)), merge_helper(tail(p)));
        }
    }
    
    const split_xs = split_helper(xs);
    return merge_helper(split_xs);
}

// TEST:
const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
d_merge_sort(my_list);
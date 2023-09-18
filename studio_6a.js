// Studio 6A

// Q1
function remove_duplicates(lst) {
    return accumulate(
                    (x, y) => is_null(member(x, y)) ? pair(x, y) : y,
                    null, lst);
}

// display_list(remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2)));
// display_list(remove_duplicates(list("a", "x", "b", "c", "c", "b", "d")));

// Q2
function subsets(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        const no_subsets = subsets(tail(xs));
        
        const yes_subsets = map(x => pair(head(xs), x), subsets(tail(xs)));
        
        return append(no_subsets, yes_subsets);
    }
}

function subsets_acc(xs) {
    // return accumulate(
    //             (x, y) => append(map(t => pair(x, t), y), y)
    //             , list(null), xs);
    return accumulate(
                (x, y) => append(y, map(t => pair(x, t), y))
                , list(null), xs);
}

// display_list(subsets(list(1, 2, 3)));
// display_list(subsets_acc(list(1, 2, 3)));

// Q3
function permutations(xs) {
    // BIG BRAIN IMPLEMENTATION YO
    // in practical application remove the duplicates first!
    return is_null(xs) 
            ? list(null)
            : accumulate(
                    append, null, 
                    map(x => map(perm => pair(x, perm), permutations(remove(x, xs))), xs));
}

display_list(permutations(list(1, 2, 3, 4
)));

// Reflection 6

// Q1
function insert_cmp(x, xs, cmp) {
    // cmp: comparator
    return is_null(xs)
            ? list(x)
            : cmp(x, head(xs))
            ? pair(x, xs)
            : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}

function insertion_sort_cmp(xs, cmp) {
    return is_null(xs)
            ? xs
            : insert_cmp(head(xs), 
                        insertion_sort_cmp(tail(xs), cmp),
                        cmp);
}

const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7);

// "when is x in front"
display_list(insertion_sort_cmp(xs, (x, y) => x < y));
display_list(insertion_sort_cmp(xs, (x, y) => x > y));
display_list(insertion_sort_cmp(xs, (x, y) => false));

// wishful thinking really does help for the one below :)))
display_list(insertion_sort_cmp(xs, 
                                (x, y) => 
                                        x % 2 === 0 && y % 2 === 0 
                                        ? x < y
                                        : x % 2 === 0 && y % 2 !== 0
                                        ? true
                                        : y % 2 === 0 && x % 2 !== 0
                                        ? false
                                        : y < x));

// Q2

/*
yes, the specifics when it comes to order of growth terminology (when u wanna be 
accurate) is worth noting. 


I presume merge() is Theta(n)
Since it's effectively 2n by running through both lists
(yes, but n would refer to the length of the resultant list?)


As for merge_sort(), O (n log n)? 
Though to be fair, I am aware that the better sorting algos do have n log n.

Yes, but it's actually Theta(n log(n)) 
- can chcek by drawing a merge_sort() call tree and count the ops 
and n for each 



TL;DR, analysing the helper functions' runtimes
*/
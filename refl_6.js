// Reflection 6

function insert_cmp(x, xs, cmp) {
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

display_list(insertion_sort_cmp(xs, (x, y) => ));
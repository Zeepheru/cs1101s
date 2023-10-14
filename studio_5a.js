// Studio 5a

function every_second_wrong(lst) {
    return is_null(lst)
            ? null
            : length(lst) % 2 === 1
            ? every_second(tail(lst))
            : pair(head(lst), every_second(tail(lst)));
}

function every_second(lst) {
    return is_null(lst) || is_null(tail(lst))
            ? null 
            : pair(head(tail(lst)), every_second(tail(tail(lst))));
}

// display(every_second(list("a", "x", "b", "y", "c", "z", "d")));
// display(every_second(list(1, 2, 3, 4)));
// display(every_second(list(1, 2, 3, 4, 5)));

function sums(lst) {
    function sum_list(lst) {
        return is_null(lst)
                ? 0
                : head(lst) + sum_list(tail(lst));
    }
    
    return list(
            sum_list(every_second(pair(0, (lst)))),
            sum_list(every_second(lst)));
}

sums(list(1, 2, 3, 4, 5));
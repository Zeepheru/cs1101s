// Studio 5a

function every_second(lst) {
    return is_null(lst)
            ? null
            : length(lst) % 2 === 1
            ? every_second(tail(lst))
            : pair(head(lst), every_second(tail(lst)));
}


every_second(list("a", "x", "b", "y", "c", "z", "d"));
// Reflection 5
const LoL = list(list(1, 2), list(3, 4, 5, 6), null, list(7, 8, 9));

function flatten_list(xs) {
    return accumulate(append, null, xs);
}

flatten_list(LoL);


const my_tree = list(1, list(2, list(3, 4), 5), list(6, 7));

function tree_sum(tree) {
    // hmmm
    return is_null(tree)
            ? 0
            : ( is_list(head(tree))
                ? tree_sum(head(tree))
                : head(tree))
                + 
                tree_sum(tail(tree));
}

tree_sum(my_tree);

// accumulate_tree
function accumulate_tree(f, op, initial, tree) {
    return accumulate(
                    (x, y) => op(is_list(x) ? op(x) : f(x), y), 
                    initial, tree);
}

function tree_sum_acc(tree) {
    return accumulate_tree(x => x, (x, y) => x + y, 0, tree);
}

function flatten(tree) {
    return accumulate_tree(x => list(x), append, null, tree);
}

const tree_1 = list(1, 2);

// tree_sum_acc(my_tree);
flatten(LoL);


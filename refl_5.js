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

// alternatively using if else - clearer imo
function tree_sum_ifelse(tree) {
    if (is_null(tree)) {
        return 0;
    } else {
        return "ble";
        // oh wait nvm lol
        // note that the tail is by def another tree, so don't need to check
        /*
        alternative checks you could use to reduce runtime, since is_list is O(n)
        (depending on the datatypes)
        - is_pair (doesn't check for null)
        - is_number (for trees/lists of numbers only)
        */
    }
}

tree_sum(my_tree);

// accumulate_tree
function accumulate_tree_process(f, op, initial, tree) {
    return is_null(tree)
            ? initial
            : op(( is_list(head(tree))
                ? accumulate_tree(f, op, initial, head(tree))
                : f(head(tree)) )
                , accumulate_tree(f, op, initial, tail(tree)));
}

function accumulate_tree(f, op, initial, tree) {
    // curr and wish instead of (x, y) eh
    return accumulate(
                    (x, y) => op(is_list(x) 
                            ? accumulate_tree(f, op, initial, x) 
                            : f(x), y), 
                    initial, tree);
    
}

// better
function accumulate_tree_better(f, op, initial, tree) {
    // better making use of the wishful thinking framework
    return accumulate(
                    (x, y) => is_list(x) 
                            ? op( accumulate_tree(f, op, initial, x), y) 
                            : op(f(x), y), 
                    initial, tree);
    
}

// calling accumulate_tree
function tree_sum_acc(tree) {
    return accumulate_tree_better(x => x, (x, y) => x + y, 0, tree);
}

function flatten(tree) {
    return accumulate_tree_better(x => list(x), append, null, tree);
}

const tree_1 = list(list(1, 2), 3);

// tree_sum_acc(my_tree);
flatten(my_tree);


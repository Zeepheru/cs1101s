// Q1
function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
            ? ""
            : binary_search_tree_to_string(left_branch(bst)) + entry(bst) 
                + "; " + binary_search_tree_to_string(right_branch(bst));
    
}

const h = make_tree("h", make_empty_tree(), make_empty_tree());
const a = make_tree("a", make_empty_tree(), make_empty_tree());
const n = make_tree("n", h, make_empty_tree());
const c = make_tree("c", a, make_empty_tree());
const test_bst = make_tree("e", c, n);

// Test
binary_search_tree_to_string(test_bst);
binary_search_tree_to_string(cadet_names);

// Q2
function find(bst, name) {
    return is_empty_tree(bst)
            ? false
            : entry(bst) === name
            ? true
            : name < entry(bst)
            ? find(left_branch(bst), name)
            : find(right_branch(bst), name);
}

// Test
const yes_name = "Chang Zee Hang";
const non_name = "John Tan";

find(cadet_names, yes_name);
find(cadet_names, non_name);

// Q3
const empty = make_empty_tree();

function insert(bst, item) {
    if (is_empty_tree(bst)) {
        return make_tree(item, empty, empty);
    } else if (item < entry(bst)) {
        return make_tree(
                    entry(bst), 
                    insert(left_branch(bst), item), 
                    right_branch(bst));
    } else {
        return make_tree(
                    entry(bst), 
                    left_branch(bst), 
                    insert(right_branch(bst), item));
    }
}

// Copy your binary_search_tree_to_string function here from Task 1.
function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
            ? ""
            : binary_search_tree_to_string(left_branch(bst)) + entry(bst) 
                + "; " + binary_search_tree_to_string(right_branch(bst));
    
}


// Test
binary_search_tree_to_string(insert(make_empty_tree(), "x"));
// Should produce "x; "

const bst = accumulate((item, bst) => insert(bst, item),
                      make_empty_tree(),
                      list("g", "a", "r", "x", "p"));
binary_search_tree_to_string(bst);
// Should produce "a; g; p; r; x; "

const cadet_names_with_aaaaron = insert(cadet_names, "AAAARON NORAAAA");
binary_search_tree_to_string(cadet_names_with_aaaaron);
// Should produce "AAAARON NORAAAA; ..."

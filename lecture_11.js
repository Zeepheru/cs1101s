// LECTURE 11

let syntax_tree = parse("1.4 + 2.3 / 70.4;");
display_list(syntax_tree);
/*
list("binary_operator_combination",
    "+",
    list("literal", 1.4),
    list("binary_operator_combination", 
        "/",
        list("literal", 2.3),
        list("literal", 70.4)))

*/


// Literals
function is_literal(comp) {
    return is_tagged_list(comp, "literal");
}
function is_tagged_list(comp, the_tag) {
    return is_pair(comp) && head(comp) === the_tag;
}
// selector , in the following in blue
function literal_value(comp) {
    return head(tail(comp));
}

// CS Machine for calc expressions
function evaluate(expr) {
    // C & S
    let C = list(expr);
    let S = null;
    while (! is_null(C)) {
        const command = head(C); C = tail(C);
        if (is_literal(command)) {
            S = pair(literal_value(command), S);
            
        } else if (...) { // handle all other commands
        
        } else { error("unknown command"); }
    }
    return head(S);
}

// LECTURE 11
// https://share.sourceacademy.org/ogwhe FOR THE FULL EVALUATOR

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

// Misc
const is_bin_op_combination = comp =>
is_tagged_list(comp,"binary_operator_combination");

const operator_symbol = comp => list_ref(comp ,1);
const first_operand = comp => list_ref(comp ,2);
const second_operand = comp => list_ref(comp ,3);

// CS Machine for calc expressions
function evaluate(expr) {
    // C & S
    let C = list(expr);
    let S = null;
    while (! is_null(C)) {
        const command = head(C); C = tail(C);
        if (is_literal(command)) {
            S = pair(literal_value(command), S);
        } else if (is_bin_op_combination(command)) {
            C = pair(first_operand(command),
                    pair(second_operand(command),
                        pair(make_bin_op_instr(
                                operator_symbol(command)),
                            C)));
        } else if (is_bin_op_instr(command)) {
            S = pair(apply_binary(op_instr_symbol(command),
                                head(tail(S)), head(S)),
                    tail(tail(S)));
        } else { error("unknown command"); }
    }
    return head(S);
}

function apply_binary(operator , op1, op2) {
    return operator === "+"
            ? op1 + op2
            : operator === "-"
            ? op1 - op2
            : operator === "*"
            ? op1 * op2
            : operator === "/"
            ? op1 / op2
            : error("unknown operator");
}

function count_pairs(x) {
    let pairs = null;
    // const is_in = (xs, a) => !is_null(filter(x => x === a, xs));
    const is_in = (xs, a) => !is_null(member(a, xs));
    
    function helper(x) {
        if (!is_pair(x) || is_in(pairs, x)) {
            return 0;
        } else {
            pairs = pair(x, pairs);
            return 1 + helper(head(x)) + helper(tail(x));
        }
    }
    return helper(x);
}

function count_pairs_alt(xs) {
    let pairs = null;
    function check(ys) {
        if (!is_pair(ys)) {
            
        } else if (!is_null(member(ys, pairs))) {
            
        } else {
            pairs = pair(ys, pairs);
            check(head(ys));
            check(tail(ys));
        }
    }
    check(xs);
    return length(pairs);
}


const a = pair(null, null);
const b = pair(a, a);
const c = pair(b, b);

const loop = list(1, 2, 3);
set_tail(tail(tail(loop)), loop);


draw_data(loop);

display(count_pairs_alt(b));
// display(count_pairs(loop));
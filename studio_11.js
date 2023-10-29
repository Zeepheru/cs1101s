// STUDIO ELEVEN 11 ELEVEN
// STUDIO ELEVEN 11 ELEVEN
// STUDIO ELEVEN 11 ELEVEN

// Miscellany
function stream_to_list_n(S, n) {
    if (n === 0 || is_null(head(S))) {
        return null;
    } else {
        return pair(head(S), stream_to_list_n(stream_tail(S), n - 1));
    }
}

function increment_stream(n) {
    return pair(n, () => increment_stream(n + 1));
}

const integers = increment_stream(1);
const non_neg_integers = increment_stream(0);

// QUESTION 1
function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}

const A = pair(1, () => scale_stream(2, A));

function mul_streams(a,b) {
    return pair(head(a) * head(b),
                () => mul_streams(stream_tail(a), stream_tail(b)));
}
const B = pair(1, () => mul_streams(B, integers));

// stream_to_list_n(A, 10);
// stream_to_list_n(B, 10);

// QUESTION 2
// basic operations
function add_streams(s1, s2) {
    return is_null(s1)
            ? s2
            : is_null(s2)
            ? s1
            : pair(head(s1) + head(s2),
                () => add_streams(stream_tail(s1),
                stream_tail(s2)));
}
function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}
const add_series = add_streams;
const scale_series = scale_stream;
function negate_series(s) {
    return scale_series(-1, s);
}
function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

// construction methods
function coeffs_to_series(list_of_coeffs) {
    const zeros = pair(0, () => zeros);
    function iter(list) {
        return is_null(list)
        ? zeros
        : pair(head(list),
            () => iter(tail(list)));
    }
    return iter(list_of_coeffs);
}

function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}


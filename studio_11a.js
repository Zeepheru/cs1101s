// Studio 11A

function stream_to_list_n(S, n) {
    if (n === 0 || is_null(head(S))) {
        return null;
    } else {
        return pair(head(S), stream_to_list_n(stream_tail(S), n - 1));
    }
}


const test  = pair(1, () => pair(2, () => pair(3, () => pair(4, () => null))));
// stream_to_list(stream_pairs(test));

// stream_to_list_n(stream_pairs(integers_from(1)), 10);

function stream_append_pickle(xs, ys) {
return is_null(xs)
? ys()
: pair(head(xs),
() => stream_append_pickle(stream_tail(xs),
ys));
}
function stream_pairs2(s) {
    return is_null(s)
    ? null
    : stream_append_pickle(
        stream_map(
            sn => pair(head(s), sn),
                stream_tail(s)),
                () => stream_pairs2(stream_tail(s)));
}
// const s2 = stream_pairs2(integers);





function zip_streams0(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    }
    
    return pair(head(s1), 
                    () => pair(head(s2), 
                                () => zip_streams(stream_tail(s1), 
                                                stream_tail(s2))
                                                ));
}


function zip_streams(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    }
    
    return pair(
            head(s1 ), 
            () => pair(
                    head(s2() ), 
                    () => zip_streams(
                                stream_tail(s1 ), 
                                () => stream_tail(s2() ))));
}

function stream_pairs3(s) {
    return is_null(s)
            ? null
            : zip_streams(
                    stream_map(sn => pair(head(s), sn), stream_tail(s)),
                    () => stream_pairs3(stream_tail(s)));
}

function interleave_append(xs, ys) {
    return is_null(xs) 
            ? ys
            : pair(head(xs), () => interleave_append(ys, stream_tail(xs)));
}

function stream_pairs4(s) {
    // it's "pretty cool"
    // but no one has any idea how to explain it.
    return (is_null(s) || is_null(stream_tail(s)))
            ? is_null
            : pair(pair(head(s), head(stream_tail(s))),
                    () => interleave_append(
                                stream_map(x => pair(head(s), x),
                                    stream_tail(stream_tail(s))),
                                stream_pairs4(stream_tail(s))));
}


stream_to_list_n(stream_pairs4(integers_from(1)), 20);

// stream_to_list_n(stream_pairs4(test), 6);

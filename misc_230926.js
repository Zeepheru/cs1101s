/*
function largest(integer) {
    const make_tens = x => math_pow(10, x);
    
    function helper(integer, n_remaining, comp) {
        if (integer < 10) {
            return integer;
        } else {
            const prev = helper(math_floor(integer / 10), n_remaining - 1, comp);
            const now = integer % 10;
            if (now === 0) {
                return prev;
            } else if (comp(now * make_tens(n_remaining - 1), prev - prev % make_tens(n_remaining - 1))) {
                return now * make_tens(n_remaining) + prev;
            } else {
                return prev * 10 + now;
            }
        }
    }
    
    
    return integer < 0
            ? helper(integer, howlong(integer) - 1, (x, y) => x <= y)
            : helper(integer, howlong(integer) - 1, (x, y) => x >= y);
}

function give_me_the_fucking_integer(x) {
    // So that gmtfi(1.1) === 1 && gmtfi(-1.1) === -1
    // Basically, same result as calling int() on a float in Python
    return x < 0
            ? math_ceil(x)
            : math_floor(x);
    // Nvm math_trunc exists :)
}
*/

function howlong(number) {
    return math_abs(number) < 1
            ? 0
            : 1 + howlong(number / 10);
}

function largest_v2(integer) {
    const make_tens = x => math_pow(10, x);
    const prev = math_trunc(integer / 10);
    const now = integer % 10;
    const prev_length = howlong(prev);
    
    if (prev_length === 0) {
        return now;
    } else if (now * make_tens(prev_length) + prev >= prev * 10 + now) {
        return now * make_tens(prev_length) + largest_v2(prev);
    } else {
        return largest_v2(prev) * 10 + now;
    }

}


// test 
largest_v2(6752378);
largest_v2(12345);
largest_v2(-1010);
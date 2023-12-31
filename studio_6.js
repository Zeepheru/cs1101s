// Studio 6

// Q1
function my_map(f, xs) {
    return accumulate((curr, wish) => pair(f(curr), wish), null, xs);
}

my_map(x => x + 1, list(1, 2, 3));

// Q2
function remove_duplicates(lst) {
    // use filter
    // final order does not matter
    return accumulate(
                (curr, wish) => pair(curr, filter(x => x !== curr, wish)),
                null, lst);
}

display_list(remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2)));
display_list(remove_duplicates(list("a", "x", "b", "c", "c", "b", "d")));

// Q3
function makeup_amount(x, coins) {
    if (x===0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin
        const combi_A = makeup_amount(x, tail(coins));
        
        // Combinations that do not use the head coin
        // for the remaining amount
        // I do not understand...
        // OHHHH IT WORKS LIKE THIS, yeah it is kinda redundant
        const combi_B = makeup_amount(x - head(coins), tail(coins));
        
        // Combinations that use the head coin
        const combi_C = map(wish => pair(head(coins), wish), combi_B);
        
        return append(combi_A, combi_C);
    }
}

const a = makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50));

display_list(a);

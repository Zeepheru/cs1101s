// Lecture 6


// BINARY SEARCH; BST!
const N = 100;
function guess_secret_num(start, end) {
    // O(log n) => since max of k calls for N = 2^k
    
    if (start === end) {
        return start;
    } else {
        const guess = math_floor((start + end) / 2);
        const check = check_guess(guess);
        return check === "correct"
        ? guess
        : check === "too low"
        ? guess_secret_num(guess + 1, end) // when "too low"
        : guess_secret_num(start, guess - 1); // when "too high"
    }
}
// guess_secret_num(1, N);

//  -----------------------------------------
// SORTING BABY SORTING
// sorry my drawings [annotations] are only in 1 color because my script isn't working today morning
function insertion_sort(xs) {
    // O(n^2!)??? lol
    function insert(x, xs) {
        return is_null(xs)
                ? list(xs) // input sorted list is empty.
                : x < = head(xs)
                ? pair(x, xs)
                : insert(x, tail(xs));
    }
    
    return is_null(xs)
            ? xs
            : insert(head(xs), insertion_sort(tail(xs)));
}

function selection_sort(xs) {
    function smallest(xs) {
        // Ooooh
        return accumulate((x, y) => x < y ? x : y, head(xs), tail(xs));
    }
    
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}

const sort_this = insertion_sort;

display_list(sort_this(list(10, 2, 3, 9, 6, 1, 2, 7, 11, 5, 7, 3, -1)))
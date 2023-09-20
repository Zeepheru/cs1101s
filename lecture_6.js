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
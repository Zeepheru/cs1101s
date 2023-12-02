// Q1
// Task 1

function partition(xs, p) {
    return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
}

// Test
const my_list = list(1, 2, 3, 4, 5, 6);
partition(my_list, 4);

// Q2
// Task 2

function partition(xs, p) {
    return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
}

function quicksort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const pivot = head(xs);
        const partitioned = partition(tail(xs), pivot);
        
        return append(
                    quicksort(head(partitioned)), 
                    pair(
                        pivot, 
                        quicksort(tail(partitioned))));
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);

// Q3, 4, 5
// MCQ

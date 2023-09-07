// Reflection 4

const q1a = pair(1, 2);
const q1b = pair(1, pair(3, pair(5, null)));
const q1c = pair(pair(pair(3, 2), pair(1, 0)), null);
const q1d = pair(0, list(1, 2));
const q1e = list(pair(1, 2), list(4, 5), 3);

// q2 ans
const q2a = list(1, 2, 3);
const q2b = pair(1, pair(2, 3));
const q2c = list(list(1, 2), list(3, 4), list(5, 6));

// q3 qn lists
const list_q3a = list(7, 6, 5, 4, 3, 2, 1);
const list_q3b = list(list(7), list(6, 5, 4), list(3, 2), 1);
const list_q3c = list(7, list(list(list(6, 5, list(list(4)), 3), 2)), 1);

const q3a = head(tail(tail(tail(list_q3a))));
const q3b = head(tail(tail(head(tail(list_q3b)))));
const q3c = head(head(head(tail(tail(head(head(head(tail(list_q3c)))))))));

// answer checking!
const to_check = q3c;

draw_data(to_check);
// display(to_check);
// display_list(to_check);

to_check;
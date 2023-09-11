// Studio 5

const q1a = list(list(1, 2, list(3), list(4, 5), pair(6, 7)));
const q1b = pair(1, list(2, 3, pair(4, null)));
const q1c = pair(1, pair(2, list(3, list(4, 5))));

function reverse(lst) {
    // does not work to make a list bcz tail of last return is not a list
    return is_null(lst) 
        ? null
        : pair(reverse(tail(lst)), head(lst));
}

const q2 = reverse(list(1, 2, 3, 4));

const list_q3a = list(7, list(6, 5, 4), 3, list(2, 1));
const list_q3b = list(list(7), list(6, 5, 4), list(3, 2), 1);
const list_q3c = list(7, list(6), list(5, list(4)), list(3, list(2, list(1))));
const list_q3d = list(7, list(list(6, 5), list(4), 3, 2), list(list(1)));

const q3a = head(tail(head(tail(tail(tail(list_q3a))))));
const q3b = head(tail(tail(tail(list_q3b))));
const q3c = head(head(tail(head(tail(head(tail(tail(tail(list_q3c)))))))));
const q3d = head(head(head(tail(tail(list_q3d)))));
 
// answer checking!
const to_check = q3c;

draw_data(to_check);
display(to_check);
display_list(to_check);

to_check;
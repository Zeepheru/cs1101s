// Q1
// Task 1

// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive.
// where 0 - 9 represent the digits
// 10 represents *, 11 represents #,
// and 12 - 15 represent the letters A-D.

/*
NOTES:
Head is higher freq, tail is lower freq

Numerical inputs:

    1209 1336 1477 1633
697   1    2   3    12
770   4    5   6    13
852   7    8   9    14
941   10   0   11   15

*/

function get_dtmf_frequencies(number) {
    const freq_list = list(
            pair(1336, 941), pair(1209, 697), pair(1336, 697), pair(1477, 697), 
            pair(1209, 770), pair(1336, 770), pair(1477, 770), pair(1209, 852), 
            pair(1336, 852), pair(1477, 852), pair(1209, 941), pair(1477, 941), 
            pair(1633, 697), pair(1633, 770), pair(1633, 852), pair(1633, 941));
    
    return list_ref(freq_list, number);
}

get_dtmf_frequencies(8);

// Q2
// Task 2

function get_dtmf_frequencies(number) {
    const freq_list = list(
            pair(1336, 941), pair(1209, 697), pair(1336, 697), pair(1477, 697), 
            pair(1209, 770), pair(1336, 770), pair(1477, 770), pair(1209, 852), 
            pair(1336, 852), pair(1477, 852), pair(1209, 941), pair(1477, 941), 
            pair(1633, 697), pair(1633, 770), pair(1633, 852), pair(1633, 941));
    
    return list_ref(freq_list, number);
}

function make_dtmf_tone(frequency_pair) {
    return simultaneously(list(
                    sine_sound(head(frequency_pair), 0.5),
                    sine_sound(tail(frequency_pair), 0.5)));
}

// testing
play(make_dtmf_tone(get_dtmf_frequencies(15)));

// Q3
// Task 3

function get_dtmf_frequencies(number) {
    const freq_list = list(
            pair(1336, 941), pair(1209, 697), pair(1336, 697), pair(1477, 697), 
            pair(1209, 770), pair(1336, 770), pair(1477, 770), pair(1209, 852), 
            pair(1336, 852), pair(1477, 852), pair(1209, 941), pair(1477, 941), 
            pair(1633, 697), pair(1633, 770), pair(1633, 852), pair(1633, 941));
    
    return list_ref(freq_list, number);
}

function make_dtmf_tone(frequency_pair) {
    return simultaneously(list(
                    sine_sound(head(frequency_pair), 0.5),
                    sine_sound(tail(frequency_pair), 0.5)));
}

function dial(list_of_digits) {
    const get_tone_sound = n => make_dtmf_tone(get_dtmf_frequencies(n));
    
    return is_null(list_of_digits)
            ? silence_sound(0)
            : consecutively(list(
                        get_tone_sound(head(list_of_digits)),
                        silence_sound(0.1),
                        dial(tail(list_of_digits))));
}

// Test
const dial_sound = dial(list(6,2,3,5,8,5,7,7));

play(dial_sound);



// Q4
// Task 4

function get_dtmf_frequencies(number) {
    const freq_list = list(
            pair(1336, 941), pair(1209, 697), pair(1336, 697), pair(1477, 697), 
            pair(1209, 770), pair(1336, 770), pair(1477, 770), pair(1209, 852), 
            pair(1336, 852), pair(1477, 852), pair(1209, 941), pair(1477, 941), 
            pair(1633, 697), pair(1633, 770), pair(1633, 852), pair(1633, 941));
    
    return list_ref(freq_list, number);
}

function make_dtmf_tone(frequency_pair) {
    return simultaneously(list(
                    sine_sound(head(frequency_pair), 0.5),
                    sine_sound(tail(frequency_pair), 0.5)));
}

function dial(list_of_digits) {
    const get_tone_sound = n => make_dtmf_tone(get_dtmf_frequencies(n));
    
    return is_null(list_of_digits)
            ? silence_sound(0)
            : consecutively(list(
                        get_tone_sound(head(list_of_digits)),
                        silence_sound(0.1),
                        dial(tail(list_of_digits))));
}

const evil_number = list(1,8,0,0,5,2,1,1,9,8,0);

function dial_all(list_of_numbers) {
    const filtered_list = filter(x => !equal(x, evil_number), list_of_numbers);
    
    const hash_added_list = map(x => append(x, list(11)), filtered_list);
    
    return accumulate(
                (wish, curr) => consecutively(list(dial(wish), curr)),
                silence_sound(0),
                hash_added_list);
}

// Test
const dial_all_sound = dial_all(list(
         list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
         list(6,2,3,5,8,5,7,7),
         list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1)));
         
// draw_sound_2d(dial_all);
play(dial_all_sound);

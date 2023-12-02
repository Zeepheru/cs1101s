/*
This one was FUCKING COOL NGL

The Pentatonic Scale

A pentatonic scale, is a musical scale or mode with five notes per "octave", in contrast to a heptatonic scale (introduced in Mission "Musical Diversions") which has seven notes. (The term "octave" might not be completely appropriate here; for a pentatonic scale, one might more accurately call it a "sextave".) Pentatonic scales are common all over the world: they occur in Celtic folk music, German folk music, American music, and musics of many other cultures. They are at the heart of Chinese music (in Chinese it's called gong shang jue zhi yu or 宫商角徵羽), and they are also exactly the musical scale used by the Trebbls for their magical Tone Matrix. Music that uses only pentatonic scales tends to sound pleasant with any combination of the pitches in the scale.

In the magical Tone Matrix of the Trebbls, the five notes used in an octave are C, D, E, G, A. With twelve-tone equal temperament, the pentatonic scale consists of the note numbers 0, 2, 4, 7 and 9, if you number the twelve semitones from 0 to 11.
The Tone Matrix

A tone matrix consists of a 16 by 16 grid, in which the rows represent sounds of different pitches produced by a particular musical instrument. Each column represents a time at which the sound should be played. The player can keep any of the fields full or empty. The matrix starts playing the left-most column, and the sounds corresponding to the full fields of the respective instruments in that column are played concurrently. After a given duration seconds, the matrix plays the second column, after another duration seconds, it plays the third column, and so on. When it reaches the last column, its starts again at the beginning.

To get a feeling for the tone matrix, go to https://www.maxlaumeister.com/tonematrix and click around—you will find magic.

This quest has two questions.


*/

// ____________________________________________________________________

// Question 1

// copy generate_list_of_note from Mission "Musical Diversions"
function generate_list_of_note(letter_name, list_of_interval) {
    return reverse(accumulate(
                        (curr, wish) => pair(head(wish) + curr, wish), 
                        list(letter_name_to_midi_note(letter_name)), 
                        reverse(list_of_interval)));
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

// repeat_pattern from Lecture L2
function repeat_pattern(n, pattern, rune) {
    return n === 0 ? rune : repeat_pattern(n - 1, pattern, pattern(rune));
}

function repeat_list(n, xs) {
    return n === 0 ? xs : append(xs, repeat_list(n - 1, xs));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    // display_list(repeat_list(n, list_of_interval));
    const note_list =  generate_list_of_note(
                                note, 
                                repeat_list(n, list_of_interval));
    // display_list(note_list);
    
    return map(x => instrument(x, duration), note_list);
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));






// import {
//     silence_sound, play, simultaneously, letter_name_to_midi_note, piano,
//     consecutively, get_duration, get_wave, make_sound
// } from "sound";

// Question 2
function play_matrix(duration, list_of_sounds) {
    // This is so wacky bruh
    // But it works :)
    const matrix = get_matrix();
    const matrix_length = length(list_ref(matrix, 0));

    function play_col(n) {
        function get_sound_list(bool_list, remaining_sounds) {
            const wish = () => get_sound_list(tail(bool_list), tail(remaining_sounds));
            return is_null(bool_list)
                    ? null
                    : head(bool_list)
                    ? pair(head(remaining_sounds), wish())
                    : wish();
        }
        
        const bool_list = map(x => list_ref(x, n), matrix);
        const sound_list = get_sound_list(bool_list, list_of_sounds);
                    
        play(simultaneously(sound_list));
    }
    
    map( (x) => x === matrix_length
                ? set_timeout( 
                        () => play_matrix(duration, list_of_sounds), 
                        x * duration * 1000) 
                : set_timeout( 
                        () => play_col(x), x * duration * 1000),
        enum_list(0, matrix_length));
}

function stop_matrix() {
    // stop_matrix();
    clear_all_timeout();
}

// copy your functions generate_list_of_note and repeated_scale
// from Question 1 here
function generate_list_of_note(letter_name, list_of_interval) {
    return reverse(accumulate(
                        (curr, wish) => pair(head(wish) + curr, wish), 
                        list(letter_name_to_midi_note(letter_name)), 
                        reverse(list_of_interval)));
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_list(n, xs) {
    return n === 0 ? xs : append(xs, repeat_list(n - 1, xs));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    const note_list =  generate_list_of_note(
                                note, 
                                repeat_list(n, list_of_interval));
    
    return map(x => instrument(x, duration), note_list);
}

//

const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, piano);

play_matrix(0.1, sounds);
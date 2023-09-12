import { 
    make_sound, play, 
    consecutively, simultaneously,
    letter_name_to_frequency, midi_note_to_frequency,
    square_sound, silence_sound, sawtooth_sound, sine_sound, triangle_sound,
    get_duration, get_wave
} from "sound";

// setting params

import {
    make_point, draw_connected_full_view_proportional
} from "curve";



// const encoded_hex = "6fc5c70192bbfd5aa85abbb910870814a002a0b676a02145415188deb41d016f77590984b2ed23be534e9b37733bc";
// // const encoded_t1 = parse_int(encoded_hex, 16);

// const encoded_t1 = 4200042162636400001641626364000016417401081690108000011616801160000116167011600001161650108162010816501081650108;
// const t1_spacer = 1e7;

const test_list_encoded_short = list(
    914115256, 
900001256, 
914115256, 
900001256, 
915301008, 
914801008, 
900001016, 
914701016, 
900001016, 
914601016, 
900001016, 
914401008, 
914101016, 
914401016, 
914601016);

const test_list_encoded = list(914115256, 900001256, 914115256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016, 913915256, 900001256, 913915256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016, 913815256, 900001256, 913815256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016, 913715256, 900001256, 913715256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016);

// IMPORTANT DEFINED
const bpm = 120;
const beat_duration = 1 / bpm * 60;
const bar_duration = 1 / bpm * 60 * 4;
//



// function create_sound_list(encoded) {
//     display(encoded);
//     return encoded < t1_spacer 
//             ? pair(encoded, null)
//             : pair(encoded % t1_spacer, create_sound_list(math_floor(encoded / t1_spacer)));
// }



// const note_encoded_list = create_sound_list(encoded_t1);

// draw_data(note_encoded_list);

// display(length(note_encoded_list));
// draw_data(note_encoded_list);


function apply_function_to_list(f, lst) {
    return is_null(lst)
            ? null
            : pair(f(head(lst)), apply_function_to_list(f, tail(lst)));
}



// try and generate sounds from t1 encoded numbers
function generate_sound_t1(encoded_0) {
    function get_freq(note_number) {
        return note_number === 0
                ? 0
                : midi_note_to_frequency(note_number);
    }
    const encoded = encoded_0 - 9e8;
    
    const dd = encoded % 1000;
    const nn = ((encoded - dd) / 1000) % 100;
    const sound_type = math_floor(encoded / 1e7);
    const note_number = math_floor((encoded % 1e7) / 1e5) + 21;
    
    // display(dd);
    // display(nn);
    // display(note_number);
    // display(nn/dd);
    
    const duration = bar_duration * nn / dd;
    
    const note_freq = get_freq(note_number);
    
    // can add chords here
    const sound_func = sound_type === 1
                        ? square_sound
                        : sound_type === 2
                        ? triangle_sound
                        : sound_type === 3
                        ? sawtooth_sound
                        : sound_type === 4
                        ? sine_sound
                        : (freq, duration) => silence_sound(duration);
    
    return sound_func(note_freq, duration);
}

const test_sound = apply_function_to_list(generate_sound_t1, test_list_encoded);


play(consecutively(test_sound));
import { 
    make_sound, play, 
    consecutively, simultaneously,
    letter_name_to_frequency, midi_note_to_frequency,
    square_sound, silence_sound, sawtooth_sound, sine_sound, triangle_sound,
    piano, violin, cello, trombone,
    get_duration, get_wave
} from "sound";

// setting params

import {
    make_point, draw_connected_full_view_proportional
} from "curve";


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

const list_encoded_megalovania_riff = list(914115256, 900001256, 914115256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016, 913915256, 900001256, 913915256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016, 913815256, 900001256, 913815256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016, 913715256, 900001256, 913715256, 900001256, 915301008, 914801008, 900001016, 914701016, 900001016, 914601016, 900001016, 914401008, 914101016, 914401016, 914601016);
const list_encoded_rickroll = list(955203008, 955403008, 954701004, 955403008, 955603008, 955901016, 955701016, 955601016, 955201016, 955203008, 955403008, 954701004, 900003004, 954701016, 954701016, 954901016, 955201016, 954901016, 955201016, 955203008, 955403008, 954701004, 955403008, 955603008, 955901016, 955701016, 955601016, 955201016, 955203008, 955403008, 954701004);


// IMPORTANT DEFINED SHTUFFFS
const bpm = 120;
const beat_duration = 1 / bpm * 60;
const bar_duration = 1 / bpm * 60 * 4;
//




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
                        : sound_type === 5
                        ? (freq, duration) => cello(note_number, duration)
                        : (freq, duration) => silence_sound(duration);
    
    return sound_func(note_freq, duration);
}

const test_sound = apply_function_to_list(generate_sound_t1, list_encoded_rickroll);


play(consecutively(test_sound));
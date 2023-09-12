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



const encoded_hex = "6fc5c70192bbfd5aa85abbb910870814a002a0b676a02145415188deb41d016f77590984b2ed23be534e9b37733bc";
// const encoded_t1 = parse_int(encoded_hex, 16);

const encoded_t1 = 4200042162636400001641626364000016417401081690108000011616801160000116167011600001161650108162010816501081650108;
const t1_spacer = 1e7;

// IMPORTANT DEFINED
const bpm = 120;
const beat_duration = 1 / bpm * 60;
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






// try and generate sounds from t1 encoded numbers
function generate_sound_t1(encoded) {
    function get_freq(note_number) {
        return note_number === 0
                ? 0
                : midi_note_to_frequency(note_number);
    }
    
    
    const nn = encoded % 100;
    const dd = ((encoded - nn) / 100) % 100;
    const sound_type = math_floor(encoded / 10e6);
    const note_number = math_floor((encoded % 10e6) / 10e4) + 21;
    
    const duration = nn / dd * beat_duration;
    
    const note_freq = get_freq(note_number);

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

const test_sound = generate_sound_t1(1626364);



play(test_sound);
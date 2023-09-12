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

// make waveform
function show_waveform(sound) {
    const dur = get_duration(sound);
    const draw_freq = 48000; // standard for most audio formats
    
    const wave = t => get_wave(sound)(t);
    
    const waveform_curve = x => make_point(x * 2, wave(x * dur) / 2);
    
    draw_connected_full_view_proportional(draw_freq * dur)(waveform_curve);
}

function apply_function_to_list(f, lst) {
    return is_null(lst)
            ? null
            : pair(f(head(lst)), apply_function_to_list(f, tail(lst)));
}




// const encoded_hex = "6fc5c70192bbfd5aa85abbb910870814a002a0b676a02145415188deb41d016f77590984b2ed23be534e9b37733bc";
// // const encoded_t1 = parse_int(encoded_hex, 16);

// const encoded_t1 = 4200042162636400001641626364000016417401081690108000011616801160000116167011600001161650108162010816501081650108;
// const t1_spacer = 1e7;



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



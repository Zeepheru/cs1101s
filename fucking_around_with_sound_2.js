import { 
    make_sound, play, 
    consecutively, simultaneously,
    letter_name_to_frequency,
    square_sound, silence_sound, 
    get_duration, get_wave
} from "sound";

// setting params

import {
    make_point, draw_connected_full_view_proportional
} from "curve";


const encoded_hex = "6fc5c70192bbfd5aa85abbb910870814a002a0b676a02145415188deb41d016f77590984b2ed23be534e9b37733bc";
const encoded_t1 = parse_int(encoded_hex, 16);

const t1_spacer = 1e7;

function create_sound_list(encoded) {
    return encoded < t1_spacer 
            ? pair(encoded, null)
            : pair(encoded % t1_spacer, create_sound_list(math_floor(encoded / t1_spacer)));
}

const note_encoded_list = tail(reverse(create_sound_list(encoded_t1)));
// tail removes front
display(length(note_encoded_list));
draw_data(note_encoded_list);
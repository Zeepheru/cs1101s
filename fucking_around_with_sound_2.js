// NEEDS S2 so the lists work!

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
const type_1_audio = parse_int(encoded_hex, 16);

display(type_1_audio);
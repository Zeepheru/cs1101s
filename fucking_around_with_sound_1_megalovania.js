// NEEDS S2 so the lists work!

import { 
    make_sound, play, 
    consecutively, 
    letter_name_to_frequency,
    square_sound, silence_sound
} from "sound";

// setting params

const bpm = 120;
// assuming 4/4
const beat = 1 / bpm * 60;
const measure  = beat * 4;
const note_8th = beat / 2;
const note_16th = beat / 4;

// notes -> frequences
const D4 = letter_name_to_frequency("D4");
const F4 = letter_name_to_frequency("F4");
const G4 = letter_name_to_frequency("G4");
const Ab4 = letter_name_to_frequency("Ab4");
const A4 = letter_name_to_frequency("A4");
const D5 = letter_name_to_frequency("D5");

const C4 = letter_name_to_frequency("C4");
const B3 = letter_name_to_frequency("B3");
const Bb3 = letter_name_to_frequency("Bb3");

const rest_16th = silence_sound(note_16th);



function riff_section(starting_note, note_generator) {
    // TEMP - creating the starting double 16th notes here
    const start = list(
                    note_generator(starting_note, note_16th / 8 * 7),
                    silence_sound(note_16th / 8),
                    note_generator(starting_note, note_16th)
                    );
                    
    const standard_riff = list(note_generator(D5, note_8th),
                            note_generator(A4, note_8th),
                            rest_16th,
                            note_generator(Ab4, note_16th),
                            rest_16th,
                            note_generator(G4, note_16th),
                            rest_16th,
                            note_generator(F4, note_8th),
                            note_generator(D4, note_16th),
                            note_generator(F4, note_16th),
                            note_generator(G4, note_16th));
                            
    return append(start, standard_riff);
}


// test

const m1 = riff_section(D4, square_sound);
const m2 = riff_section(C4, square_sound);
const m3 = riff_section(B3, square_sound);
const m4 = riff_section(Bb3, square_sound);


// please ignore this terrible implementation
const test_clip = consecutively(
                        append(m1, append(m2, append(m3, m4))));
                            
play(test_clip);
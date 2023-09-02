// NEEDS S2 so the lists work!

import { 
    make_sound, play, 
    consecutively, simultaneously,
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
// no sharps q.q
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

// PLAYING CHORDS
function square_octave(note_freq, length) {
    // up one octave - technically not a chord but whatever
    return simultaneously(
                list(
                    square_sound(note_freq, length),
                    square_sound(note_freq * 2, length)));
}

function square_octave_triple(note_freq, length) {
    // up and down one octave
    // doesn't sound nice btw
    return simultaneously(
                list(
                    square_sound(note_freq / 2, length),
                    square_sound(note_freq, length),
                    square_sound(note_freq * 2, length)));
}

function square_maj_chord(note_freq, length) {
    // sounds way too fucking happy lmaooo
    return simultaneously(
                list(
                    square_sound(note_freq, length), // root
                    square_sound(note_freq * 1.25, length), // maj 3rd
                    square_sound(note_freq * 1.5, length), // 5th
                    square_sound(note_freq * 2, length))); // octave
}

function square_pwr_chord(note_freq, length) {
    return simultaneously(
                list(
                    square_sound(note_freq, length), // root
                    square_sound(note_freq * 1.5, length), // 5th
                    square_sound(note_freq * 2, length))); // octave
}


// the actual melody
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

const note_generator = square_pwr_chord;

const m1 = riff_section(D4, note_generator);
const m2 = riff_section(C4, note_generator);
const m3 = riff_section(B3, note_generator);
const m4 = riff_section(Bb3, note_generator);


// please ignore this terrible implementation
const test_clip = consecutively(
                        append(m1, append(m2, append(m3, m4))));
                            
play(test_clip);
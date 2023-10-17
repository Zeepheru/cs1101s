const colorSensor = ev3_colorSensor();
const touch1 = ev3_touchSensor4();

// Misc
function check_quit() {
    return ev3_touchSensorPressed(touch1);
}

function check_brightness_and_log() {
    refl_brightness = ev3_reflectedLightIntensity(colorSensor);
    display(["Brightness:", refl_brightness, "%"]);
    
    return refl_brightness;
}

// Main sequence
function question1() {
    while (true) {
        if (check_quit()) {
            break;
        }
        check_brightness_and_log();
        pause(1000);
    }
}

question1();
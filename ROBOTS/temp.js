// ev3_speak("program running");

// init variables
const motorL = ev3_motorA();
const motorR = ev3_motorB();
// const ultrasonicSensor = ev3_ultrasonicSensor();
const colorSensor = ev3_colorSensor();
const touch1 = ev3_touchSensor4();

const wheel_r = 2.6;
const half_track_width = 6; // half dist btwn centrelines of wheels

const gear_ratio = 1;

let verbose = true;
const v_default = 5;
const turnrate_default = 60;
const stop_behaviour_default = "coast";
// Blank variables
let refl_brightness = 0;


// Utils
function convert_to_motor_speed(v) {
    return 180 * v / math_PI / wheel_r * gear_ratio;
}

function console_log(msg) {
    display(msg);
}

function verbose_log(msg) {
    return verbose ? console_log(msg) : msg;
}

// Movement
function init_motor_defaults() {
    // Initialises default motor speed and stop action. 
    verbose_log(["Initialising motor defaults: V=", v_default, "cm/s, stop_behaviour=", stop_behaviour_default]);
    const motor_speed = convert_to_motor_speed(v_default);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);
    
    ev3_motorSetStopAction(motorL, stop_behaviour_default);
    ev3_motorSetStopAction(motorR, stop_behaviour_default);
}

function move_distance_and_stop(v, x) {
    // Moves a distance x cm at a speed v cm/s.
    verbose_log(["Moving distance ", x, "cm at a speed", v]);
    const motor_speed = convert_to_motor_speed(v);
    const run_time = math_abs(180 * x / math_PI / motor_speed / wheel_r * 1000);
    
    ev3_runForTime(motorL, run_time, motor_speed);
    ev3_runForTime(motorR, run_time, motor_speed);
    pause(run_time);
}

function move_distance_default(x) {
    // Moves a distance x cm at a the default speed. 
    verbose_log(["Moving distance ", x, "cm"]);
    move_distance_and_stop(v_default, x);
}

function start_motors() {
    // Starts both motors. Convenience function. 
    verbose_log("Starting both motors.");
    ev3_motorStart(motorL);
    ev3_motorStart(motorR);
}

function stop_motors() {
    // Stops both motors. Convenience function. 
    verbose_log("Stopping both motors.");
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

function move(v) {
    // Begins movement at a speed v cm/s.
    verbose_log(["Starting movement at", v, "cm/s"]);
    const motor_speed = convert_to_motor_speed(v);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);

    start_motors();
}

function brake() {
    // Stops both motors with the "brake" stop action.
    // stopAction reverts back to default. 
    verbose_log("Braking.");
    ev3_motorSetStopAction(motorL, "brake");
    ev3_motorSetStopAction(motorR, "brake");
    
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
    
    ev3_motorSetStopAction(motorL, stop_behaviour_default);
    ev3_motorSetStopAction(motorR, stop_behaviour_default);
}

function neutral_turn(direction) {
    // Begins a neutral turn (both wheels spinning in opposite directions)
    // at the default turn rate in the specified direction. 
    verbose_log(["Starting neutral turn to the ", direction]);
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    
    if (direction === "left") {
        ev3_motorSetSpeed(motorL, -motor_speed);
        ev3_motorSetSpeed(motorR, motor_speed);
    } else {
        ev3_motorSetSpeed(motorL, motor_speed);
        ev3_motorSetSpeed(motorR, -motor_speed);
    }
    start_motors();
}

function neutral_turn_to_angle(direction, angle) {
    // Conducts a neutral turn (both wheels spinning in opposite directions)
    // at the default turn rate to the specified angle in the specified direction. 
    verbose_log(["Starting neutral turn at", angle, "°/s to the " + direction]);
    const angle_adjust_factor = 1;
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    const run_time = (math_PI * half_track_width * angle / 180 / v_linear * 1000) * angle_adjust_factor;
    
    if (direction === "left") {
        ev3_runForTime(motorL, run_time, -motor_speed);
        ev3_runForTime(motorR, run_time, motor_speed);
    } else {
        ev3_runForTime(motorL, run_time, motor_speed);
        ev3_runForTime(motorR, run_time, -motor_speed);
    }
    // pause(run_time);
}

function maze_turn(direction) {
    // Begins a pivot turn (one wheel spinning)
    // at the default turn rate in the specified direction. 
    verbose_log("Starting pivot turn to the " + direction);
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    const alt_speed = 0.4 * convert_to_motor_speed(v_linear);
    
    if (direction === "left") {
        ev3_motorSetSpeed(motorL, -alt_speed);
        ev3_motorSetSpeed(motorR, motor_speed);
    } else {
        ev3_motorSetSpeed(motorL, motor_speed);
        ev3_motorSetSpeed(motorR, -alt_speed);
    }
    start_motors();
}

function maze_turn_to_angle(direction, angle) {
    verbose_log(["Starting neutral turn at", angle, "°/s to the " + direction]);
    const angle_adjust_factor = 1;
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    const run_time = (math_PI * half_track_width * angle / 180 / v_linear * 1000) * angle_adjust_factor;
    
    const alt_speed = 0.4 * convert_to_motor_speed(v_linear);
    
    if (direction === "left") {
        ev3_runForTime(motorL, run_time, -alt_speed);
        ev3_runForTime(motorR, run_time, motor_speed);
    } else {
        ev3_runForTime(motorL, run_time, motor_speed);
        ev3_runForTime(motorR, run_time, -alt_speed);
    }
    // pause(run_time);
}

function reverse_maze_turn_to_angle(direction, angle) {
    verbose_log(["Starting neutral turn at", angle, "°/s to the " + direction]);
    const angle_adjust_factor = 1;
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    const run_time = (math_PI * half_track_width * angle / 180 / v_linear * 1000) * angle_adjust_factor;
    
    const alt_speed = 0.4 * convert_to_motor_speed(v_linear);
    
    if (direction === "left") {
        ev3_runForTime(motorL, run_time, -motor_speed);
        ev3_runForTime(motorR, run_time, alt_speed);
    } else {
        ev3_runForTime(motorL, run_time, alt_speed);
        ev3_runForTime(motorR, run_time, -motor_speed);
    }
    // pause(run_time);
}

function is_turning() {
    return ev3_motorGetSpeed(motorL) !== 0 || ev3_motorGetSpeed(motorR) !== 0 ;
}


// Misc
let on_path = pair(false, false);
let turn_direction = "left";
let reverse_correction_turn = false;

function check_quit() {
    return ev3_touchSensorPressed(touch1);
}

function check_brightness_and_log() {
    refl_brightness = ev3_reflectedLightIntensity(colorSensor);
    console_log(["Brightness:", refl_brightness, "%"]);
    
    return refl_brightness;
}

function check_path() {
    // check if on the black path
    const path_brightness = 15;
    refl_brightness = ev3_reflectedLightIntensity(colorSensor);
    
    set_head(on_path, tail(on_path));
    set_tail(on_path, refl_brightness < path_brightness);
    
    return refl_brightness < path_brightness;
}

function check_turn() {
    return head(on_path) && !tail(on_path);
}

function opposite_direction() {
    turn_direction = turn_direction === "left" ? "right" : "left";
    return turn_direction;
}


// Question 3
function question3() {
    on_path = pair(check_path(), check_path());
    move(v_default);
    
    ev3_pause(100);
    
    while (true) {
        // check_brightness_and_log();
        
        if (check_quit()) { break;}

        if (check_turn()) {
            reverse_correction_turn = false;
            console_log("Off path. Turn initiated.");
            stop_motors();
            // maze_turn(opposite_direction());
            maze_turn_to_angle(opposite_direction(), 90);
        }
        
        // if (!is_turning()) {
        //     if (reverse_correction_turn && !tail(on_path)) {
        //         console_log("Maze complete!");
        //         break;
        //     }
            
        //     if (tail(on_path)) {
        //         maze_turn_to_angle(turn_direction, 90);
        //     }
        //     else {
        //         reverse_correction_turn = true;
        //         reverse_maze_turn_to_angle(opposite_direction(), 135);
        //     }
        // }
        
        check_path();
        ev3_pause(25);
    }
    
}


question3();
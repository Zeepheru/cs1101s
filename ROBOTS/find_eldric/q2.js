// ev3_speak("program running");

// init variables
const motorL = ev3_motorA();
const motorR = ev3_motorB();
// const ultrasonicSensor = ev3_ultrasonicSensor();
const colorSensor = ev3_colorSensor();
const touch1 = ev3_touchSensor4();

const wheel_r = 2.6;
const half_track_width = 6; // half dist btwn centrelines of wheels

const v_default = 5;
const turnrate_default = 60;
const stop_behaviour_default = "coast";
// Blank variables
let refl_brightness = 0;


// Utils
function convert_to_motor_speed(v) {
    return 180 * v / math_PI / wheel_r;
}

// Movement
function init_motor_defaults() {
    // Initialises default motor speed and stop action. 
    display(["Initialising motor defaults: V=", v_default, "cm/s, stop_behaviour=", stop_behaviour_default]);
    const motor_speed = convert_to_motor_speed(v_default);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);
    
    ev3_motorSetStopAction(motorL, stop_behaviour_default);
    ev3_motorSetStopAction(motorR, stop_behaviour_default);
}

function start_motors() {
    // Starts both motors. Convenience function. 
    display("Starting both motors.");
    ev3_motorStart(motorL);
    ev3_motorStart(motorR);
}

function stop_motors() {
    // Stops both motors. Convenience function. 
    display("Stopping both motors.");
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

function move(v) {
    // Begins movement at a speed v cm/s.
    display(["Starting movement at", v, "cm/s"]);
    const motor_speed = convert_to_motor_speed(v);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);

    start_motors();
}

function maze_turn_to_angle(direction, angle) {
    display(["Starting neutral turn at", angle, "°/s to the " + direction]);
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
}

function is_turning() {
    return ev3_motorGetSpeed(motorL) !== 0 || ev3_motorGetSpeed(motorR) !== 0 ;
}

// Misc
let path_status = pair(false, false);
let turn_direction = "left";

function check_quit() {
    return ev3_touchSensorPressed(touch1);
}

function check_path() {
    // check if on the black path
    const path_brightness = 15;
    refl_brightness = ev3_reflectedLightIntensity(colorSensor);
    
    set_head(path_status, tail(path_status));
    set_tail(path_status, refl_brightness < path_brightness);
    
    return refl_brightness < path_brightness;
}

function check_turn() {
    return head(path_status) && !tail(path_status);
}

function opposite_direction() {
    turn_direction = turn_direction === "left" ? "right" : "left";
    return turn_direction;
}


// Question 2
function question2() {
    path_status = pair(check_path(), check_path());
    move(v_default);
    
    ev3_pause(100);
    
    while (true) {
        
        if (check_quit()) { break;}

        if (check_turn()) {
            display("Off path. Turn initiated.");
            stop_motors();
            maze_turn_to_angle(opposite_direction(), 90);
        }
        
        check_path();
        ev3_pause(25);
    }
    
}


question3();
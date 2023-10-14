// Your program here.
ev3_speak("program running");

const us = ev3_ultrasonicSensor();
const distance_ratio = 1;


while (true) {
    // infinite loop :)
    display(distance_ratio * ev3_ultrasonicSensorDistance(us));
    ev3_pause(1000);
}
// Your program here.
ev3_speak("program running");

const us = ev3_ultrasonicSensor();

while (true) {
    // infinite loop :)
    display(ev3_ultrasonicSensorDistance(us));
    ev3_pause(1000);
}
import { inputDevice } from "./elements";
import toastr from "toastr";

export function inputDevicesInit() {
    // ask the user for permission to access their audio input devices (Media Capture and Streams API)
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            // permission granted, enumerate the available input devices
            return navigator.mediaDevices.enumerateDevices();
        })
        .then(devices => {
            devices.forEach(device => {
                if (device.kind === 'audioinput') {
                // create a new option element for the device(s)
                const deviceOption = document.createElement('option');
                deviceOption.value = device.deviceId; // option element value will be the id of the selected device
                deviceOption.text = device.label;
                deviceOption.classList.add("text-left");

                // add the new option to the select element
                inputDevice.add(deviceOption);
                }
            });
    })
    .catch(error => {
        toastr["error"]("Failed to enumerate audio input devices.", "Device error")
        
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        console.log(error);
    });
}

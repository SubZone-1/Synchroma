const inputSelect = document.getElementById("select-input-device");

// ask the user for permission to access their audio input devices
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
            inputSelect.add(deviceOption);
            }
        });
})
.catch(error => {
    window.alert('Failed to enumerate audio input devices', error);
});





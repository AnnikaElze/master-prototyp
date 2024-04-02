import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import theme from "../../Theme";

/** Component overview
 * CameraSelection offers a drop-down menu for selecting a camera device.
 */

function CameraSelection (props) {
  // List of available cameras
  const [cameraList, setCameraList] = useState([]);

  // Flag to initialize camera list
  const [init, setInit] = useState(true);

  // Array to store camera objects
  const cameras = [];

  // Enumerate available media devices and populate the camera list if init = true
  navigator.mediaDevices.enumerateDevices().then(function (devices){
    if (init) {
      // Iterate over each connected device
      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        // Check if device is a video input (camera) and add it to the camera array
        if (device.kind === 'videoinput'){
          cameras.push({id: device.deviceId, name: 'Kamera '+i})
        }
      }
      // Map camera array to MenuItem components (stored in cameraList)
      setCameraList(cameras.map((camera) => <MenuItem value={camera.id} className="selectItem">{camera.name}</MenuItem>));
      setInit(!init);
    }
  })

  // Create Dropdown Menu from cameraList to trigger handleCamera functions in the App component
  return (
    <FormControl size="small"
                 sx={{  m: 1, minWidth: 150,
                     '& .MuiOutlinedInput-root': {
                       '& fieldset': { borderColor: theme.palette.primary.light, },
                       '&:hover fieldset': { borderColor: theme.palette.primary.main, },
                       '&.Mui-focused fieldset': { borderColor: theme.palette.primary.dark, },
                     },
                   '& .MuiSvgIcon-root': { color:  theme.palette.primary.light },
                   '& .MuiInputBase-input': {color:  theme.palette.primary.light },
                 }}>
      <InputLabel>Perspektive {props.selectionId}</InputLabel>
      <Select
        displayEmpty
        value={props.camera}
        label='Perspektive x'
        onChange={props.handleCamera}
        MenuProps={{
          PaperProps:{
            style: {
              backgroundColor: theme.palette.primary.main,
            },
          }
        }}
      >
        {cameraList}
      </Select>
    </FormControl>
  );
}

export default CameraSelection;
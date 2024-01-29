import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import theme from "../../Theme";

/**
 * @parent FeedbackController
 * @props selectionId, handleCamera, camera
 * @return Dropdown for camera device selection - set camera1 | camera2 in Feedback
 */

function CameraSelection (props) {
  const [cameraList, setCameraList] = useState([]);
  const [init, setInit] = useState(true);
  const cameras = [];

  navigator.mediaDevices.enumerateDevices().then(function (devices){
    if (init) {
      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        if (device.kind === 'videoinput'){
          cameras.push({id: device.deviceId, name: 'Kamera '+i})
        }
      }
      setCameraList(cameras.map((camera) => <MenuItem value={camera.id} className="selectItem">{camera.name}</MenuItem>));
      setInit(!init);
    }
  })

  return (
    <FormControl size="small"
                 sx={{  m: 1, minWidth: 150,
                     '& .MuiOutlinedInput-root': {
                       '& fieldset': { borderColor: theme.palette.primary.light, }, // Border im normalen Zustand
                       '&:hover fieldset': { borderColor: theme.palette.primary.main, }, // Border beim Hover
                       '&.Mui-focused fieldset': { borderColor: theme.palette.primary.dark, },// Border im aktivierten Zustand
                     },
                   '& .MuiSvgIcon-root': { color:  theme.palette.primary.light }, // Farbe des Pfeils
                   '& .MuiInputBase-input': {color:  theme.palette.primary.light }, // Farbe des Textes nach Auswahl
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
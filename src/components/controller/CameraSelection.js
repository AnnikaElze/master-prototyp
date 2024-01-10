import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

function CameraSelection (props) {
  const [cameraList, setCameraList] = useState([]);
  const [init, setInit] = useState(true);
  const cameras = [];

  navigator.mediaDevices.enumerateDevices().then(function (devices){
    if (init) {
      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        if (device.kind === 'videoinput'){
          cameras.push({id: device.deviceId, name: 'Gerät '+i})
        }
      }
      setCameraList(cameras.map((camera) => <MenuItem value={camera.id}>{camera.name}</MenuItem>));
      setInit(!init);
    }
  })

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small-label" className="selectLabel">Kamera {props.selectionId}</InputLabel>
      <Select
        displayEmpty
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={props.camera}
        label='Kamera x'
        onChange={props.handleCamera}
      >
        {cameraList}
      </Select>
    </FormControl>
  );
}

export default CameraSelection;
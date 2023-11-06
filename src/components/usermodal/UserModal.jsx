import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/actions/user-action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UserModal = ({ open, setClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  return (
    <Modal
      open={open}
      onClose={() => setClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Ավելացնել նոր օգտվող
        </Typography>
        <Box mt={2}>
          <TextField
            label="Անուն"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={() => {
              if (name !== "") {
                dispatch(addUser({ name: name }));
                setClose(false);
              }
            }}
          >
            Ավելացնել
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;

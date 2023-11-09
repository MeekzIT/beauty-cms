import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  addWork,
  getServices,
} from "../../store/actions/user-action";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";

const AddWork = ({ open, setClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [serviceId, setServiceId] = useState("");
  const isMobile = useIsMobile();
  const data = useSelector((state) => state.users.services);

  useEffect(() => {
    dispatch(
      getServices({
        userId: id,
      })
    );
  }, [id]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    height: isMobile ? "100vh" : null,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setClose(false);
        setServiceId("");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          className="clone_btn"
          onClick={() => {
            setClose(false);
          }}
        >
          <CloseIcon />
        </div>
        <Typography p={2} id="modal-modal-title" variant="h6" component="h2">
          Ավելացնել աշխատանք
        </Typography>
        <Box mt={2} p={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ծառայություն</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={serviceId}
              label="Ծառայություն"
              onChange={(e) => setServiceId(e.target.value)}
            >
              {data?.map((i) => (
                <MenuItem value={i?.id} key={i?.id}>
                  {i?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={2} p={2}>
          <Button
            variant="contained"
            onClick={() => {
              if (serviceId !== "") {
                dispatch(
                  addWork({
                    userId: id,
                    serviceId,
                  })
                );
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

export default AddWork;

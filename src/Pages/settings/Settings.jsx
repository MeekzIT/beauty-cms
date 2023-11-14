import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAdmin, getMe } from "../../store/actions/auth-action";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const me = useSelector((state) => state.auth.admin);
  const myAdmin = useSelector((state) => state.auth.myAdmin);

  useEffect(() => {
    dispatch(getMe());
    dispatch(getAdmin());
  }, []);

  console.log(me, myAdmin);
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          Իմ կարգավորումները
        </Typography>
        <Box>asdasdasd</Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          Ադմինի կարգավորումներ
        </Typography>
        <Box>asdasdasd</Box>
      </Box>
    </Box>
  );
};

export default Settings;

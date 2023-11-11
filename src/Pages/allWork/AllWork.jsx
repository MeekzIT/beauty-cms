import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  addWork,
  deleteService,
  deleteWork,
  getServices,
  getUser,
  getUsers,
  getWorks,
} from "../../store/actions/user-action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Services from "../../components/sercvices/Services";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { HOME_PAGE } from "../../routing/pats";
import AddIcon from "@mui/icons-material/Add";
import AddServices from "../../components/addsercvices/AddServices";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalculateIcon from "@mui/icons-material/Calculate";
import Results from "../../components/results/Results";
import { getMe } from "../../store/actions/auth-action";
import AddWork from "../../components/addWork/AddWork";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

const AllWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const users = useSelector((state) => state.users.users);
  const data = useSelector((state) => state.users.work);
  const role = useSelector((state) => state.auth.isSuper);
  const services = useSelector((state) => state.users.services);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(
      getServices({
        userId: open,
      })
    );
  }, [open]);

  console.log(data);
  return (
    <Box component={Paper}>
      <Box p={2}></Box>
      <Box
        p={2}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Button variant="outlined" onClick={() => navigate(HOME_PAGE)}>
            <KeyboardBackspaceIcon />
            Վերադառնալ
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          padding: "15px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {users?.map((row) => (
          <Card
            sx={{
              width: 300,
              backgroundColor: "whitesmoke",
              cursor: "pointer",
            }}
            onClick={() => setOpen(row.id)}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {row.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <hr />
      <Box p={2}>
        <Typography gutterBottom variant="h5" component="div">
          Ծառայություներ
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "15px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {services?.length ? (
          services?.map((row) => (
            <Card
              sx={{
                width: 300,
                backgroundColor: "whitesmoke",
                cursor: "pointer",
              }}
              onClick={() => setOpen(row.id)}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {row.name}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography gutterBottom variant="h5" component="div">
            Դատարկ
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllWork;

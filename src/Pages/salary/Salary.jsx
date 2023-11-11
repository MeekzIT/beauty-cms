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
import {
  addWork,
  deleteService,
  deleteWork,
  getResults,
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Salary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [arxive, setArxive] = useState(false);
  const [open, setOpen] = useState(false);
  const [add, setSetAdd] = useState(false);
  const [user, setUser] = useState();
  const firstDayOfMonth = dayjs().startOf("month");
  const lastDayOfMonth = dayjs().endOf("month");
  const [value, setValue] = useState();
  const handleOpen = () => setOpen(true);
  const data = useSelector((state) => state.users.work);
  const role = useSelector((state) => state.auth.isSuper);
  const services = useSelector((state) => state.users.services);
  const users = useSelector((state) => state.users.users);
  const calc = useSelector((state) => state.users.results);

  useEffect(() => {
    dispatch(
      getWorks({
        userId: user,
        date: value,
      })
    );
    dispatch(
      getResults({
        userId: user,
        date: value,
      })
    );
  }, [user, value]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMe());
  }, []);
  console.log(users, "users");
  return (
    <Box component={Paper}>
      <Box p={2}>
        <h1>Աշխատանքներ</h1>
      </Box>
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
        <Box>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="Ծառայություն"
            onChange={(e) => setUser(e.target.value)}
          >
            {users?.map((i) => (
              <MenuItem value={i?.id} key={i?.id}>
                {i?.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          {user && (
            <Button variant="outlined" onClick={() => setUser(null)}>
              <FilterAltOffIcon /> Ջնջել user filtre
            </Button>
          )}
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={value}
                onChange={(newValue) => setValue(newValue.format("YYYY-MM-DD"))}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Box>
          {value && (
            <Button variant="outlined" onClick={() => setValue(null)}>
              <FilterAltOffIcon /> Ջնջել ամսաթվի ֆիլտրը
            </Button>
          )}
        </Box>
      </Box>
      <Box
        p={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box>
          <h3>Արդյունքներ</h3>
          <Typography component="h3">Ամբողջական - {calc?.all} ֏</Typography>
          <Typography component="h3">Օգուտ - {calc?.cantora} ֏</Typography>
          <Typography component="h3">Աշխատավարձ - {calc?.benefit} ֏</Typography>
        </Box>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Աշխատանքի տեսակը</TableCell>
                  <TableCell align="left">Գին</TableCell>
                  <TableCell align="left">Աշխատողի աշխատանքը</TableCell>
                  <TableCell align="left">Ամսաթիվ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length ? (
                  data?.map((row) => (
                    <TableRow
                      key={row.modeName}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.price} ֏
                      </TableCell>{" "}
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.benefit} ֏
                      </TableCell>{" "}
                      <TableCell component="th" scope="row" align="left">
                        {row.createdAt.slice(0, 10)}{" "}
                        {row.createdAt.slice(11, 16)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Box
                    p={2}
                    sx={{
                      width: "100%",
                      height: "20vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Դատարկ
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Salary;

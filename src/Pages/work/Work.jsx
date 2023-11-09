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
  deleteService,
  deleteWork,
  getServices,
  getUser,
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

const Work = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);
  const [add, setSetAdd] = useState(false);
  const [results, setResults] = useState(false);

  const [value, setValue] = useState(null);
  const handleOpen = () => setOpen(true);
  const data = useSelector((state) => state.users.work);
  const role = useSelector((state) => state.auth.isSuper);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(
      getWorks({
        userId: id,
        date: value,
      })
    );
  }, [value]);

  useEffect(() => {
    dispatch(getUser({ id }));
    dispatch(getMe());
  }, []);
  return (
    <Box>
      <Box p={2}>
        <h1>Աշխատանքներ` {user?.name}</h1>
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
        {role === "superAdmin" && (
          <Box>
            <Button variant="outlined" onClick={() => setSetAdd(true)}>
              <AddIcon /> Ավելացնել
            </Button>
          </Box>
        )}
        {role === "superAdmin" && (
          <Box>
            <Button variant="outlined" onClick={() => setResults(true)}>
              <CalculateIcon /> Դիտել արդյունքները
            </Button>
          </Box>
        )}
        {role === "superAdmin" && (
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={value}
                  onChange={(newValue) =>
                    setValue(newValue.format("YYYY-MM-DD"))
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        )}
        <Box>
          {value && (
            <Button variant="outlined" onClick={() => setValue(null)}>
              <FilterAltOffIcon /> Ջնջել ամսաթվի ֆիլտրը
            </Button>
          )}
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
                  {role === "superAdmin" && (
                    <TableCell align="left">Ջնջել</TableCell>
                  )}
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
                      {role === "superAdmin" && (
                        <TableCell component="th" scope="row" align="left">
                          <Button
                            variant="outlined"
                            onClick={() => dispatch(deleteWork(row.id))}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      )}
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
        <Services open={open} setClose={setOpen} data={current} />
        <AddWork open={add} setClose={setSetAdd} />
        <Results open={results} setClose={setResults} all={false} />
      </Box>
    </Box>
  );
};

export default Work;

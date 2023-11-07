import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  dengerDelete,
  getUsers,
} from "../../store/actions/user-action";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UserModal from "../../components/usermodal/UserModal";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../store/actions/auth-action";
import CalculateIcon from "@mui/icons-material/Calculate";
import Results from "../../components/results/Results";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(false);

  const handleOpen = () => setOpen(true);
  const data = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.isSuper);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMe());
  }, []);

  return (
    <Box>
      <Box
        p={2}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button variant="outlined" onClick={handleOpen}>
          <AddIcon />
          Ավելացնել
        </Button>
        {role === "superAdmin" && (
          <Box>
            <Button variant="outlined" onClick={() => setResults(true)}>
              <CalculateIcon /> Դիտել արդյունքները
            </Button>
          </Box>
        )}
        {role === "superAdmin" && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => dispatch(dengerDelete())}
              sx={{ color: "red", borderColor: "red" }}
            >
              <DeleteForeverIcon sx={{ color: "red" }} /> Ջնջել բոլոր տվյալները
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Անուն</TableCell>
                  <TableCell align="left">Ծառայություններ</TableCell>
                  <TableCell align="left">Ջնջել</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.modeName}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          navigate(`/user/${row.id}`);
                        }}
                      >
                        <AddIcon />
                        Դիտել
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <Button
                        variant="outlined"
                        onClick={() => dispatch(deleteUser(row.id))}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <UserModal open={open} setClose={setOpen} />
      <Results open={results} setClose={setResults} all={true} />
    </Box>
  );
};

export default Home;

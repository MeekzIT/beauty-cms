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
import VisibilityIcon from "@mui/icons-material/Visibility";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ALL_WORK_PAGE, SALARY_PAGE } from "../../routing/pats";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(false);
  const [type, setType] = useState(null);
  const handleOpen = (data) => {
    setType(data);
    setOpen(true);
  };
  const data = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.isSuper);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMe());
  }, []);

  return (
    <Box component={Paper}>
      <Box
        p={2}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {role === "superAdmin" ? (
          <Box>
            <Button variant="outlined" onClick={() => navigate(SALARY_PAGE)}>
              <CalculateIcon /> Դիտել արդյունքները
            </Button>
          </Box>
        ) : (
          <>
            <Box>
              <Button
                variant="outlined"
                onClick={() => navigate(ALL_WORK_PAGE)}
              >
                Աշխատանք
              </Button>
            </Box>
            <Box>
              <Button variant="outlined" onClick={() => navigate(SALARY_PAGE)}>
                <CalculateIcon /> Դիտել արդյունքները
              </Button>
            </Box>
          </>
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
      <Box p={2}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Վարսահարդար
          </Typography>
        </Box>
        {role == "superAdmin" && (
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
              <Button variant="outlined" onClick={() => handleOpen(1)}>
                <AddIcon />
                Ավելացնել
              </Button>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            padding: "15px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {data?.map(
            (row) =>
              row.type == 1 && (
                <Card
                  sx={{
                    width: 300,
                    backgroundColor: "whitesmoke",
                    cursor: "pointer",
                  }}
                  onClick={() => role == "admin" && navigate(`/work/${row.id}`)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {row.name}
                    </Typography>
                  </CardContent>
                  {role == "superAdmin" && (
                    <CardActions
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {/* <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          navigate(`/work/${row.id}`);
                        }}
                      >
                        <AddIcon /> Աշխատանքներ
                      </Button> */}
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          navigate(`/user/${row.id}`);
                        }}
                      >
                        <VisibilityIcon /> Ծառայություններ
                      </Button>
                      <Button
                        fullWidth
                        color="error"
                        variant="outlined"
                        onClick={() => dispatch(deleteUser(row.id))}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                    </CardActions>
                  )}
                </Card>
              )
          )}
        </Box>
      </Box>
      <hr />

      {/* -=----------------------------------------------------------------------------------------- */}
      <Box p={2}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Մատնահարդար
          </Typography>
        </Box>
        {role == "superAdmin" && (
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
              <Button variant="outlined" onClick={() => handleOpen(2)}>
                <AddIcon />
                Ավելացնել
              </Button>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            padding: "15px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {data?.map(
            (row) =>
              row.type == 2 && (
                <Card
                  sx={{
                    width: 300,
                    backgroundColor: "whitesmoke",
                    cursor: "pointer",
                  }}
                  onClick={() => role == "admin" && navigate(`/work/${row.id}`)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {row.name}
                    </Typography>
                  </CardContent>
                  {role == "superAdmin" && (
                    <CardActions
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {/* <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          navigate(`/work/${row.id}`);
                        }}
                      >
                        <AddIcon /> Աշխատանքներ
                      </Button> */}
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          navigate(`/user/${row.id}`);
                        }}
                      >
                        <VisibilityIcon /> Ծառայություններ
                      </Button>
                      <Button
                        fullWidth
                        color="error"
                        variant="outlined"
                        onClick={() => dispatch(deleteUser(row.id))}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                    </CardActions>
                  )}
                </Card>
              )
          )}
        </Box>
      </Box>
      <hr />
      {/* -=----------------------------------------------------------------------------------------- */}
      <Box p={2}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Լուսամազահեռացում
          </Typography>
        </Box>
        {role == "superAdmin" && (
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
              <Button variant="outlined" onClick={() => handleOpen(3)}>
                <AddIcon />
                Ավելացնել
              </Button>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            padding: "15px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {data?.map(
            (row) =>
              row.type == 3 && (
                <Card
                  sx={{
                    width: 300,
                    backgroundColor: "whitesmoke",
                    cursor: "pointer",
                  }}
                  onClick={() => role == "admin" && navigate(`/work/${row.id}`)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {row.name}
                    </Typography>
                  </CardContent>
                  {role == "superAdmin" && (
                    <CardActions
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {/* <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          navigate(`/work/${row.id}`);
                        }}
                      >
                        <AddIcon /> Աշխատանքներ
                      </Button> */}
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          navigate(`/user/${row.id}`);
                        }}
                      >
                        <VisibilityIcon /> Ծառայություններ
                      </Button>
                      <Button
                        fullWidth
                        color="error"
                        variant="outlined"
                        onClick={() => dispatch(deleteUser(row.id))}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                    </CardActions>
                  )}
                </Card>
              )
          )}
        </Box>
      </Box>
      <hr />

      <UserModal open={open} setClose={setOpen} type={type} />
      <Results open={results} setClose={setResults} all={true} />
    </Box>
  );
};

export default Home;

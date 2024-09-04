import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useAuth } from "../../context/AuthProvider";
import { useHistory } from "react-router-dom";

export const validationSchema = yup
  .object({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().required("Required"),
  })
  .required();

const Login: React.FC = () => {
  const { replace } = useHistory();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          await login(values.email, values.password);
        } catch (error: any) {
          enqueueSnackbar(
            error.response?.data?.error ?? "Something went wrong",
            { variant: "error" }
          );
        }

        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Login
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                size="small"
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                color={props.errors.email ? "error" : "primary"}
                disabled={props.isSubmitting}
              />
              {props.errors.email && (
                <Typography fontSize="small" color="error">
                  {props.errors.email}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                size="small"
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                color={props.errors.password ? "error" : "primary"}
                disabled={props.isSubmitting}
              />
              {props.errors.password && (
                <Typography fontSize="small" color="error">
                  {props.errors.password}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box
                mb={1}
                onClick={() => {
                  replace("/register");
                }}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Haven't Register? Register Here
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="medium"
                disabled={!props.isValid || props.isSubmitting}
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const LoginPage = () => <Login />;

export default LoginPage;

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useHistory } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const validationSchema = yup
  .object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().required("Required"),
    role: yup.string().required("Required"),
    profilePicture: yup.mixed().required("Required"),
  })
  .required();

const Register: React.FC = () => {
  const { replace } = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        role: "",
        profilePicture: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            formData.append(key, (values as any)[key]);
          });

          const response = await axios.post("/api/auth/register", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            enqueueSnackbar("Successfully Registered", { variant: "success" });
            return;
          }
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
        <Form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Register
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Name"
                size="small"
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
                color={props.errors.name ? "error" : "primary"}
                disabled={props.isSubmitting}
              />
              {props.errors.name && (
                <Typography fontSize="small" color="error">
                  {props.errors.name}
                </Typography>
              )}
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
              <Box sx={{ maxWidth: 225 }}>
                <FormControl
                  fullWidth
                  size="small"
                  disabled={props.isSubmitting}
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    label="Role"
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.role}
                    name="role"
                    color={props.errors.role ? "error" : "primary"}
                  >
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="WorkspaceAdmin">Workspace Admin</MenuItem>
                    <MenuItem value="SuperAdmin">Super Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {props.errors.role && (
                <Typography fontSize="small" color="error">
                  {props.errors.role}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={props.isSubmitting}
              >
                Profile Picture
                <VisuallyHiddenInput
                  type="file"
                  name="profilePicture"
                  onChange={(e) => {
                    props.setFieldValue(
                      "profilePicture",
                      e.target.files?.[0] ?? undefined
                    );
                  }}
                  disabled={props.isSubmitting}
                  multiple
                />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Box
                mb={1}
                onClick={() => {
                  replace("/login");
                }}
                sx={{ textDecoration: "underline" }}
              >
                Already Register? Login
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="medium"
                disabled={!props.isValid || props.isSubmitting}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const RegisterPage = () => <Register />;

export default RegisterPage;

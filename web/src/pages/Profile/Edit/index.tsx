import { Form, Formik } from "formik";
import { useCurrentUser } from "../../../context/CurrentUserProvider";
import styled from "styled-components";
import * as yup from "yup";
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { getWorkspaceList, putUserDetails } from "../../../api";

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
    role: yup.string().required("Required"),
    workspaceId: yup.string(),
    profilePicture: yup.mixed(),
  })
  .required();

const Edit: React.FC = () => {
  const { details, refetch } = useCurrentUser();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useQuery(["getWorkspaceList"], async () =>
    getWorkspaceList({})
  );

  const { mutateAsync } = useMutation(putUserDetails);

  return (
    <Formik
      initialValues={{
        name: details.name,
        email: details.email,
        role: details.roles[0],
        profilePicture: undefined,
        workspaceId: details.workspaceId || undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          formData.append(key, (values as any)[key]);
        });

        await mutateAsync(
          {
            userId: "me",
            headers: { "Content-Type": "multipart/form-data" },
            body: formData as any,
          },
          {
            onSuccess: () => {
              enqueueSnackbar("Successfully Registered", {
                variant: "success",
              });
              refetch();
            },
            onError: (error: any) => {
              enqueueSnackbar(
                error.response?.data?.error ?? "Something went wrong",
                { variant: "error" }
              );
            },
          }
        );

        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CardMedia
                component="img"
                src={`data:image/png;base64, ${details.profilePicture}`}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
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
              <Box sx={{ maxWidth: 240 }}>
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
              {isLoading ? (
                <CircularProgress size={30} />
              ) : (
                <>
                  <Box sx={{ maxWidth: 240 }}>
                    <FormControl
                      fullWidth
                      size="small"
                      disabled={props.isSubmitting}
                    >
                      <InputLabel id="workspace-label">Workspace</InputLabel>
                      <Select
                        labelId="workspace-label"
                        label="workspace"
                        variant="outlined"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.workspaceId}
                        name="workspaceId"
                        color={props.errors.role ? "error" : "primary"}
                      >
                        {data?.workspaces?.map((w) => {
                          return <MenuItem value={w.id}>{w.name}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  {props.errors.workspaceId && (
                    <Typography fontSize="small" color="error">
                      {props.errors.workspaceId}
                    </Typography>
                  )}
                </>
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
              <Button
                type="submit"
                variant="contained"
                size="medium"
                disabled={props.isSubmitting}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const EditPage = () => <Edit />;

export default EditPage;

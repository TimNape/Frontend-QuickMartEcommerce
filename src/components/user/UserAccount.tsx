import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  fetchUserById,
  updateUser,
  updateUserPassword,
} from "../../redux/slices/usersSlice";
import { User } from "../../types/User";
import { useAppSelector } from "../../hooks/useAppSelector";
import ProductCard from "../products/ProductCard";
import { removeFavoriteProduct } from "../../redux/slices/productSlice";
import EmptyFavoriteProduct from "../products/EmptyFavoritesProducts";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "-1px",
      left: "-1px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserAccount = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const isAdmin = user?.role === "Admin";
  const favoriteProducts = useAppSelector(
    (state) => state.products.favoriteProducts
  );
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({
    ...user,
  });
  const [activeSection, setActiveSection] = useState("personalInfo");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Handle for change password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  //Handle for change avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleAvatarDelete = () => {
    setAvatarFile(null);
  };

  //Handle form submission to update user data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData: Partial<User> = { id };
    if (updatedUserData.name) updateData.name = updatedUserData.name;
    if (updatedUserData.email) updateData.email = updatedUserData.email;
    if (avatarFile) updateData.avatar = avatarFile;

    // Dispatch update user action and wait for it to complete
    await dispatch(updateUser(updateData));

    if (newPassword) {
      await dispatch(updateUserPassword({ id, newPassword }));
    }

    // Re-fetch user data to update the page
    dispatch(fetchUserById(id));
    // Clear form fields
    setUpdatedUserData({ ...user });
    setNewPassword("");
    setAvatarFile(null);
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, boxShadow: 0 }}>
            <List>
              <ListItem button onClick={() => setActiveSection("personalInfo")}>
                <ListItemText primary="Personal Information" />
              </ListItem>
              <ListItem button onClick={() => setActiveSection("wishlist")}>
                <ListItemText primary="Wishlist" />
              </ListItem>
              <ListItem button onClick={() => setActiveSection("orderHistory")}>
                <ListItemText primary="Order History" />
              </ListItem>
              <ListItem button onClick={() => setActiveSection("reviews")}>
                <ListItemText primary="Your Reviews" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 4, minHeight: "100vh", boxShadow: 0 }}>
            {activeSection === "personalInfo" && (
              <>
                <Typography variant="h5" gutterBottom>
                  Personal Information
                </Typography>
                <Avatar
                  src={user?.avatar as string}
                  alt={user?.name}
                  sx={{ width: 250, height: 250, mb: 2 }}
                />
                {isAdmin && (
                  <Typography variant="body2">Role: {user?.role}</Typography>
                )}
                <Typography variant="h6">{user?.name}</Typography>
                <Typography variant="body1">Email: {user?.email}</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isEditing}
                      onChange={() => setIsEditing(!isEditing)}
                      color="secondary"
                    />
                  }
                  label="Edit Info"
                />
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Email"
                      name="email"
                      value={updatedUserData.email || ""}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Name"
                      name="name"
                      value={updatedUserData.name || ""}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="New Password"
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      margin="normal"
                    />
                    <Button
                      variant="contained"
                      component="label"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Upload Avatar
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </Button>
                    {avatarFile && (
                      <Box
                        sx={{ mt: 2, display: "flex", alignItems: "center" }}
                      >
                        <Typography variant="body2" sx={{ mr: 2 }}>
                          {avatarFile.name}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={handleAvatarDelete}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <Typography variant="body2">
                    Click "Edit Info" to update your details.
                  </Typography>
                )}
              </>
            )}
            {activeSection === "wishlist" && (
              <>
                <Typography variant="h5" gutterBottom>
                  Wishlist
                </Typography>
                {!isAdmin && (
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                      Favorite Products
                    </Typography>
                    {favoriteProducts.length > 0 ? (
                      <Grid container spacing={2}>
                        {favoriteProducts.map((product) => (
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            key={product.id}
                            sx={{ mb: 5, width: "100%", height: "100%" }}
                          >
                            <ProductCard product={product} />
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              color="error"
                              onClick={() =>
                                dispatch(removeFavoriteProduct(product.id))
                              }
                              sx={{ mt: 1 }}
                            >
                              Remove
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <EmptyFavoriteProduct />
                    )}
                  </Grid>
                )}
              </>
            )}
            {activeSection === "orderHistory" && (
              <>
                <Typography variant="h5" gutterBottom>
                  Order History
                </Typography>
                <Typography>Soon...</Typography>
              </>
            )}
            {activeSection === "reviews" && (
              <>
                <Typography variant="h5" gutterBottom>
                  Reviews
                </Typography>
                <Typography>Soon...</Typography>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserAccount;

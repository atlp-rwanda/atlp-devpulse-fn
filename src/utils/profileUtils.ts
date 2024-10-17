import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { getSingleUser, update_User } from "../redux/actions/users";
import { TuserSchema } from "./userSchema";

// Fetch user data
export const fetchUser = async (
  userId: string,
  dispatch: AppDispatch,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  await dispatch(getSingleUser(userId));
  setLoading(false);
};

// Update user data
export const updateUser = async (
  data: TuserSchema,
  userId: string,
  dispatch: AppDispatch,
  originalData: TuserSchema
) => {
  try {
    const updateData = { ...data };
    if (!updateData.password) {
      delete updateData.password;
    }

    const hasChanges = Object.keys(updateData).some(
      (key) =>
        updateData[key as keyof TuserSchema] !==
        originalData[key as keyof TuserSchema]
    );

    if (!hasChanges) {
      toast.info("No changes detected");
      return false;
    }
    await dispatch(update_User({ id: userId, editUserInput: updateData }));
    toast.success("User updated successfully");
    dispatch(getSingleUser(userId));
  } catch (error) {
    toast.error("Failed to update user");
    console.error("Update error:", error);
  }
};

// Extract user ID from token
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.data.userId;
  }
  return null;
};

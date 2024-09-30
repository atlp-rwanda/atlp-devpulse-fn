import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { z } from "zod";

const userSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
});
type TuserSchema = z.infer<typeof userSchema>;

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TuserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("user updated successfully");
    reset();
  };
  const token = localStorage.getItem("access_token");

  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));

    const userId = decodedPayload.data.userId;
    // console.log("User ID:", userId);
  } else {
    console.log("No token found in localStorage");
  }

  return (
    <>
      <div className="w-full flex flex-col  items-center mt-10">
        <h2 className="text-2xl text-green font-semibold pb-3 ">
          Update Your Profile
        </h2>
        <form
          className="w-[35%] flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="pl-4 py-2 rounded"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last name"
            className="pl-4 py-2 rounded"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
          <button
            className="py-2 bg-green rounded flex justify-center "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ThreeDots height="20" width="30" color="#ffffff" />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;

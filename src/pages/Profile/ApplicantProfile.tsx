import React, { useState } from "react";
import profile from "../../assets/assets/connor.jpg";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import andela from "../../assets/assets/andela.svg";
import { FaRegEdit, FaCameraRetro } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomText from "../../components/CustomInput/CustomText";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  emailAddress: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid format (e.g., example@domain.com)"
    )
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  biography: Yup.string().required("Biography is required"),
});
const ApplicantProfile: React.FC = () => {
  const welcome =
    "https://images.squarespace-cdn.com/content/v1/5fdafd871bf01d0e857784cb/1610495939122-IHZOWJM56ELROICC767U/Welcome+%284%29.png";
  const image = profile
    ? profile
    : "https://www.gravatar.com/avatar/b649d61606a86936f9783d7c7a46a99e?s=200&d=robohash&r=x";
  const NavBar = [
    {
      name: "About",
      path: "",
    },
    {
      name: "Organization",
      path: "",
    },
    {
      name: "Account",
      path: "",
    },
  ];
  const UserDetail = [
    {
      title: "Email",
      value: "connor@example.com",
      icon: <CiMail />,
    },
    {
      title: "Phone Number",
      value: "+1 (555) 555-5555",
      icon: <FaPhone />,
    },
    {
      title: "Address",
      value: "123 Main St, City, State, 12345",
      icon: <IoHome />,
    },
  ];
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      <div className="h-full w-full dark:bg-dark-frame-bg flex flex-col flex-1 gap-1">
        {!isEdit ? (
          <>
            <div
              className="bg-welcome w-full h-[15rem]  flex justify-between px-10"
              style={{
                backgroundImage: `url(${welcome})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "inset 0px -50px 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div className="flex flex-col justify-end pb-6">
                <img
                  src={`${image}`}
                  alt="Applicant Profile"
                  className="object-cover w-[10rem] h-[10rem]  rounded-full"
                />
              </div>
              <div className="flex flex-col justify-end pb-6">
                <button
                  className="bg-[#56C870] py-2 px-2 text-xl rounded-lg text-white cursor-pointer"
                  onClick={() => setIsEdit(true)}
                >
                  Edit profile
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="bg-welcome w-full h-[15rem] flex justify-between px-10"
              style={{
                backgroundImage: `url(${welcome})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "inset 0px -50px 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div className="flex flex-col justify-end pb-6 relative">
                <img
                  src={`${image}`}
                  alt="Applicant Profile"
                  className="object-cover w-[10rem] h-[10rem] rounded-full"
                />
                <i className="absolute right-2 top-[11rem] bg-[#56C870] w-10 h-10 flex items-center justify-center text-white rounded-full cursor-pointer">
                  <FaRegEdit size={24} />
                </i>
              </div>
              <div className="flex flex-col justify-end pb-6">
                <button
                  className="bg-[#56C870] py-2 px-2 text-xl rounded-lg text-white cursor-pointer flex items-center justify-center gap-1"
                  onClick={() => setIsEdit(true)}
                >
                  <FaCameraRetro /> <span>change cover</span>
                </button>
              </div>
            </div>
          </>
        )}
        <>
          {!isEdit ? (
            <div>
              <div className="mt-5">
                <div className="dark:bg-[#1F2A37] flex gap-5 p-3 m-2">
                  {NavBar.map((item, index) => {
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <Link
                          to={item.path}
                          className="text-white hover:text-gray-400 dark:text-gray-200"
                        >
                          {item.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-between p-3 mb-5">
                <div className="dark:bg-[#1F2A37] rounded-lg w-[20rem]">
                  <div className="flex gap-5 p-3 m-2 flex-col">
                    <h1 className="text-white text-2xl font-bold">Conner</h1>
                    {UserDetail.map((item, index) => {
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <i className="text-white">{item.icon}</i>
                          </div>
                          <p className="text-white text-sm">{item.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="dark:bg-[#1F2A37] rounded-lg w-[40rem]">
                  <div className="p-3 text-white">
                    <h1 className="font-bold text-2xl">Biography</h1>
                    <p className="text-xs lg:text-xl pt-4">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nulla sequi omnis repellat eos nesciunt hic fuga velit
                      sapiente ipsa voluptatum, consectetur odit eius beatae
                      iure obcaecati veritatis repellendus iusto accusamus?
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 h-28 mb-5">
                <div className="bg-[#173B3F] flex gap-10 w-full h-24 items-center pl-14">
                  <div className="relative top-10">
                    <img src={andela} alt="Andela Logo" className="w-28 h-28" />
                  </div>
                  <div className="text-white">
                    <h1 className="text-2xl font-bold">Andela</h1>
                    <a href="https://andela.pusle.com" className="">
                      <p>https://andela.pusle.com</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-3 flex justify-between">
                <div className="dark:bg-[#1F2A37] rounded-lg w-[25rem] p-5">
                  <h1 className="text-[#56C870]">Organization</h1>
                  <div className="text-white pt-5">
                    <table>
                      <tbody>
                        <tr>
                          <td className="font-bold">Joined Date :</td>
                          <td className="pl-2">20 july 2022</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Role :</td>
                          <td className="pl-2">Trainee / Applicant</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Team :</td>
                          <td className="pl-2">Codebandits</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="dark:bg-[#1F2A37] rounded-lg w-[25rem] p-5">
                  <h1 className="text-[#56C870]">Management</h1>
                  <div className="text-white pt-5">
                    <table>
                      <tbody>
                        <tr>
                          <td className="font-bold">Program :</td>
                          <td className="pl-2">ATLP</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Stage(current) :</td>
                          <td className="pl-2">Core concept</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Manger :</td>
                          <td className="pl-2 text-[#56C870] underline">
                            Mukunzi Dodo
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 p-3">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  address: "",
                  phoneNumber: "",
                  city: "",
                  country: "",
                  biography: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("Form submitted:", values);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex w-full gap-20">
                      <div className="w-full">
                        <Field
                          name="firstName"
                          title="First Name"
                          placeholder="Enter your first name"
                          component={CustomInput}
                        />

                        <Field
                          name="lastName"
                          title="Last Name"
                          placeholder="Enter your last name"
                          component={CustomInput}
                        />
                        <Field
                          name="emailAddress"
                          title="Email Address"
                          placeholder="Enter your email address"
                          component={CustomInput}
                        />
                      </div>
                      <div className="w-full">
                        <Field
                          name="phoneNumber"
                          title="Telephone"
                          placeholder="Enter your phone number"
                          component={CustomInput}
                        />
                        <Field
                          name="city"
                          title="City"
                          placeholder="Enter your city"
                          component={CustomInput}
                        />
                        <Field
                          name="country"
                          title="Country"
                          placeholder="Enter your country"
                          component={CustomInput}
                        />
                      </div>
                    </div>
                    <Field
                      name="biography"
                      title="Biography"
                      placeholder="Enter your biography"
                      component={CustomText}
                    />
                    <button
                      type="submit"
                      className="mt-4 bg-[#56C870] text-white px-4 py-2 rounded-md"
                      disabled={isSubmitting}
                    >
                      Save changes
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default ApplicantProfile;

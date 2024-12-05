import React, { useEffect, useState } from "react";
import * as icons from "react-icons/ai";
import { updateDocAction } from "../../redux/actions/updateDocsAction";
import { fetchSingleDocs } from "../../redux/actions/fetchSingleDocAction";
import { toast } from "react-toastify";
import NavBar from "../../components/sidebar/navHeader";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { AiOutlineExpand, AiOutlineCompress } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const UpdateDocumentation = (props: any) => {
  const params = useParams();
  const dispacth = useAppDispatch();
  const [ID, setId] = useState(params.docId);
  const [entries, setEntries] = useState<Array<string>>([]);
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    role: "",
  });


  const [isMaximized, setIsMaximized] = useState(false); 

  const toggleEditorSize = () => {
    setIsMaximized((prev) => !prev); 
  };



  const { fetchSingleDocStates, updateDocStates } = props;
  const docsData = fetchSingleDocStates.data;
  const addEntry = (entry: string) => {
    let itemFound = entries.find((item) => item === entry);
    if (!itemFound && entry !== "") {
      setEntries((prevState) => [...prevState, entry]);
    }
    setCurrentEntry("");
  };

  const removeEntry = (entry: string) => {
    setEntries(entries.filter((item) => item !== entry));
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();

    setCurrentEntry((prevState) =>
      e.target.name === "entries" ? e.target.value : prevState
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    console.log(formData);
    if (formData.title === "") {
      toast.error("Title is required");
    } else if (formData.description === "") {
      toast.error("Description is required");
    } else if (formData.role === "") {
      toast.error("role is required");
    } else {
      try {
        const submitData = {
          _id: ID,
          title: formData.title,
          description: formData.description,
          role: formData.role,
        };
        console.log(submitData);
        props.updateDocAction(submitData);
      } catch (err) {
        console.log(err);
      }
    }
  };
                                                                                                                                                                                                                                                                                                                                                                                                 
  useEffect(() => {
    dispacth(fetchSingleDocs(ID));
  }, [ID]);

  useEffect(() => {
    if (fetchSingleDocStates.data) {
      setFormData(docsData);
      setEntries(docsData.requirements);
    }
  }, [fetchSingleDocStates.serverResponded]);

  return (
    <>
  <div className="overflow-x-hidden bg-white dark:bg-dark-tertiary relative mt-10 w-[100%] py-3 min-h-[100vh]">
  <div className="block text-center font-bold text-gray-600  dark:text-white text-base lg:max-w-3xl sm:w-[100%] p-4 lg:px-4 m-4 mx-auto text-[24px]">
    <h1 className="p-2">Update Documentation</h1>
  </div>
  <form
    className="bg-white w-[90%] md_:w-full dark:bg-dark-frame-bg md_:p-5 lg:max-w-4xl  dark:text-white mb-4 text-gray-600 shadow rounded mx-auto min-h-[50vh]"
    onSubmit={handleSubmit}
  >
    {fetchSingleDocStates.data === null ? (
      <p className="text-center p-20">Loading data please wait.....</p>
    ) : (
      <div className="flex flex-col items-center space-y-6 w-full">
      {/* Title Field */}
      <div className="flex flex-col w-full max-w-md space-y-2">
        <label className={`block text-sm font-bold mb-2 ${isMaximized? `hidden`:`block`}`}>Title</label>
        <input
          className="dark:bg-dark-tertiary shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          defaultValue={docsData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          placeholder="Program title"
          required
        />
      </div>
    
      {/* Documentation Description */}
      <div
          className={`flex flex-col h-72  space-y-2 transition-all duration-300 ${
            isMaximized
              ? "absolute md_:w-[100%] left-0 h-[calc(100%-100px)] p-5"
              : "w-[90%] max-w-md"
          } bg-white dark:bg-[#262E3D] rounded-lg`}
          >
        <div className="flex justify-between items-center">
          <label
            htmlFor="description"
            className="font-bold text-black-text dark:text-white"
          >
            Documentation Description
          </label>
          <span
            onClick={toggleEditorSize}
            className="text-lg p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isMaximized ? <AiOutlineCompress /> : <AiOutlineExpand />}
          </span>
        </div>
        <ReactQuill
          id="description"
          theme="snow"
          defaultValue={docsData.description}
          onChange={(value) =>
            setFormData({
              ...formData,
              description: value,
            })
          }
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              [{ font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ align: [] }],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "bullet",
            "indent",
            "align",
            "link",
            "image",
            "video",
          ]}
          className={`${
            isMaximized ? "h-[calc(100%-50px)]" : "h-32"
          } dark:bg-[#262E3D] dark:text-white bg-white text-black rounded-md`}
          placeholder="Enter your documentation description here..."
        />
      </div>
    
      {/* Role Selection */}
      <div className="flex flex-col w-full max-w-md space-y-2">
        <label className="block text-sm font-bold mb-2">Select Role</label>
        <select
          className="dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          defaultValue={docsData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
          required
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="applicant">Applicant</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </div>
    
      {/* Buttons */}
      <div className="flex flex-row w-full max-w-md gap-3">
        <button
          type="submit"
          className="dark:bg-[#56C870] bg-gray-600 rounded-md py-2 px-4 text-white font-medium cursor-pointer"
        >
          {updateDocStates.loading ? "Updating..." : "Update"}
        </button>
        <Link
          to="/admin/documents"
          className="dark:bg-[#56C870] bg-gray-600 rounded-md py-2 px-4 text-white font-medium cursor-pointer"
        >
          Cancel
        </Link>
      </div>
    </div>
    
    )}
  </form>
</div>

    </>
  );
};

const mapState = (state: any) => ({
  fetchSingleDocStates: state.fetchSingleDocs,
  updateDocStates: state.updateDocs,
});

export default connect(mapState, {
  updateDocAction,
  fetchSingleDocs,
})(UpdateDocumentation);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  createScoreType,
  getAllScoreTypes,
  deleteScoreType,
  updateScoreType,
} from "../../redux/actions/scoreTypesActions";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "../../components/sidebar/navHeader";
import e from "express";

const ScoreTypesActions = (props: any) => {
  const { scoreTypes } = props;

  const sortedDta = scoreTypes.data;

  useEffect(() => {
    props.getAllScoreTypes();
  }, []);
  const [num, setNum] = useState("");
  const [deleteScoreTypeId, setdeleteScoreTypeId] = useState("");
  const [updateScoreTypeId, setupdateScoreTypeId] = useState("");
  const [openUpdateModal, setOpenUpdateModel] = useState(false);
  const [score_type, setscore_type] = useState("");
  const [id, setId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);
  const handleCloseUpdateModal = (e: any) => {
    e.preventDefault();
    setOpenUpdateModel(false);
  };
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseCreateModel = () => {
    setOpenCreateModal(false);
  };

  const handleOpenUpdateModal = (e: any) => {
    const cycle = sortedDta[activeCycle!];

    console.log(cycle, "CYCLE");

    setOpenUpdateModel(true);
    setscore_type(cycle.score_type);
    setupdateScoreTypeId(cycle.id);
    setId(cycle.id);
    setAnchorEl(null);
  };
  const createScoreType = () => {
    const data = {
      score_type: num,
    };
    props.createScoreType(data);
    setOpenCreateModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleOpenCreateCycle = () => {
    setOpenCreateModal(true);
  };
  const updateScoreType = () => {
    const data = {
      updateScoreTypeId,
      id,
      score_type,
    };
    console.log(data, "???????????");
    props.updateScoreType(data);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const deleteScoreType = () => {
    const data = {
      deleteScoreTypeId,
    };

    props.deleteScoreType(data);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <NavBar />
      <div className="flex bg-[#F9F9FB] min-h-[100vh]">
        <div className="min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0">
          <Modal
            open={openCreateModal}
            onClose={handleCloseCreateModel}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="absolute w-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[fit]">
              <form
                onSubmit={createScoreType}
                className="border border-[#333] border-1 bg-[#eaeaea] rounded-[5px] p-2 w-fit mx-auto my-7"
              >
                <input
                  required
                  type="text"
                  placeholder="Enter your test/exam name."
                  className="block border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] mx-auto my-3"
                  value={num}
                  onChange={(e) => {
                    e.preventDefault();
                    setNum(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="block text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mb-5 mx-auto"
                >
                  SAVE
                </button>
              </form>
            </Box>
          </Modal>{" "}
          <div className="w-fit block mx-auto ">
            {" "}
            <button
              className="h-[40px] rounded-[5px] bg-[#173b3f] text-white flex items-center p-0 pl-[5px] pr-[10px] mb-[20px]"
              onClick={() => handleOpenCreateCycle()}
            >
              <BsIcons.BsPlusLg className="mx-[5px]" />
              <span>Test</span>
            </button>
            <table className="block ">
              <thead className="border p-3">
                <tr className="border-solid border-[1px] border-white even:bg-[#eef1f1] first:w-[20px]">
                  <th className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] py-6   last:pl-[0px] w-[150px]   first:w-[20px]  ">
                    Nº
                  </th>
                  <th className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] py-6   last:pl-[0px] w-[250px]   first:w-[20px]  ">
                    Name
                  </th>
                  <th className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] py-6   last:pl-[0px] w-[150px]   first:w-[20px]  px-5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDta.map((values: any, i: number) => {
                  return (
                    <tr className="even:bg-[#eef1f1] border-b border-gray-200 ">
                      <td className="pl-[30px] text-left max-w-[300px] overflow-x-auto p-4  last:pl-[0px]">
                        {i + 1}
                      </td>
                      <td className="pl-[30px] text-left max-w-[300px] overflow-x-auto p-4  last:pl-[0px] ">
                        {values.score_type}
                      </td>
                      <td className=" cursor-pointer pl-5">
                        <BsIcons.BsThreeDotsVertical
                          onClick={(event) => {
                            setAnchorEl(
                              event.currentTarget as unknown as HTMLElement
                            );
                            event.preventDefault();
                            setActiveCycle(i);
                            console.log(values.id);
                            setdeleteScoreTypeId(values.id);
                          }}
                          style={{
                            color: "#000",
                            fontSize: "20px",
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>{" "}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={(e) => {
                handleOpenUpdateModal(e);
              }}
            >
              Update
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteScoreType();
              }}
            >
              Delete
            </MenuItem>
          </Menu>{" "}
          <Modal
            open={openUpdateModal}
            onClose={handleCloseUpdateModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="absolute w-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[fit]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateScoreType();
                }}
                className="border border-[#333] border-1 bg-[#eaeaea] rounded-[5px] px-2 w-fit mx-auto "
              >
                <hr style={{ marginBottom: "40px" }} />
                <input
                  required
                  type="text"
                  name="score_type"
                  value={score_type}
                  placeholder="Enter new score type name"
                  onChange={(e) => {
                    e.preventDefault();
                    setscore_type(e.target.value);
                  }}
                  className="block border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] mx-auto mb-3"
                />
                <div className="flex flex-wrap w-[300px] m-auto">
                  <button
                    className="block text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mb-5 mx-auto"
                    type="submit"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};
const mapState = (state: any) => ({
  scoreTypes: state.scoreTypes,
});

export default connect(mapState, {
  createScoreType,
  getAllScoreTypes,
  deleteScoreType,
  updateScoreType,
})(ScoreTypesActions);

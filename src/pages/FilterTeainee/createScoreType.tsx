import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllScoreTypes,
  getOneScoreType,
} from "../../redux/actions/scoreTypesActions";
import { getAllTraineess } from "../../redux/actions/TraineeAction";
import {
  getAllScoreValues,
  createScoreValue,
  updateScoreValue,
  deleteScoreValue,
} from "../../redux/actions/scoreValueActions";
import { toast } from "react-toastify";
import NavBar from "../../components/sidebar/navHeader";
import * as BsIcons from "react-icons/bs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const createScoreType = (props: any) => {
  const { scoreTypes, scoreType, scoreValues, trainee } = props;
  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const sortedDta = scoreTypes.data;
  const usedDta = scoreValues.data;
  const traineeDetail = trainee.data;

  const yuret = usedDta?.filter((values: any) => {
    return values.attr_id?._id == urlId;
  });
  const [updateScoreValueId, setupdateScoreValueId] = useState("");
  const [deleteScoreValueId, setdeleteValueTypeId] = useState("");
  const [openUpdateModal, setOpenUpdateModel] = useState(false);
  const [score_value, setscore_value] = useState("");
  const [id, setId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);
  const handleCloseUpdateModal = (e: any) => {
    e.preventDefault();
    setOpenUpdateModel(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUpdateModal = () => {
    const cycle = yuret[activeCycle!];

    setOpenUpdateModel(true);
    setscore_value(cycle.score_value);
    setupdateScoreValueId(cycle.id);
    setId(cycle.id);
    setAnchorEl(null);
  };
  const updateScoreType = () => {
    const data = {
      updateScoreValueId,
      id,
      score_value,
    };
    props.updateScoreValue(data);
    setAnchorEl(null);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const deleteScoreValue = () => {
    const data = {
      deleteScoreValueId,
    };

    props.deleteScoreValue(data);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const localData = JSON.parse(localStorage.getItem(`Data${urlId}`) || "[]");

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (localData == "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [localData]);

  const [scoreTypeId, setscoreTypeId] = useState("");
  const [scoreValue, setScoreValue] = useState("");
  const [page] = useState(1);
  const [itemsPerPage] = useState(20);
  const [All] = useState(true);
  const [scoreName, setScoreName] = useState("");

  useEffect(() => {
    const data = {
      page,
      itemsPerPage,
      All,
    };
    props.getAllTraineess(data);
  }, []);

  useEffect(() => {
    props.getAllScoreTypes();
    props.getAllScoreValues();
  }, []);

  const saveData = () => {
    if (localStorage.getItem(`Data${urlId}`) == null) {
      localStorage.setItem(`Data${urlId}`, "[]");
    }

    var old_data = JSON.parse(localStorage.getItem(`Data${urlId}`) || "[]");

    var new_data = {
      name: scoreName,
      attr_id: urlId,
      score_id: scoreTypeId,
      score_value: scoreValue,
    };

    for (var i = 0; i < old_data.length; i++) {
      var oldData = old_data[i];
      if (oldData.score_id == scoreTypeId) {
        old_data.splice(i, 1);
      }
    }

    old_data!.push(new_data);
    localStorage.setItem(`Data${urlId}`, JSON.stringify(old_data));
    // toast.success("Done");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const dataValues = JSON.parse(localStorage.getItem(`Data${urlId}`) || "[]");

  const handleCreate = () => {
    props.createScoreValue();
    localStorage.removeItem(`Data${urlId}`);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const filteredTrainee = traineeDetail
    ?.filter((data: any) => {
      return data?._id == urlId;
    })
    .flat();
  const [allAttempted, setallAttempted] = useState(false);
  const [someAttempted, setsomeAttempted] = useState(false);
  const [noneAttempted, setnoneAttempted] = useState(false);

  useEffect(() => {
    setallAttempted(yuret.length == sortedDta.length);
    setsomeAttempted(yuret.length < sortedDta.length && yuret.length !== 0);
    setnoneAttempted(!(allAttempted && someAttempted));
  }, [yuret, sortedDta]);

  const displayNames = filteredTrainee[0]?.trainee_id;

  const agarwal = yuret?.map((values: any) => {
    return values.score_id.score_type;
  });
  const patto = sortedDta?.map((values: any) => {
    return values.score_type;
  });

  const myArray = patto
    ?.filter((el: any) => {
      return agarwal.indexOf(el) >= 0;
    })
    .flat();

  const toBeReturned = sortedDta.filter(
    (values: any) =>
      !myArray.some((items: any) => {
        return items === values.score_type;
      })
  );

  var dert: any;

  if (someAttempted) {
    dert = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveData();
        }}
        className="border border-[#333] border-1 bg-[#eaeaea] rounded-[5px] p-2 w-fit mx-auto pt-4 h-fit dark:bg-dark-bg "
      >
        <select
          name="scoreType"
          id="scoreType"
          value={scoreTypeId}
          className="border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] dark:bg-dark-tertiary dark:text-zinc-100 "
          onChange={(e) => {
            setscoreTypeId(e.target.value);
            const iffd = e.target.selectedOptions[0].text;
            setScoreName(iffd);
          }}
        >
          <option value="">Select</option>
          {toBeReturned?.map((values: any, idx: number) => (
            <option value={values.id} id={values.score_type} key={idx}>
              {values.score_type}
            </option>
          ))}
        </select>
        <input
          required
          type="text"
          placeholder="Enter the trainee's rank."
          className="block border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] mx-auto my-3 dark:bg-dark-tertiary dark:text-zinc-100"
          onChange={(e) => {
            setScoreValue(e.target.value);
          }}
        />
        <input
          type="submit"
          value="SAVE"
          className="text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] my-2 block mx-auto dark:bg-green dark:border"
        />
      </form>
    );
  } else {
    dert = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveData();
        }}
        className="border border-[#333] border-1 bg-[#eaeaea] rounded-[5px] p-2 w-fit mx-auto pt-4 h-fit dark:bg-dark-bg "
      >
        <select
          name="scoreType"
          id="scoreType"
          value={scoreTypeId}
          className="border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] dark:bg-dark-tertiary dark:text-zinc-100 "
          onChange={(e) => {
            setscoreTypeId(e.target.value);
            const iffd = e.target.selectedOptions[0].text;
            setScoreName(iffd);
          }}
        >
          <option value="" className="text-[red]">
            Select
          </option>
          {sortedDta?.map((values: any, idx: number) => (
            <option value={values.id} id={values.score_type} key={idx}>
              {values.score_type}
            </option>
          ))}
        </select>
        <input
          required
          type="text"
          placeholder="Enter the trainee's rank."
          className="block border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] mx-auto my-3 dark:bg-dark-tertiary dark:text-zinc-100"
          onChange={(e) => {
            setScoreValue(e.target.value);
          }}
        />
        <input
          type="submit"
          value="SAVE"
          className="text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] my-2 block mx-auto dark:bg-green dark:border"
        />
      </form>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex bg-[#F9F9FB] min-h-[100vh] dark:bg-dark-frame-bg ">
        <div className="min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0">
          <div className="flex md:block">
            <div className="w-[30vw] relative pl-10 md:pl-0 block md:w-[100%] ">
              <div className="block md:text-center md:mx-auto">
                <div>
                  <span className="text-[#1d1d1d] font-bold text-xl dark:text-zinc-100 ">
                    {displayNames?.firstName} {displayNames?.lastName}'s test
                    results.
                  </span>
                </div>
                <div>
                  <div className="mt-3">
                    <span className="dark:text-zinc-100 ">Total tests:</span>{" "}
                    <span className="text-[#1d1d1d] dark:text-zinc-100   font-bold ">
                      {sortedDta.length}
                    </span>
                  </div>
                  <div>
                    <span className="dark:text-zinc-100 ">
                      Rated/attempted tests:
                    </span>{" "}
                    <span className="text-[#1d1d1d] dark:text-zinc-100  font-bold">
                      {myArray.length}{" "}
                      <span className=" w-[80px] h-[100px] bg-[#c0e2e4] text-[#c0e2e4]">
                        atte
                      </span>
                    </span>
                  </div>
                  <div className="my-0">
                    <span className="dark:text-zinc-100 ">
                      Non-attempted tests:
                    </span>{" "}
                    <span className="text-[#1d1d1d] dark:text-zinc-100  font-bold ">
                      {sortedDta.length - myArray.length}{" "}
                      <span className=" w-[80px] h-[100px] bg-slate-200 text-slate-200">
                        atte
                      </span>
                    </span>
                  </div>
                </div>
              </div>{" "}
              <div className="w-fit block md:hidden">
                <table className="block mt-10 dark:text-zinc-100">
                  <thead className="border p-3">
                    <tr className="border p-3 dark:bg-dark-bg bg-[#eef1f1]">
                      <th className="border p-3">Nº</th>
                      <th className="border p-3">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDta?.map((values: any, i: number) => {
                      return (
                        <tr className="border p-3 bg-[#f9f9f9] " key={i}>
                          <td className="border p-3 dark:bg-dark-bg">
                            {i + 1}
                          </td>
                          {myArray.includes(values.score_type) ? (
                            <td className="border p-3 bg-[#c0e2e4] dark:text-primary">
                              {values.score_type}
                            </td>
                          ) : (
                            <td className="border p-3 bg-slate-200 dark:text-primary">
                              {values.score_type}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-[70vw] overflow-y-auto relative md:w-[100%]">
              {yuret.length !== sortedDta.length && (
                <div>
                  <h1 className="text-center underline font-bold text-[18px] dark:text-zinc-100">
                    Save new score for trainee applicant.
                  </h1>
                  <div
                    className="block mt-6 py-5 lg:flex"
                    style={{
                      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    }}
                  >
                    {dert}
                    {!isEmpty && (
                      <div
                        className="w-fit mx-auto bg-[#eef1f1] min-h-max p-5 mt-5"
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                      >
                        <table className="block mb-10">
                          <thead className="border p-3">
                            <tr className="border p-3 bg-[#173b3f] text-white">
                              <th className="border p-3">Nº</th>
                              <th className="border p-3">NAME</th>
                              <th className="border p-3">VALUE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataValues.map((values: any, i: number) => {
                              return (
                                <tr className="border p-3 bg-[#f9f9f9]" key={i}>
                                  <td className="border p-3">{i + 1}</td>
                                  <td className="border p-3">{values.name}</td>
                                  <td className="border p-3">
                                    {values.score_value}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <button
                          onClick={handleCreate}
                          className="text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mt-5 block mx-auto"
                        >
                          CREATE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}{" "}
              <div
                className="mt-10"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "fit-content",
                  }}
                >
                  {yuret?.map((values: any, idx: number) => {
                    return (
                      <div
                        className="w-[250px]  h-[100px]  rounded-[7px] pt-3 text-left text-[#173b3f] bg-[#eef1f1] m-2 relative dark:bg-dark-bg "
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                      >
                        <div className="mt-[17px] text-center dark:text-zinc-100 block">
                          <div
                            className="font-bold  width-[200px] ml-2"
                            style={{
                              wordWrap: "break-word",
                              overflowX: "auto",
                              whiteSpace: "nowrap",
                              width: "200px",
                            }}
                          >
                            {values.score_id.score_type}:
                          </div>{" "}
                          <div>{values.score_value}</div>
                        </div>
                        <div className="absolute m-0 top-[50%] right-2 -translate-y-2/4  -translate-x-2/4">
                          <BsIcons.BsThreeDotsVertical
                            onClick={(event) => {
                              setAnchorEl(
                                event.currentTarget as unknown as HTMLElement
                              );
                              event.preventDefault();
                              setActiveCycle(idx);
                              setdeleteValueTypeId(values.id);
                            }}
                            className="dark:text-zinc-100 text-[20px]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
                onClick={() => {
                  handleOpenUpdateModal();
                }}
              >
                Update
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteScoreValue();
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
                  className="border border-[#333] border-1 bg-[#eaeaea] rounded-[5px] px-2 w-fit mx-auto dark:bg-dark-frame-bg "
                >
                  <hr style={{ marginBottom: "40px" }} />
                  <input
                    required
                    type="text"
                    name="score_type"
                    value={score_value}
                    placeholder="Enter new score type name"
                    onChange={(e) => {
                      e.preventDefault();
                      setscore_value(e.target.value);
                    }}
                    className="block border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] mx-auto mb-3"
                  />
                  <div className="flex flex-wrap w-[300px] m-auto">
                    <button className="block text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mb-5 mx-auto">
                      SAVE
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
const mapState = (state: any) => ({
  scoreTypes: state.scoreTypes,
  scoreType: state.scoreType,
  scoreValues: state.scoreValues,
  trainee: state.trainee,
});

export default connect(mapState, {
  getAllScoreTypes,
  getAllScoreValues,
  getOneScoreType,
  createScoreValue,
  getAllTraineess,
  updateScoreValue,
  deleteScoreValue,
})(createScoreType);
//bg-[#342677]

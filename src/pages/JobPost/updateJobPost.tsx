import React, { useEffect, useState } from 'react';
import * as icons from 'react-icons/ai';
import { updateJobPostAction } from '../../redux/actions/updateJobPostActions';
import { fetchSingleJobPost } from '../../redux/actions/fetchSingleJobPostAction';
import { toast } from 'react-toastify';
import NavBar from '../../components/sidebar/navHeader';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const UpdateJobPost = (props: any) => {
  const params = useParams();
  const dispacth = useAppDispatch();
  const [ID, setId] = useState(params.programId);
  const [entries, setEntries] = useState<Array<string>>([]);
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    program: [''],
    cycle: [''],
    cohort: [''],
    description: '',
  });

  const { fetchSingleJobPostStates, updateJobPostStates } = props;
  const jobPostData = fetchSingleJobPostStates.data;

  const addEntry = (entry: string) => {
    let itemFound = entries.find((item) => item === entry);
    if (!itemFound && entry !== '') {
      setEntries((prevState) => [...prevState, entry]);
    }
    setCurrentEntry('');
  };

  const removeEntry = (entry: string) => {
    setEntries(entries.filter((item) => item !== entry));
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();

    setCurrentEntry((prevState) =>
      e.target.name === 'entries' ? e.target.value : prevState,
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    console.log(formData);
    if (formData.description === '') {
      toast.error('Description is required');
    } else {
      try {
        const submitData = {
          _id: ID,
          title: formData.title,
          program: entries,
          cycle: entries,
          cohort: entries,
          description: formData.description,
        };
        console.log(submitData);
        props.updateJobPostAction(submitData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    dispacth(fetchSingleJobPost(ID));
  }, [ID]);

  useEffect(() => {
    if (fetchSingleJobPostStates.data) {
      setFormData(jobPostData);
      setEntries(jobPostData.program);
      setEntries(jobPostData.requirements);
      setEntries(jobPostData.requirements);
    }
  }, [fetchSingleJobPostStates.serverResponded]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col overflow-x-hidden bg-white dark:bg-dark-tertiary relative mt-10 w-[100%] py-3 min-h-[100vh]">
        <div className="block text-center text-sm font-bold text-gray-600 relative lg:left-[8rem] dark:text-white text-base lg:max-w-3xl sm:w-[100%] p-4 lg:px-4 m-4 mx-auto text-[24px]">
          <h1 className="p-2">Update Program</h1>
        </div>
        <form
          className="flex bg-white w-[90%] md_:w-full dark:bg-dark-frame-bg md_:p-5 lg:max-w-4xl relative lg:left-[8rem] dark:text-white mb-4 text-gray-600 shadow rounded mx-auto"
          onSubmit={handleSubmit}
        >
          {fetchSingleJobPostStates.data === null ? (
            <p className="text-center p-20">Loading data please wait.....</p>
          ) : (
            <div className="flex flex-col justify-center">
              <div className="flex flex-col md_:flex-row justify-center">
                <div className="flex flex-col">
                  <div className="block lg:w-96 sm:w-[100%] px-2 pt-3 pb-4 mr-2 ml-2">
                    <label className="block text-sm font-bold mb-2">
                      Job Title
                    </label>
                    <input
                      className="dark:bg-dark-tertiary shadow appearance-none rounded w-[90%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      defaultValue={jobPostData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      placeholder="Job title"
                      required
                    />
                  </div>
                  <div className="block lg:w-96 sm:w-[100%] px-2 pt-3 pb-4 mr-2 ml-2">
                    <label className="block text-sm font-bold mb-2">
                      Program
                    </label>
                    <div className="flex flex-row items-center space-x-3 w-[90%]">
                      <input
                        type="text"
                        name="entries"
                        className=" dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white py-2 px-5 rounded outline-none font-sans text-xs w-[90%]"
                        placeholder={'Program'}
                        value={currentEntry}
                        onChange={handleInputChange}
                      />

                      <button
                        type="button"
                        className="flex items-center justify-center bg-white text-dark-frame-bg transition-colors border border-black dark:border-transparent hover:bg-dark-frame-bg hover:text-white hover:border hover:border-white font-extrabold px-2 rounded"
                        onClick={() => addEntry(currentEntry)}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col items-center space-y-2 overflow-auto">
                      <div className="flex flex-col w-full p-3 max-h-14 md_:max-h-96">
                        {fetchSingleJobPostStates.serverResponded &&
                          entries.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-row items-center space-x-1"
                            >
                              <icons.AiOutlineArrowRight
                                size={13}
                                className="text-black-text dark:text-white"
                              />
                              <label className="text-black-text dark:text-white text-sm">
                                {item}
                              </label>
                              <button
                                type="button"
                                className="flex items-center justify-center bg-white text-dark-frame-bg rounded transition-colors border border-black dark:border-transparent hover:bg-dark-frame-bg hover:text-white hover:border hover:border-white font-extrabold px-2 h-4"
                                onClick={() => removeEntry(item)}
                              >
                                -
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className="block w-full px-2 pt-3 pb-4 mr-2 ml-2">
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        cycle
                      </label>
                      <input
                        className=" dark:bg-dark-tertiary shadow appearance-none w-[90%] rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="cycle"
                        type="text"
                        defaultValue={jobPostData.cycle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cycle: e.target.value,
                          })
                        }
                        placeholder="Cycle"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Cohort
                      </label>
                      <input
                        className=" dark:bg-dark-tertiary shadow appearance-none w-[90%] rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="cohort"
                        type="text"
                        defaultValue={jobPostData.cohort}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cohort: e.target.value,
                          })
                        }
                        placeholder="Cohort"
                        required
                      />
                    </div>
                  </div> */}
                </div>
                <div className="flex flex-col">
                  <div className="block w-96 px-2 pt-3 pb-4 mr-2 ml-2">
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        className=" dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white resize-none h-36 py-2 px-5 rounded outline-none font-sans text-xs w-[90%]"
                        placeholder={'Program Description'}
                        defaultValue={jobPostData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full gap-3 ml-4 mb-4">
                <button className="dark:bg-[#56C870] flex bg-gray-600 rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                  {updateJobPostStates.loading ? 'Updating...' : 'Update'}
                </button>
                <Link
                  to="/jobs"
                  className="dark:bg-[#56C870] flex bg-gray-600 rounded-md py-2 px-4 text-white font-medium cursor-pointer"
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
  fetchSingleJobPostStates: state.fetchSingleJobPost,
  updateJobPostStates: state.updateJobPost,
});

export default connect(mapState, {
  updateJobPostAction,
  fetchSingleJobPost,
})(UpdateJobPost);

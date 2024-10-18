import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { updateJobPostAction } from '../../redux/actions/updateJobPostAction';
import { fetchSingleJobPost } from '../../redux/actions/fetchSingleJobPostAction';
import { getAllPrograms } from '../../redux/actions/programsActions';
import { getAllCycles } from '../../redux/actions/cyclesActions';
import { getAllCohorts } from '../../redux/actions/cohortActions';
import { RootState, FormData} from './jobTypes';

type Props = {
  fetchSingleJobPostStates: RootState['fetchSingleJobPost'];
  updateJobPostStates: RootState['updateProgram'];
  programs: RootState['programs'];
  cycles: RootState['cycles'];
  cohorts: RootState['cohorts'];
  updateJobPostAction: (data: any) => Promise<void>;
  fetchSingleJobPost: (id: string) => Promise<void>;
  getAllPrograms: () => void;
  getAllCycles: () => void;
  getAllCohorts: () => void;
};

const UpdateJobPost = ({
  fetchSingleJobPostStates,
  updateJobPostStates,
  programs,
  cycles,
  cohorts,
  updateJobPostAction,
  fetchSingleJobPost,
  getAllPrograms,
  getAllCycles,
  getAllCohorts,
}: Props) => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    program: '',
    cycle: '',
    cohort: '',
    description: '',
    published: false
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (programId) {
          await fetchSingleJobPost(programId);
          await Promise.all([getAllPrograms(), getAllCycles(), getAllCohorts()]);
        }
      } catch (error) {
        toast.error('Failed to load data');
      }
    };
    loadData();
  }, [programId]);

  useEffect(() => {
    if (fetchSingleJobPostStates.data) {
      const { title, program, cycle, cohort, description, published } = fetchSingleJobPostStates.data;
      setFormData({
        title,
        program: program._id || '',
        cycle: cycle.id || '',
        cohort: cohort.id || '',
        description,
        published
      });
    }
  }, [fetchSingleJobPostStates.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, published: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, program, cycle, cohort, description } = formData;
    
    if (!title || !program || !cycle || !cohort || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await updateJobPostAction({ id: programId, ...formData });
      toast.success('Job post updated successfully');
      navigate('/admin/job-post');
    } catch (error) {
      toast.error('Failed to update job post');
    }
  };

  if (fetchSingleJobPostStates.loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-tertiary p-10">
      <div className="w-[500px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-gray-600 dark:text-white mb-8">
          Update Job Post
        </h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-frame-bg rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Program</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary text-white"
              >
                <option value="">Select Program</option>
                {programs.data?.map((item) => (
                  <option key={item._id} value={item._id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Cycle</label>
              <select
                name="cycle"
                value={formData.cycle}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary text-white"
              >
                <option value="">Select Cycle</option>
                {cycles.data?.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Cohort</label>
              <select
                name="cohort"
                value={formData.cohort}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary text-white"
              >
                <option value="">Select Cohort</option>
                {cohorts.data?.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2 text-white">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary h-32 resize-none text-white"
              />
            </div>
            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-white">Publish Job Post</span>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={updateJobPostStates.loading}
              className="dark:bg-[#56C870] hover:bg-[#56C870] bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {updateJobPostStates.loading ? 'Updating...' : 'Update'}
            </button>
            <Link
              to="/admin/job-post"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    fetchSingleJobPostStates: state.fetchSingleJobPost,
    updateJobPostStates: state.updateProgram,
    programs: state.programs,
    cycles: state.cycles,
    cohorts: state.cohorts,
  }),
  {
    updateJobPostAction,
    fetchSingleJobPost,
    getAllPrograms,
    getAllCycles,
    getAllCohorts,
  }
)(UpdateJobPost);
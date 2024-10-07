import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { updateJobPostAction } from '../../redux/actions/updateJobPostAction';
import { fetchSingleJobPost } from '../../redux/actions/fetchSingleJobPostAction';
import { getAllPrograms } from "../../redux/actions/programsActions";
import { getAllCycles } from "../../redux/actions/cyclesActions";
import { getAllCohorts } from "../../redux/actions/cohortActions";

interface Program {
  _id: string;
  title: string;
}

interface Cycle {
  id: string;
  name: string;
}

interface Cohort {
  id: string;
  title: string;
}

interface JobPost {
  _id: string;
  title: string;
  program: Program;
  cycle: Cycle
  cohort: Cohort;
  description: string;
  published: boolean;
}

interface FormData {
  title: string;
  program: string;  // Stores program title
  cycle: string;    // Stores cycle name
  cohort: string;   // Stores cohort title
  description: string;
  published: boolean;
}

interface RootState {
  fetchSingleJobPost: {
    data: JobPost | null;
    loading: boolean;
    serverResponded: boolean;
  };
  updateProgram: {
    loading: boolean;
    error: string | null;
  };
  programs: {
    data: Program[];
  };
  cycles: {
    data: Cycle[];
  };
  cohorts: {
    data: Cohort[];
  };
}

interface Props {
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
}

const UpdateJobPost: React.FC<Props> = ({
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
}): JSX.Element => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    program: '',
    cycle: '',
    cohort: '',
    description: '',
    published: false,
  });

  // Fetch job post data
  useEffect(() => {
    if (programId) {
      fetchSingleJobPost(programId).catch((error) => {
        console.error('Error fetching job post:', error);
        toast.error('Failed to fetch job post details');
      });
    }
  }, [programId, fetchSingleJobPost]);

  // Update form data when job post data is received
  useEffect(() => {
    if (fetchSingleJobPostStates.data) {
      setFormData({
        title: fetchSingleJobPostStates.data.title,
        program: fetchSingleJobPostStates.data.program._id,
        cycle: fetchSingleJobPostStates.data.cycle.id,  
        cohort: fetchSingleJobPostStates.data.cohort.id, 
        description: fetchSingleJobPostStates.data.description,
        published: fetchSingleJobPostStates.data.published,
      });
    }
    
  }, [fetchSingleJobPostStates.data]);

  // Fetch all necessary data
  useEffect(() => {
    getAllPrograms();
    getAllCycles();
    getAllCohorts();
  }, [getAllPrograms, getAllCycles, getAllCohorts]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    console.log(fetchSingleJobPostStates.data);
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!formData.program) {
      toast.error('Program is required');
      return false;
    }
    if (!formData.cycle) {
      toast.error('Cycle is required');
      return false;
    }
    if (!formData.cohort) {
      toast.error('Cohort is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submitData = {
        id: programId,
        ...formData,
      };
      
      await updateJobPostAction(submitData);
      toast.success('Job post updated successfully');
    
    } catch (err) {
      toast.error('Failed to update job post');
      console.error(err);
    }
  };

  if (fetchSingleJobPostStates.loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-tertiary p-8">
      <div className="w-[500px] mx-auto  px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-gray-600 dark:text-white mb-8">
          Update Job Post
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-frame-bg rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-bold mb-2">Job Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary"
                required
              />
            </div>

            <div>
              <label htmlFor="program" className="block text-sm font-bold mb-2">Program</label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary"
              
              >
                <option value="">Select Program</option>
                {programs.data?.map((program) => (
                  <option key={program._id} value={program._id}>
                    {program.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cycle" className="block text-sm font-bold mb-2">Cycle</label>
              <select
                id="cycle"
                name="cycle"
                value={formData.cycle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary"
                required
              >
                <option value="">Select Cycle</option>
                {cycles.data?.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cohort" className="block text-sm font-bold mb-2">Cohort</label>
              <select
                id="cohort"
                name="cohort"
                value={formData.cohort}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary"
                required
              >
                <option value="">Select Cohort</option>
                {cohorts.data?.map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-bold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-dark-tertiary h-32 resize-none"
                required
              />
            </div>
          </div>

              <div className="md:col-span-2">
      <label htmlFor="published" className="block text-sm font-bold mb-2">Publish Job Post</label>
      <input
        id="published"
        type="checkbox"
        name="published"
        checked={formData.published}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          published: e.target.checked,
        }))}
        className="mr-2 leading-tight"
      />
      <span className="text-sm">{formData.published ? 'Published' : 'Unpublished'}</span>
    </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={updateJobPostStates.loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {updateJobPostStates.loading ? 'Updating...' : 'Update'}
            </button>
            <Link
              to="/programs"
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

const mapStateToProps = (state: RootState) => ({
  fetchSingleJobPostStates: state.fetchSingleJobPost,
  updateJobPostStates: state.updateProgram,
  programs: state.programs,
  cycles: state.cycles,
  cohorts: state.cohorts,
});

const mapDispatchToProps = {
  updateJobPostAction,
  fetchSingleJobPost,
  getAllPrograms,
  getAllCycles,
  getAllCohorts,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateJobPost);
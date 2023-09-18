import React, { useState } from 'react';
import * as icons from 'react-icons/ai';
import axios from 'axios'; 

const ResponseForm = () => {
  const [formData, setFormData] = useState({
    link: '',
    title: '',
    category: '',
    createApplication: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Define the GraphQL mutation
    const graphqlQuery = `
    mutation CreateApplication(
      $link: String!
      $title: String!
      $category: String!
      $description: String!
    ) {
      createApplication(
        link: $link
        title: $title
        category: $category
        description: $description
      ) {
        id
        link
        title
        category
        description
      }
    }
  `;
  const variables = {
    link: formData.link,
    title: formData.title,
    category: formData.category,
    description: formData.description,
  };


    try {
      const response = await axios.post('http://localhost:3001', {
        query: graphqlQuery,
        variables,
      });

      if (response.data.data && response.data.data.createApplication) {
        console.log('Response created successfully');
        setFormData({
          link: '',
          title: '',
          category: '',
          createApplication: '',
          description: '',
        });
      } else {
        setError('Error creating response: ' + response.data.errors[0].message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className='max-w-lg mx-auto'>
      <form onSubmit={handleSubmit} className='bg-gray p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-6'>Response of Job Post</h2>
        <div className='mb-4'>
          <label className='block text-white-700 text-sm font-bold mb-2' htmlFor='title'>
            Title
          </label>
          <input
            className='w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white-700 text-sm font-bold mb-2' htmlFor='category'>
            Category
          </label>
          <select
            className='w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
            id='category'
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select Category</option>
            <option value='category1'>ATLP</option>
            <option value='category2'>Frontend positions</option>
            <option value='category3'>Full-stack positions</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-white-700 text-sm font-bold mb-2' htmlFor='link'>
            Google Form URL
          </label>
          <input
            className='w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
            type='text'
            id='link'
            name='link'
            value={formData.link}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white-700 text-sm font-bold mb-2' htmlFor='description'>
            Description
          </label>
          <textarea
            className='w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            // rows='4'
            required
          ></textarea>
        </div>
        <button
            className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer'>
            <icons.AiOutlinePlus className='mt-1 mr-1 font-bold' />Submit
          </button>
      </form>
    </div>
  );
};

export default ResponseForm;

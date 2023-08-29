// Implement Applicant Form Page
import React, { useState } from 'react';
import ButtonComponent from '../../components/application/candidate-form/Button';
import TextInput from '../../components/application/candidate-form/TextInput';
import RadioInput from '../../components/application/candidate-form/RadioInput';
import DropDownInput from '../../components/application/candidate-form/DropDownInput';
import TextareaInput from '../../components/application/candidate-form/TextareaInput';

const ApplicantForm = (): JSX.Element => {
  const [gender, setGender] = useState('');
  const [study, setStudy] = useState('');
  const [education, setEducation] = useState('');
  return (
    <div className='bg-[#1f2a37] pt-10'>
      <h2 className='text-xl text-center font-bold tracking-tight text-white sm:text-4xl'>
        Fill the form
      </h2>
      <div className='py-6 '>
        <div className='mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8'>
          <main className='lg:col-span-9 xl:col-span-6 mr-8'>
            {/* Your content */}
            <TextInput
              label='First Name'
              name='firstName'
              type='text'
              placeholder='First Name'
              value=''
              onChange={() => console.log('First Name')}
              error=''
            />

            <TextInput
              label='Email'
              name='email'
              type='email'
              placeholder='Email'
              value=''
              onChange={() => console.log('Email')}
              error=''
            />
            <div>
              <p className=' text-white text-xl'>Are you currently studying</p>
              <RadioInput
                label='Yes'
                name='Yes'
                value={study}
                onChange={(e) => setStudy(e.target.value)}
                checked={true}
              />
              <RadioInput
                label='No'
                name='No'
                value={study}
                onChange={(e) => setStudy(e.target.value)}
                checked={study === 'No'}
              />
            </div>

            <div>
              <p className=' text-white text-xl'>
                What's your highest level of education?
              </p>
              <RadioInput
                label='High School'
                name='High School'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                // checked={education === 'High School'}
                checked={true}
              />

              <RadioInput
                label='University'
                name='University'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                checked={education === 'University'}
              />
              <RadioInput
                label='Masters'
                name='Masters'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                checked={education === 'Masters'}
              />
            </div>

            <TextInput
              label='Nationality'
              name='Nationality'
              type='text'
              placeholder='Nationality'
              value=''
              onChange={() => console.log('Nationality')}
              error=''
            />
            <TextInput
              label='Province'
              name='Province'
              type='text'
              placeholder='Province'
              value=''
              onChange={() => console.log('Province')}
              error=''
            />
            <TextInput
              label='District'
              name='district'
              type='text'
              placeholder='District'
              value=''
              onChange={() => console.log('District')}
              error=''
            />
          </main>

          <aside className='block ml-8 lg:col-span-9 xl:col-span-6'>
            <div className='sticky top-6 space-y-4'>
              {/* Your content */}
              <TextInput
                label='Last Name'
                name='lastName'
                type='text'
                placeholder='Last Name'
                value=''
                onChange={() => console.log('Last Name')}
                error=''
              />
              <TextInput
                label='Date of Birth'
                name='dateOfBirth'
                type='date'
                placeholder='Date of Birth'
                value=''
                onChange={() => console.log('Date of Birth')}
                error=''
              />

              <DropDownInput
                label='If you are a student, what is  your current education level?'
                name='Current Education Level'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                error=''
              />
              <TextareaInput
                label='What was your discipline? (If applicable)                '
                name='Your Discipline'
                value=''
                placeholder='Describe your organization'
                onChange={() => console.log('Describe your organization')}
                error=''
              />
              <div>
                <p className=' text-white text-xl'>Gender</p>
                <RadioInput
                  label='Male'
                  name='male'
                  value='male'
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'male'}
                />
                <RadioInput
                  label='Female'
                  name='female'
                  value='female'
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'female'}
                />
              </div>

              <TextInput
                label='Sector'
                name='Sector'
                type='text'
                placeholder='Sector'
                value=''
                onChange={() => console.log('Sector')}
                error=''
              />

              <div className='text-center pt-4'>
                <ButtonComponent
                  text='Save and next'
                  onClick={() => console.log('Save and next')}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ApplicantForm;

// Implement Applicant Form Page
import React, { useState } from 'react';
import ButtonComponent from '../../components/application/candidate-form/Button';
import TextInput from '../../components/application/candidate-form/TextInput';
import RadioInput from '../../components/application/candidate-form/RadioInput';
import DropDownInput from '../../components/application/candidate-form/DropDownInput';
import TextareaInput from '../../components/application/candidate-form/TextareaInput';

const ApplicantFormTwo = (): JSX.Element => {
  const [Laptop, setLaptop] = useState('');
  const [Unpaid, setUnpaid] = useState('');
  const [study, setStudy] = useState('');
  const [education, setEducation] = useState('');
  return (
    <div className='bg-[#1f2a37] w-full'>
      <div className='py-6 '>
        <div className='mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8'>
          <main className='lg:col-span-9 xl:col-span-6 mr-8'>
            {/* Your content */}
            

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
              <p className=' text-white text-xl'>Are you currently employed?</p>
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
                Did you participate in (and complete) any of the Andela Rwanda
                affiliated programs below?
              </p>
              <RadioInput
                label='Web Development Crash Course'
                name='Web Development Crash Course'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                // checked={education === 'Web Development Crash Course'}
                checked={true}
              />

              <RadioInput
                label='Andela Learning Community (ALC)'
                name='Andela Learning Community (ALC)'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                checked={education === 'Andela Learning Community (ALC)'}
              />
              <RadioInput
                label='Other'
                name='Other'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                checked={education === 'Other'}
              />
            </div>

            <div>
              <p className=' text-white text-xl'>
                How did you find the post for this application?
              </p>
              <RadioInput
                label='Andela Twitter Handle'
                name='Andela Twitter Handle'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                // checked={education === 'Andela Twitter Handle'}
                checked={true}
              />

              <RadioInput
                label='Got an email from Andela'
                name='Got an email from Andela'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                checked={education === 'Got an email from Andela'}
              />
              <RadioInput
                label='Referred by a friend'
                name='Referred by a friend'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                checked={education === 'Referred by a friend'}
              />
              <RadioInput
                label='Other'
                name='Other'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                checked={education === 'Other'}
              />
            </div>
          </main>

          <aside className='block ml-8 lg:col-span-9 xl:col-span-6'>
            <div className='sticky top-6 space-y-4'>
              {/* Your content */}

              <div>
                <p className=' text-white text-xl'>
                  Do you understand that the Andela Technical Leadership Program
                  is an unpaid training program?
                </p>
                <RadioInput
                  label='Yes'
                  name='Yes'
                  value={Unpaid}
                  onChange={(e) => setUnpaid(e.target.value)}
                  //   checked={Unpaid === 'Yes'}
                  checked={true}
                />
                <RadioInput
                  label='No'
                  name='No'
                  value={Unpaid}
                  onChange={(e) => setUnpaid(e.target.value)}
                  checked={Unpaid === 'No'}
                />
              </div>

              <div>
                <p className=' text-white text-xl'>
                  If selected, do you have a laptop that you can use in the
                  program?
                </p>
                <RadioInput
                  label='Yes'
                  name='Yes'
                  value={Laptop}
                  onChange={(e) => setLaptop(e.target.value)}
                  //   checked={Laptop === 'Yes'}
                  checked={true}
                />
                <RadioInput
                  label='No'
                  name='No'
                  value={Laptop}
                  onChange={(e) => setLaptop(e.target.value)}
                  checked={Laptop === 'No'}
                />
              </div>

              <div className='text-center pt-4'>
                <ButtonComponent
                  text='Save'
                  onClick={() => console.log('Save')}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ApplicantFormTwo;

import React from 'react';

const genderMethods = [
  { id: 'male', title: 'male' },
  { id: 'female', title: 'female' },
  { id: 'push', title: 'Push gender' },
];

export default function RadioInputGender(): JSX.Element {
  return (
    <div>
      <label className='text-base font-medium text-gray-900'>Gender</label>
      
      <fieldset className='mt-4'>
        <legend className='sr-only'>gender type</legend>
        <div className='space-y-4'>
          {genderMethods.map((genderMethod) => (
            <div key={genderMethod.id} className='flex items-center'>
              <input
                id={genderMethod.id}
                name='gender-method'
                type='gender'
                defaultChecked={genderMethod.id === 'male'}
                className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
              />
              <label
                htmlFor={genderMethod.id}
                className='ml-3 block text-sm font-medium text-gray-700'>
                {genderMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

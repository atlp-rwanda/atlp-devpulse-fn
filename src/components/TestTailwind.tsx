import React from 'react'

const TestTailwind = () => {
  return (
    <div>
      <nav className="w-full font-serif flex justify-center pt-10 mt-40">
        <ul className="w-2/3 flex justify-between bg-blue-600 text-3xl p-20 mb-30 rounded-xl">
          <li className="bg-green-300 text-red-600 font-bold p-3 rounded-md">
            Home
          </li>
          <li className="bg-green-600 p-3 rounded-md">About</li>
          <li className="bg-green-900 p-3 rounded-md">Signup</li>
          <li className="bg-green-100 p-3 rounded-md">Login</li>
        </ul>
      </nav>
    </div>
  );
}

export default TestTailwind;

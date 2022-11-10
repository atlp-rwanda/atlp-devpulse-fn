import React, {useState } from 'react';


interface ButtonProps {
    children: any,
    
    onClick?: ()=>void;
}

const Button = ({children}:ButtonProps) => {
    return ( 
        <div className="flex items-left px-7 lg:px-64 pt-24">
        <div className="flex px-5 py-2 pb-8 w-fit">
          <button  className="flex bg-primary rounded-md py-2 px-4 text-white font-medium cursor-pointer">
          {children}
          </button>
        </div>
      </div>
     );
}
 
export default Button;


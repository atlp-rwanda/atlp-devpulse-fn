import React, { Children } from 'react'
import { useState } from 'react'

const readMore = ({children }: any) => {
    const [isReadMoreShown, setReadMoreShown] =useState(false)

  return (
    <div className='red-more-read-less'>
        {isReadMoreShown ? children : Children}
        <button>Read More</button>
      
    </div>
  )
}

export default readMore

import React from 'react'
import Header from "../../components/home/Header"
import Footer from "../../components/home/Footer"
import SingleBlogView from '../Blogs/singleBlog'
const SingleBlogPage = () => {
  return (
    <div>
      <div className='mb-7'>
      <Header/>
     </div>
      <SingleBlogView/>
      <Footer/>
    </div>
  )
}

export default SingleBlogPage

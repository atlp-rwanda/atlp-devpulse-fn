import axios from "./axiosconfig";
import { createBlog, updateBlog, deleteBlog } from "../actiontypes/blogTypes";
import { toast } from "react-toastify";
import creator from "./creator";
import {
  FETCH_BLOG_RELATED_ARTICLE_FAIL,
  FETCH_BLOG_RELATED_ARTICLE_LOADING,
  FETCH_BLOG_RELATED_ARTICLE_SUCCESS,
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_LOADING,
  FETCH_BLOGS_SUCCESS,
  FETCH_SINGLE_BLOG_FAIL,
  FETCH_SINGLE_BLOG_LOADING,
  FETCH_SINGLE_BLOG_SUCCESS,
  FETCH_USER_BLOGS_FAIL,
  FETCH_USER_BLOGS_LOADING,
  FETCH_USER_BLOGS_SUCCESS,
} from "../index";

// Fetch all blogs
export const getAllBlogs = (tag?: string) => async (dispatch: any) => {
  dispatch({
    type: FETCH_BLOGS_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `query GetAllBlogs($tag: String) {
        getAllBlogs(tag: $tag) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            email
            firstname
            lastname
          }
          tags
          created_at
          updated_at
        }
      }`,
      variables: { tag },
    });
    const blogsData = response.data.data.getAllBlogs;
    dispatch(creator(FETCH_BLOGS_SUCCESS, blogsData));
  } catch (err: any) {
    dispatch(creator(FETCH_BLOGS_FAIL, err));
    dispatch(creator(FETCH_BLOGS_FAIL, err));
    toast.error(err.message);
  }
};

export const getBlogsByAuthor = (authorId: string) => async (dispatch: any) => {
  dispatch({
    type: FETCH_USER_BLOGS_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `query($authorId: ID!) {
        getBlogsByAuthor(authorId: $authorId) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            email
            firstname
            lastname
          }
          tags
          created_at
          updated_at
        }
      }`,
      variables: { authorId },
    });
    const blogsData = response.data.data.getBlogsByAuthor;
    dispatch(creator(FETCH_USER_BLOGS_SUCCESS, blogsData));
  } catch (err: any) {
    dispatch(creator(FETCH_USER_BLOGS_FAIL, err));
    toast.error(err.message);
  }
};

// Fetch a single blog by ID
export const getBlogById = (id: string) => async (dispatch: any) => {
  dispatch({
    type: FETCH_SINGLE_BLOG_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `query GetBlogById($id: ID!) {
        getBlogById(id: $id) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
            likes{
              id
            }
            replies{
             id
            }
          }
          isHidden
          author {
            id
            email
            firstname
            lastname
            createdAt
          }
          tags
          created_at
          updated_at
        }
      }`,
      variables: { id },
    });
    const blogData = response.data.data.getBlogById;
    dispatch(creator(FETCH_SINGLE_BLOG_SUCCESS, blogData));
  } catch (err: any) {
    dispatch({
      type: FETCH_SINGLE_BLOG_FAIL,
      error: err.message,
    });
    toast.error(err.message);
  }
};

// Create a new blog
export const createBlogAction = (blogFields: any) => async (dispatch: any) => {
  dispatch({
    type: createBlog.CREATE_BLOG_LOADING,
  });
  try {
    const response = await axios.post("/", {
      query: `
        mutation CreateBlog($blogFields: BlogInput!) {
         createBlog(blogFields: $blogFields) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            firstname
            lastname
            email
            createdAt
          }
          tags
          created_at
          updated_at
        }
       }
      `, 
      variables: {
        blogFields: {
           title: blogFields.title,
           content: blogFields.content,
          coverImage: blogFields.coverImage,
          author: blogFields.author,
          images: blogFields.images!,
          tags: blogFields.tags!,
        },
      },
    });
    dispatch({
      type: createBlog.CREATE_BLOG_SUCCESS,
      data: response.data.data.createBlog,
    }),
      toast.success("Blog created successfully!");
  } catch (err: any) {
    dispatch({
      type: createBlog.CREATE_BLOG_FAIL,
      error: err.message,
    });
  }
};

// Update an existing blog
export const updateBlogAction =
  (id: string, updateFields: any) => async (dispatch: any) => {
    dispatch({
      type: updateBlog.UPDATE_BLOG_LOADING,
    });

    try {
      const response = await axios.post("/", {
        query: `mutation UpdateBlog($id: ID!, $updateFields: BlogInput) {
        updateBlog(id: $id, ...$updateFields) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            firstname
            lastname
            email
            createdAt
          }
          tags
          created_at
          updated_at
        }
      }`,
        variables: { id, ...updateFields },
      });

      dispatch({
        type: updateBlog.UPDATE_BLOG_SUCCESS,
        data: response.data.data.updateBlog,
      });
      toast.success("Blog updated successfully!");
    } catch (err: any) {
      dispatch({
        type: updateBlog.UPDATE_BLOG_FAIL,
        error: err.message,
      });
      toast.error(err.message);
    }
  };

// Delete a blog
export const deleteBlogAction = (id: string) => async (dispatch: any) => {
  dispatch({
    type: deleteBlog.DELETE_BLOG_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `mutation DeleteBlog($id: ID!) {
        deleteBlog(id: $id)
      }`,
      variables: { id },
    });

    dispatch({
      type: deleteBlog.DELETE_BLOG_SUCCESS,
      payload: response.data, // Add relevant payload if needed
    });

    // Return a structured object so that the `result.type` check works
    return { type: deleteBlog.DELETE_BLOG_SUCCESS, payload: response.data };
  } catch (error: any) {
    dispatch({
      type: deleteBlog.DELETE_BLOG_FAIL,
      payload: error.message,
    });

    // Return a structured object with the failure type
    return { type: deleteBlog.DELETE_BLOG_FAIL, error: error.message };
  }
};



// Fetch related articles by blog ID
export const getBlogRelatedArticles = (blogId: string) => async (dispatch: any) => {
  dispatch({
    type:  FETCH_BLOG_RELATED_ARTICLE_LOADING,
  });

  try {
    const response = await axios.post("/", {
     query: `query blogRelatedArticles($blogId: String!) {
        blogRelatedArticles(blogId: $blogId) {
          title
          url
          source
          description
          image
          publishedAt
        }
      }`,
      variables: { blogId },
    });
 
    const relatedArticles = response.data.data.blogRelatedArticles;
    dispatch({
      type:  FETCH_BLOG_RELATED_ARTICLE_SUCCESS,
      payload: relatedArticles,
    });
  } catch (err: any) {
      dispatch({
      type:  FETCH_BLOG_RELATED_ARTICLE_FAIL,
      error: err.message,
    });
    toast.error(err.message);
  }
};

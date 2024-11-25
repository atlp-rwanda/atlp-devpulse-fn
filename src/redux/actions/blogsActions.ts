import axios from "./axiosconfig";
import { toast } from "react-toastify";

export interface Author {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}
export interface Blog {
  comments: number;
  likes: number;
  id: string;
  title: string;
  content: string;
  coverImage: string;
  images?: string[];
  isHidden?: boolean;
  author : Author;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export const fetchAllBlogs = async (tag?: string): Promise<Blog[]> => {
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
          query GetAllBlogs($tag: String) {
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
          }
        `,
        variables: { tag: tag || undefined },
      },
    });

    if (response.data.errors) {
      console.error("GraphQL errors:", JSON.stringify(response.data.errors, null, 2));
      toast.error("Error fetching blogs");
      return [];
    }

    const blogs = (response.data.data.getAllBlogs as Blog[]).filter(
      (blog) => blog.author !== null
    );

    console.log("Fetched blogs:", blogs); 
    return blogs;
  } catch (error: any) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    toast.error("Error connecting to the server");
    return [];
  }
};

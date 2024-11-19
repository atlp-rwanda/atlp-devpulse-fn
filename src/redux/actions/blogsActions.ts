import axios from "./axiosconfig";
import { toast } from "react-toastify";

export interface Blog {
  comments: number;
  likes: number;
  id: string;
  title: string;
  content: string;
  author: {
    firstname: string;
    lastname: string;
  };
  coverImage: string;
  images?: string[];
  isHidden?: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export const fetchAllBlogs = async (tag?: string): Promise<Blog[]> => {
  console.log("[fetchAllBlogs] Function called with tag:", tag);

  try {
    // Log the backend URL
    console.log("[fetchAllBlogs] Backend URL:", process.env.BACKEND_URL);

    // Construct request payload
    const payload = {
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
    };

    // Log the payload
    console.log("[fetchAllBlogs] Request payload:", JSON.stringify(payload, null, 2));

    // Send the request
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    // Log the raw response
    console.log("[fetchAllBlogs] Response received:", response);

    // Check for errors in the response
    if (response.data.errors) {
      console.error("[fetchAllBlogs] GraphQL errors:", JSON.stringify(response.data.errors, null, 2));
      toast.error("Error fetching blogs");
      return [];
    }

    // Log the success data
    console.log("[fetchAllBlogs] Blogs fetched successfully:", response.data.data.getAllBlogs);

    return response.data.data.getAllBlogs as Blog[];
  } catch (error: any) {
    // Log the error response or message
    if (error.response) {
      console.error("[fetchAllBlogs] Error response:", error.response.data);
    } else {
      console.error("[fetchAllBlogs] Error message:", error.message);
    }

    toast.error("Error connecting to the server");
    return [];
  }
};

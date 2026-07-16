export type Blog = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
};

let blogs: Blog[] = [
  {
    id: "1",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "2",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "3",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: "4",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
];

export const getBlogs = () => blogs;

export const getBlog = (id: string) => blogs.find((blog) => blog.id === id);

export const createBlog = (blog: Omit<Blog, "id" | "likes">) => {
  const maxId =
    blogs.length > 0 ? Math.max(...blogs.map((b) => Number(b.id))) : 0;

  const newBlog: Blog = {
    id: String(maxId + 1),
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: 0,
  };

  blogs = blogs.concat(newBlog);
  return newBlog;
};

export const likeBlog = (id: string) => {
  const blog = blogs.find((b) => b.id === id);
  if (!blog) {
    return undefined;
  }

  const updatedBlog = { ...blog, likes: blog.likes + 1 };
  blogs = blogs.map((b) => (b.id === id ? updatedBlog : b));
  return updatedBlog;
};

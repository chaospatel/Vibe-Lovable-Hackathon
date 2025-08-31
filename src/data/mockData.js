export const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    content: "React Hooks revolutionized how we write React components by allowing us to use state and other React features without writing a class. In this comprehensive guide, we'll explore the most commonly used hooks like useState, useEffect, and useContext. We'll also dive into custom hooks and best practices for hook usage in modern React applications. Understanding hooks is crucial for any React developer looking to write cleaner, more maintainable code.",
    author: "John Doe",
    authorId: "user1",
    status: "published",
    likes: 45,
    comments: 12,
    views: 1250,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    category: "React"
  },
  {
    id: 2,
    title: "Building Scalable Node.js Applications",
    content: "Scalability is crucial for modern web applications, and Node.js provides excellent tools and patterns to achieve it. This article covers architectural patterns, database optimization, caching strategies, and deployment best practices. We'll explore microservices architecture, load balancing, and how to design APIs that can handle millions of requests. Learn how companies like Netflix and Uber scale their Node.js applications to serve millions of users worldwide.",
    author: "Jane Smith",
    authorId: "user2",
    status: "published",
    likes: 32,
    comments: 8,
    views: 980,
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    category: "Node.js"
  }
];

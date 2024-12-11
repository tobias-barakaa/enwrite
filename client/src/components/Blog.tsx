import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

// Styled Components
const BlogContainer = styled(Container)`
  padding: 2rem 0;
`;

const BlogCard = styled(Card)`
  transition: transform 0.2s;
  margin-bottom: 2rem;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BlogImage = styled(Card.Img)`
  height: 200px;
  object-fit: cover;
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const BlogMeta = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1rem;
`;

// Sample blog data
const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a new React project with TypeScript and best practices for type safety.",
    content: "Full content here...",
    author: "John Doe",
    date: "March 15, 2024",
    imageUrl: "/api/placeholder/800/400",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering Styled Components",
    excerpt: "Discover advanced techniques for styling your React components with styled-components.",
    content: "Full content here...",
    author: "Jane Smith",
    date: "March 10, 2024",
    imageUrl: "/api/placeholder/800/400",
    readTime: "7 min read"
  },
  // Add more blog posts as needed
];

const Blog: React.FC = () => {
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <BlogContainer>
      <h1 className="text-center mb-5">Our Blog</h1>
      <Row>
        {sampleBlogPosts.map((post) => (
          <Col key={post.id} lg={4} md={6} sm={12}>
            <BlogCard onClick={() => handlePostClick(post.id)}>
              <BlogImage variant="top" src={post.imageUrl} alt={post.title} />
              <Card.Body>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogMeta>
                  {post.author} • {post.date} • {post.readTime}
                </BlogMeta>
                <Card.Text>{post.excerpt}</Card.Text>
              </Card.Body>
            </BlogCard>
          </Col>
        ))}
      </Row>
    </BlogContainer>
  );
};

export default Blog;
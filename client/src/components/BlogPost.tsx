import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import noAi from '../assets/images/no-ai.png'; // Replace with actual image paths
import reactImage from '../assets/images/write.png'; // Replace with actual image paths
import tsImage from '../assets/images/work-project.png'; // Replace with actual image paths

const PostsContainer = styled.div`
  background: white;
  padding: 3rem 0;
`;

const PostContainer = styled(Container)`
  padding: 3rem 0;
  max-width: 800px;
  border-bottom: 1px solid #e0e0e0;

  &:last-of-type {
    border-bottom: none;
  }
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const PostImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
  border-radius: 8px;
`;

const PostTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #343a40;
`;

const PostMeta = styled.div`
  color: #6c757d;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const PostContent = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const BlogPosts: React.FC = () => {
  // Static blog posts data
  const posts = [
    {
      id: 1,
      title: "No AI: Human-Written Content by Enwriters for Genuine Connections",
      content: `
        <p>At Enwriters, we believe in the power of human creativity. While AI-generated content is convenient, it often lacks the authenticity and emotional connection that resonate with readers.</p>
        <p>Our team of skilled writers focuses on crafting personalized, human-driven content that builds trust and loyalty among audiences. Choose Enwriters for blog posts, articles, and SEO content that genuinely stands out.</p>
      `,
      author: "Rachel Morgan",
      date: "March 15, 2024",
      imageUrl: noAi,
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Mastering Blog Writing for SEO Success with Enwriters",
      content: `
        <p>Enwriters specializes in creating blog content that ranks high on search engines while delivering value to readers. Our SEO-driven blog writing services are designed to maximize your online visibility.</p>
        <p>From strategic keyword integration to compelling storytelling, our experts ensure your blog captures attention and drives meaningful traffic. Let Enwriters help you achieve your SEO goals effortlessly.</p>
      `,
      author: "Liam Carter",
      date: "March 20, 2024",
      imageUrl: reactImage,
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Effective Article Writing for Long-Term Impact by Enwriters",
      content: `
        <p>High-quality articles leave a lasting impression, and at Enwriters, we understand the art of impactful writing. Our team ensures every article delivers value, engages the audience, and aligns with your brand’s voice.</p>
        <p>Whether you need thought leadership pieces, product reviews, or in-depth guides, Enwriters guarantees professional, polished, and SEO-friendly articles tailored to your needs.</p>
      `,
      author: "Sophia Reed",
      date: "March 25, 2024",
      imageUrl: tsImage,
      readTime: "6 min read"
    }
  ];


  return (
    <PostsContainer>
      {posts.map((post) => (
        <PostContainer key={post.id}>
          <PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>
              By {post.author} • {post.date} • {post.readTime}
            </PostMeta>
          </PostHeader>
          <PostImage src={post.imageUrl} alt={post.title} />
          <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostContainer>
      ))}
    </PostsContainer>
  );
};

export default BlogPosts;

import React from 'react';
import BlogList from '../components/BlogList';

const style = {
  textAlign: 'center',
};

const BlogPage = () => {
  return (
    <section>
      <h2 style={style}>Blog List:</h2>
      <BlogList />
    </section>
  );
};

export default BlogPage;

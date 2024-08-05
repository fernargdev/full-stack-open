import { useRef } from 'react';

import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

import { HomePage as HomePageStyled } from '../styles/Components.styled';

const HomePage = () => {
  const blogFormRef = useRef();

  return (
    <HomePageStyled>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <BlogList />
    </HomePageStyled>
  );
};

export default HomePage;

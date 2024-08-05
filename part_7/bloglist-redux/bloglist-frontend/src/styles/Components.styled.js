import styled from 'styled-components';

// Page
export const HomePage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

// Notification
export const Notification = styled.div`
  margin-top: 10px;
  padding: 30px;
`;

export const Note = styled.div`
  color: green;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
`;

export const Error = styled.div`
  color: red;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
`;

// USer
export const UserList = styled.section`
  width: 100%;
  text-align: center;
`;

export const UsersData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const Cell = styled.div`
  flex: 1;
  border: 1px solid #000;
  padding: 10px;
`;

export const UserDetails = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Username = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

// Blog
export const Blog = styled.div`
  border: 2px solid;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 40vw;
`;

export const BlogForm = styled.form`
  width: 30vw;
`;

export const BlogHeader = styled.h4`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const BlogsList = styled.ul`
  padding: 0;
`;
export const BlogItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid;
`;

// Comment
export const CommentList = styled.ol`
  margin: 0 auto;
`;

export const Comment = styled.li`
  font-size: 14px;
  max-width: 60vw;
  border-bottom: 2px solid;
  word-wrap: break-word;
  flex-direction: column;
  padding: 10px 0 5px 0;
  margin: 10px 0;
`;

export const CommentInput = styled.input`
  padding: 5px;
  margin: 0 5px 5px 20px;
`;

// Navigation
export const Nav = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 15% 0 10% 0;
  border-bottom: 2px solid;
  padding: 1%;
  width: 100%;
`;

// Form
export const FormButton = styled.button`
  display: flex;
  margin: 5px auto;
  width: 50%;
  justify-content: center;
`;

// import { useState } from 'react';

// import { useDispatch } from 'react-redux';

// import { updateBlog, deleteBlog } from '../reducers/blogsReducer';
// import { createNotification } from '../reducers/notificationReducer';
import { Link } from 'react-router-dom';

// const Blog = ({ username, blog }) => {
const Blog = ({ blog }) => {
  // const [detailsVisible, setDetailsVisible] = useState(false);

  // const dispatch = useDispatch();

  // const toggleDetails = () => {
  //   setDetailsVisible(!detailsVisible);
  // };

  // const handleLike = async () => {
  //   const newBlog = {
  //     ...blog,
  //     user: blog.user.id,
  //     likes: blog.likes + 1,
  //   };

  //   try {
  //     dispatch(updateBlog(newBlog.id, newBlog));
  //   } catch (err) {
  //     dispatch(createNotification(`Error: ${err.response.data.error}`));
  //   }
  // };

  // const handleDelete = async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     try {
  //       dispatch(deleteBlog(blog.id));
  //       dispatch(createNotification('blog deleted'));
  //     } catch (err) {
  //       dispatch(createNotification(`Error: ${err.response.data.error}`));
  //     }
  //   }
  // };

  // return (
  //   <div className="blog">
  //     <div>
  //       <span>{blog.title} </span>
  //       <span>{blog.author} </span>
  //       <button onClick={toggleDetails}>
  //         {detailsVisible ? 'hide' : 'view'}
  //       </button>
  //     </div>

  //     {detailsVisible && (
  //       <div>
  //         <a href={blog.url}>{blog.url}</a>

  //         <div>
  //           <span>likes {blog.likes}</span>
  //           <button onClick={handleLike}>like</button>
  //         </div>

  //         <span>{blog.user.name}</span>

  //         {blog.user.username === username && (
  //           <div>
  //             <button onClick={handleDelete}>remove</button>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

export default Blog;

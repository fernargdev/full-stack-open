import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogsDetailsPage = ({ blogs }) => {
  const dispatch = useDispatch();

  const id = useParams().id;
  //   console.log('id', id);

  const blog = blogs.find((n) => n.id === String(id));

  if (!blog) {
    return null;
  }

  //   console.log('blog', blog);

  //   TODO:
  const handleLike = () => {
    console.log('like');
  };

  //   console.log(blog.user);

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user !== null && blog.user.name}</p>
    </div>
  );
};

export default BlogsDetailsPage;

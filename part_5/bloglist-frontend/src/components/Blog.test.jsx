import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog Component', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'http://test.com',
    likes: 10,
    user: {
      username: 'test username',
      name: 'test name',
    },
  }

  beforeEach(() => {
    render(<Blog key={blog.id} blog={blog} />)
  })

  test('renders title and author, but not url and likes by default', () => {
    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText('like')).toBeNull()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm Component', () => {
  test('the form calls the event handler which received as props with correct details', async () => {
    const user = userEvent.setup()
    const createBlogMockHandler = vi.fn()
    const { container } = render(
      <BlogForm createBlog={createBlogMockHandler} />
    )

    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Test title')
    await user.type(authorInput, 'Test author')
    await user.type(urlInput, 'http://test.com')
    await user.click(createButton)

    expect(createBlogMockHandler.mock.calls).toHaveLength(1)
    expect(createBlogMockHandler.mock.calls[0][0]).toEqual({
      title: 'Test title',
      author: 'Test author',
      url: 'http://test.com',
    })
  })
})

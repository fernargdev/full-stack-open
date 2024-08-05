const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'fernadev',
        name: 'Fernando Rodriguez',
        password: 'Fernando1234',
      },
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'fernadev', 'Fernando1234')

      await expect(page.getByText('Fernando Rodriguez logged')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'fernadev', 'wrong')

      const errorDiv = await page.getByTestId('error')

      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(
        page.getByText('Fernando Rodriguez logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'fernadev', 'Fernando1234')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog-0', 'Ferna', 'http://localhost:5173')

      await expect(
        page.getByText('a new blog blog-0 by Ferna added')
      ).toBeVisible()

      await expect(
        page.getByRole('button', { name: 'create new blog' })
      ).toBeVisible()

      const blog = await page.locator('a', { hasText: 'blog-0 by Ferna' })

      await expect(blog).toBeVisible()
    })

    describe('And several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'blog-1', 'Ferna', 'http://localhost:5173')
        await createBlog(page, 'blog-2', 'Ferna', 'http://localhost:5173')
        await createBlog(page, 'blog-3', 'Ferna', 'http://localhost:5173')
      })

      describe('Blogs', () => {
        test('the blog can be edited', async ({ page }) => {
          const blog = page.locator('a', { hasText: 'blog-1 by Ferna' })

          await blog.click()

          await expect(page.getByText('0 likes')).toBeVisible()
          await page.getByRole('button', { name: 'like' }).click()

          await expect(page.getByText('1 likes')).toBeVisible()
          await expect(page.getByText('0 likes')).not.toBeVisible()
        })

        test('nobody can delete the blog', async ({ page, request }) => {
          const blog = page.locator('a', { hasText: 'blog-2 by Ferna' })

          await blog.click()

          await expect(
            page.getByRole('button', { name: 'remove' })
          ).not.toBeVisible()

          await page.getByRole('button', { name: 'logout' }).click()
          await request.post('/api/users', {
            data: {
              username: 'test-user',
              name: 'Fernando Rodriguez',
              password: 'Fernando1234',
            },
          })

          await loginWith(page, 'test-user', 'Fernando1234')

          await blog.click()
          await expect(
            page.getByRole('button', { name: 'remove' })
          ).not.toBeVisible()
        })

        test('blogs should be organized from most likes to least likes', async ({
          page,
        }) => {
          const blog1 = page.locator('a', { hasText: 'blog-1 by Ferna' })
          const blog2 = page.locator('a', { hasText: 'blog-2 by Ferna' })
          const blog3 = page.locator('a', { hasText: 'blog-3 by Ferna' })

          await blog3.click()
          await page.getByRole('button', { name: 'like' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await page.getByRole('link', { name: 'Home' }).click()

          await blog2.click()
          await page.getByRole('button', { name: 'like' }).click()
          await page.getByRole('link', { name: 'Home' }).click()

          await blog1.click()
          await expect(page.getByText('0 likes')).toBeVisible()
          await page.getByRole('link', { name: 'Home' }).click()

          await blog2.click()
          await expect(page.getByText('1 likes')).toBeVisible()
          await page.getByRole('link', { name: 'Home' }).click()

          await blog3.click()
          await expect(page.getByText('2 likes')).toBeVisible()
          await page.getByRole('link', { name: 'Home' }).click()

          const blogs = page.locator('a', { hasText: 'blog-' })
          await expect(blogs.first()).toContainText('blog-3 by Ferna')
          await expect(blogs.nth(1)).toContainText('blog-2 by Ferna')
          await expect(blogs.last()).toContainText('blog-1 by Ferna')
        })
      })

      describe('Users', () => {
        test('users list is shown', async ({ page }) => {
          await page.getByRole('link', { name: 'Users' }).click()
          await expect(page.getByText('Users List')).toBeVisible()
          await expect(page.getByText('fernadev')).toBeVisible()
        })

        test('user details are shown', async ({ page }) => {
          await page.getByRole('link', { name: 'Users' }).click()
          await page.getByRole('link', { name: 'fernadev' }).click()

          await expect(page.getByText('fernadev')).toBeVisible()
          await expect(page.getByText('Added blogs')).toBeVisible()

          const blog1 = page.locator('li', { hasText: 'blog-1' })
          const blog2 = page.locator('li', { hasText: 'blog-2' })
          const blog3 = page.locator('li', { hasText: 'blog-3' })

          await expect(blog1).toBeVisible()
          await expect(blog2).toBeVisible()
          await expect(blog3).toBeVisible()
        })
      })

      describe('Notifications', () => {
        test('notification is shown when creating a blog', async ({ page }) => {
          await createBlog(page, 'blog-4', 'Ferna', 'http://localhost:5173')
          await expect(
            page.getByText('a new blog blog-4 by Ferna added')
          ).toBeVisible()
        })

        test('notification is shown when liking a blog', async ({ page }) => {
          const blog = page.locator('a', { hasText: 'blog-1 by Ferna' })
          await blog.click()
          await page.getByRole('button', { name: 'like' }).click()
          await expect(
            page.getByText('You added one like for "blog-1"')
          ).toBeVisible()
        })
      })

      describe('Comments', () => {
        test('comments can be added to a blog', async ({ page }) => {
          const blog = page.locator('a', { hasText: 'blog-1 by Ferna' })
          await blog.click()
          await page.getByTestId('comment-input').fill('Great blog!')
          await page.getByRole('button', { name: 'Add Comment' }).click()
          await expect(page.getByText('Great blog!')).toBeVisible()
        })
      })
    })
  })
})

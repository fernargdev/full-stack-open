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

      const errorDiv = await page.locator('.error')

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
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
      await expect(page.getByText('blog-0 Ferna')).toBeVisible()
    })

    test('cannot create a blog without title', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByTestId('author').fill('Ferna')
      await page.getByTestId('url').fill('http://localhost:5173')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Error: title or url missing')).toBeVisible()
    })

    test('cannot create a blog without URL', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByTestId('title').fill('blog-0')
      await page.getByTestId('author').fill('Ferna')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Error: title or url missing')).toBeVisible()
    })

    test('the blog creation form can be cancelled', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByRole('button', { name: 'cancel' }).click()

      await expect(
        page.getByRole('button', { name: 'create new blog' })
      ).toBeVisible()
    })

    test('notification message disappears after timeout', async ({ page }) => {
      await createBlog(page, 'blog-0', 'Ferna', 'http://localhost:5173')

      await expect(
        page.getByText('a new blog blog-0 by Ferna added')
      ).toBeVisible()

      await page.waitForTimeout(3000)

      await expect(
        page.getByText('a new blog blog-0 by Ferna added')
      ).not.toBeVisible()
    })

    describe('And several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'blog-1', 'Ferna', 'http://localhost:5173')
        await createBlog(page, 'blog-2', 'Ferna', 'http://localhost:5173')
        await createBlog(page, 'blog-3', 'Ferna', 'http://localhost:5173')
      })

      test('the blog can be edited', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'blog-1' })
        await blog.getByRole('button', { name: 'view' }).click()

        await expect(blog.getByText('likes 0')).toBeVisible()
        await blog.getByRole('button', { name: 'like' }).click()

        await expect(blog.getByText('likes 1')).toBeVisible()
        await expect(blog.getByText('likes 0')).not.toBeVisible()
      })

      test('the user who added the blog can delete it', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'blog-2' })
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(blog.getByText('blog-2')).not.toBeVisible()
        await expect(blog).not.toBeVisible()
      })

      test('can view blog details', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'blog-1' })
        await blog.getByRole('button', { name: 'view' }).click()

        await expect(blog.getByText('http://localhost:5173')).toBeVisible()
        await expect(blog.getByText('likes 0')).toBeVisible()
        await expect(blog.getByText('Ferna', { exact: true })).toBeVisible()
      })

      test('only the user who added the blog sees the remove button', async ({
        page,
        request,
      }) => {
        const blog = page.locator('.blog').filter({ hasText: 'blog-3' })
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()
        await request.post('/api/users', {
          data: {
            username: 'test-user',
            name: 'Fernando Rodriguez',
            password: 'Fernando1234',
          },
        })
        await loginWith(page, 'test-user', 'Fernando1234')

        await blog.getByRole('button', { name: 'view' }).click()
        await expect(
          blog.getByRole('button', { name: 'remove' })
        ).not.toBeVisible()
      })

      test('blogs should be organized from most likes to least likes', async ({
        page,
      }) => {
        const blog1 = page.locator('.blog').filter({ hasText: 'blog-1' })
        const blog2 = page.locator('.blog').filter({ hasText: 'blog-2' })
        const blog3 = page.locator('.blog').filter({ hasText: 'blog-3' })

        await blog1.getByRole('button', { name: 'view' }).click()
        await blog2.getByRole('button', { name: 'view' }).click()
        await blog3.getByRole('button', { name: 'view' }).click()

        await blog3.getByRole('button', { name: 'like' }).click()
        await blog3.getByRole('button', { name: 'like' }).click()
        await blog2.getByRole('button', { name: 'like' }).click()

        expect(blog3).toContainText('likes 2')
        expect(blog2).toContainText('likes 1')
        expect(blog1).toContainText('likes 0')

        expect(page.locator('.blog').first()).toContainText('blog-3')
        expect(page.locator('.blog').nth(1)).toContainText('blog-2')
        expect(page.locator('.blog').last()).toContainText('blog-1')
      })
    })
  })
})

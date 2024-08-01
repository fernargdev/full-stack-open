const generateRandomTitle = () => {
  const random = Math.random().toString(36).substring(2, 9)
  return `Testing Blog ${random}`
}

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, author, url) => {
  const title = generateRandomTitle()
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`a new blog ${title} by ${author} added`).waitFor()
  return title
}

export { loginWith, createBlog }

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

describe('<Togglable />', () => {
  const blog = {
    title: 'Hello World',
    author: 'John',
    url: 'http://example.com',
    likes: 7,
    user: {
      name: 'Adam',
    },
  }

  let container
  beforeEach(() => {
    container = render(<BlogDetails blog={blog}/>).container
  })

  test('renders its children', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = container.querySelector('.urldisplay')
    const likes = container.querySelector('.likesdisplay')
    expect(url).toHaveTextContent('http://example.com')
    expect(likes).toHaveTextContent('likes:7')
  })
})
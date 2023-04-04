import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('content before clicking view button', () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://localhost.com',
    likes: 100,
    user:{
      id:'kkkk'
    }
  }
  const user = {
    id: 'kkkk'
  }

  const { container } = render(<Blog blog={blog} user={user}/>)

  const div = container.querySelector('.whenHidden')

  expect(div).toHaveTextContent(
    'First class tests Robert C. Martin'
  )
})

test('content after clicking view button', async () => {
  const oneBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://localhost.com',
    likes: 100,
    user:{
      id:'kkkk'
    }
  }
  const user = {
    id: 'kkkk'
  }

  const { container } = render(<Blog blog={oneBlog} user={user}/>)

  const div = container.querySelector('.whenShown')

  expect(div).toHaveTextContent('http://localhost.com')
  expect(div).toHaveTextContent('100')
})
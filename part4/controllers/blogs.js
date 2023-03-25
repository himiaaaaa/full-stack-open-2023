const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/* blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
}) */

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
}) 

blogsRouter.get('/:id', async (request, response) => {
	  const blog = await Blog.findById(request.params.id)
	  if (blog) {
		response.json(blog)
	  } else {
		response.status(404).end()
	  }
  })

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0 ,
	})

	if(body.title === undefined || body.url === undefined){
		response.status(400).end()
	}else{
		const savedBlog = await blog.save()    
		response.status(201).json(savedBlog)
	}
	
	  
})

blogsRouter.delete('/:id', async (request, response) => {
	  await Blog.findByIdAndRemove(request.params.id)
	  response.status(204).end()
  })

module.exports = blogsRouter
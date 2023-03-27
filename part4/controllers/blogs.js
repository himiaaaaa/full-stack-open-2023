const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

/* blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
}) */

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user',{username: 1, name: 1, id: 1})
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

	const user = await User.findById(body.userId)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0,
		user: user.id
	})

	if(body.title === undefined || body.url === undefined){
		response.status(400).end()
	}else{
		const savedBlog = await blog.save() 
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()   
		
		response.status(201).json(savedBlog)
	}
	
	  
})

blogsRouter.delete('/:id', async (request, response) => {
	  await Blog.findByIdAndRemove(request.params.id)
	  response.status(204).end()
  })


blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
  
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0 ,
	}
  
	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(blog)
  })

module.exports = blogsRouter
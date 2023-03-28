const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

	const user = request.user

	if(!user){
		return response.status(401).json({ error: 'token missing or invalid' })  
	}

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
	const user = request.user

	if(!user){
		return response.status(401).json({ error: 'token missing or invalid' })  
	}

	const blog = await Blog.findById(request.params.id)
	if(blog.user.toString() === request.user.id){
		await Blog.findByIdAndRemove(request.params.id)
	    response.status(204).end()
	}else{
		return response.status(401).json({ error: 'Unauthorized to delete the blog' })
	}
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
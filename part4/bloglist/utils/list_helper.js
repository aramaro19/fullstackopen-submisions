const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  let mostLiked = {}
  if (Array.isArray(blogs) && blogs.length) {
    blogs.forEach(blog => {
      if (blog.likes > mostLiked.likes || mostLiked.likes === undefined) {
        mostLiked = blog
      }
    })
    const mostLikedFormatted = {
      title: mostLiked.title,
      author: mostLiked.author,
      likes: mostLiked.likes,
    }
    return mostLikedFormatted
  } else {
    return mostLiked
  }
}


const mostBlogs = blogs => {
  let authorsCount = {}
  let maxBlogs = 0
  let maxAuthor = null

  if(Array.isArray(blogs) && blogs.length) {
    blogs.forEach(blog => {
      if(blog.author in authorsCount) { 
       authorsCount[blog.author]++
       } else {
         authorsCount[blog.author] = 1
       }
     })
   
     for (let author in authorsCount) {
       if(authorsCount[author] > maxBlogs){
         maxBlogs = authorsCount[author]
         maxAuthor = author
       }
     }
     
     return {
       author: maxAuthor,
       blogs: maxBlogs
     }
  } else return {}
}

const mostLikes = blogs => {
  let likesCountPerAuthor = {}
  let maxLikes = 0
  let maxAuthor = null

  if(Array.isArray(blogs) && blogs.length) {
    blogs.forEach(blog => {
      if (blog.author in likesCountPerAuthor) {
        likesCountPerAuthor[blog.author] += blog.likes
      } else likesCountPerAuthor[blog.author] = blog.likes
    })
  
    for (let author in likesCountPerAuthor) {
      if(likesCountPerAuthor[author] > maxLikes) {
        maxLikes = likesCountPerAuthor[author]
        maxAuthor = author
      }
    }
  
    return {
      author: maxAuthor,
      likes: maxLikes
    }
  } else return {}
  
}

const postBlog = blog => {
  

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
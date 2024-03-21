import React from 'react'
import { Link } from 'react-router-dom'
import services from '../appwrite/Config'

const PostCard = ({$id, title, content}) => {
  return (
    <link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div>{content}</div>
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
    </link>
  )
}

export default PostCard
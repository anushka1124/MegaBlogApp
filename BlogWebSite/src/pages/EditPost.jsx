import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components/index'
import services from '../appwrite/Config'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            services.getpost(slug)
                    .then((post) => {
                        if(post) {
                            setPost(post)
                        }
                    })
        }else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (<div>
    <Container>
        <PostForm post={post} />
    </Container>
  </div>) : null
}

export default EditPost
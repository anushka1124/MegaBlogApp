import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '..'
import services from '../../appwrite/Config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    })

    const navigate = useNavigate();
    const userdata = useSelector(state => state.user.userdata)

    const submit = async (data) => {
      if(post) {
        const dbPost = await services.updatePost(post.$id, {
          ...data,
        })
        if(dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }else {
        const dbPost = await services.createPost({
          ...data,
          userId: userdata.$id,
        })

        if(dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
    
    const slugTranform = useCallback((value) => {
      if(value && typeof value === 'string') {
        return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-X\d\s]+/g, '-')   //inside regex
                .replace(/\s/g, '-')

        return ''
      }
    }, [])

    React.useEffect(() => {
      const subscription = watch((value, {name}) => {
        if(name === 'title') {
          setValue('slug', slugTranform(value.title, {shouldValidate: true}))
        }
      })

      return () => {
        subscription.unsubscribe();
      }
    },[watch, slugTranform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTranform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm
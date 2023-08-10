import { useState } from "react"
import { ArticleForm } from "./"
import ArticleService from "../service/article"
import { useDispatch } from "react-redux"
import { postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/article"
import { useNavigate } from "react-router-dom"

const CreateArticle = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formSubmit = async e => {
        e.preventDefault()
        const article = {title, body, description}
        dispatch(postArticleStart())
        try {
            await ArticleService.postArticle(article)
            dispatch(postArticleSuccess())
            navigate('/')
        } catch (error) {
            dispatch(postArticleFailure())
        }

    }
    
    const formProps = {title, setTitle, description, setDescription, body, setBody, formSubmit}

    return (
        <div className="text-center">
            <h1>Create article</h1>
            <div className="w-75 mx-auto">
                <ArticleForm {...formProps} />
            </div>
        </div>
    )
}

export default CreateArticle
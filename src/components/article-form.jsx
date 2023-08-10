
import { useSelector } from "react-redux"
import { Input, TextArea } from "../ui"

const ArticleForm = (props) => {
    const {isLoading} = useSelector(state => state.article)
    const { title, setTitle, description, setDescription, body, setBody, formSubmit } = props

    return (
        <div>
            <form onSubmit={formSubmit}>
                <Input label={'Title'} state={title} setState={setTitle} />
                <TextArea label={'description'} state={description} setState={setDescription} />
                <TextArea label={'body'} state={body} setState={setBody} height="300px" />
                <button className="btn btn-primary w-100 py-2" type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Create'}
                </button>
            </form>
        </div>
    )
}

export default ArticleForm
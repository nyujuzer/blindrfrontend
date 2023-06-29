const Form = ({children})=>{
    return(
        <form encType="multipart/form-data">
            {children}
        </form>
    )
}
export default Form
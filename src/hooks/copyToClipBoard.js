import toast from "react-hot-toast"

const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            toast.success('Copy to clipboard  succes')
        })
        .catch(() => {
            toast.error('Soemthing went wrong to copy')
        })
}
export { copyToClipBoard }
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { MdErrorOutline } from 'react-icons/md'

const ViewExternalDocuments = () => {
    // Retrieve query parameters from the URL
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search)
    const fileUrl = queryParams.get('fileUrl')
    const backUrl = queryParams.get('backUrl')
    const title = queryParams.get('title')

    // Check if parameters are missing
    const hasMissingParams = !fileUrl || !backUrl || !title

    // Determine if the file is a PDF or image by file extension
    const isPdf = fileUrl?.endsWith('.pdf')
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].some((ext) => fileUrl?.endsWith(ext))

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            {hasMissingParams ? (
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                    <MdErrorOutline size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-red-500 mb-2">Missing Information</h2>
                    <p className="text-gray-300">
                        It seems some required details are missing. Please ensure you have provided a file URL, title, and back URL in the parameters.
                    </p>
                    <Link
                        to="/"
                        className="inline-block mt-4 px-6 py-2 bg-[#56C870] hover:bg-blue-400 text-white font-medium rounded shadow"
                    >
                        Go Back to Home
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-semibold text-[#56C870]">{title}</h2>
                        <Link to={backUrl} className="flex items-center text-red-500 hover:text-red-400">
                            <AiOutlineArrowLeft size={24} className="mr-2" />
                            Back
                        </Link>
                    </div>

                    {isPdf ? (
                        <embed
                            src={fileUrl}
                            type="application/pdf"
                            width="100%"
                            height="500px"
                            className="rounded-lg shadow-lg"
                        />
                    ) : isImage ? (
                        <img
                            src={fileUrl}
                            alt={title}
                            className="w-full max-h-[500px] object-contain rounded-lg shadow-lg"
                        />
                    ) : (
                        <div className="text-center text-red-500">Unsupported file type</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ViewExternalDocuments

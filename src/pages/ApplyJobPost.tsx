import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axiosClient from '../redux/actions/axiosconfig';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {Circles} from 'react-loader-spinner'
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { type Editor } from '@tiptap/react'
import {Bold, Strikethrough, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Underline} from 'lucide-react'
import underline from '@tiptap/extension-underline';


const ToolBar = ({editor}:{editor: Editor | null}) => {
    if(!editor){
        return null
    }

    return (
        <div className='w-full flex gap-6 items-center border border-white px-4 py-4'>
            <button 
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
            >
                <Bold size={15} color={`${editor.isActive('bold') ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleItalic()
                    .run()
                }
                >
                <Italic size={15} color={`${editor.isActive('italic') ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleUnderline()
                    .run()
                }
                >
                <Underline size={15} color={`${editor.isActive('underline') ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleStrike()
                    .run()
                }
                >
                <Strikethrough size={15} color={`${editor.isActive('strike') ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}               
                >
                <List size={15} color={`${editor.isActive('bulletList') ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}                
                >
                <ListOrdered size={15} color={`${editor.isActive('orderedList') ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                <Heading1 size={15} color={`${editor.isActive('heading', { level: 1 }) ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                <Heading2 size={15} color={`${editor.isActive('heading', { level: 2 }) ? '#56C870': 'white'}`}/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                <Heading3 size={15} color={`${editor.isActive('heading', { level: 3 }) ? '#56C870': 'white'}`}/>
            </button>
        </div>
    )
}


const uploadPreset  = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string;
const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME as string;


const validationSchema = Yup.object({
    essay: Yup.string()
        .required('Essay is required')
        .test('max-words', 'Essay should not be more than 200 words', (value) => {
            return value.split(" ").length <= 200
        }),
    resume: Yup.string().required('CV/Resume is required')    
});

interface ApiRes {
    errors:{message:string, error:string}[]
}

const ApplyJobPost:React.FC = () => {
    const [resumeLoading, setResumeLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [wordCount, setWordCount] = useState(0)
    const navigate = useNavigate()

    
    const handleSubmit = async(data) => {
        const mutation = `
            mutation CreateNewJobApplication($input: JobApplicationInput!) {
                createNewJobApplication(input: $input) {
                    _id
                }
            }
        `;

        const variables = {
            input: {
                jobId: id,
                essay: data.essay,
                resume: data.resume,
            }  
        };

        try {
            setLoading(true)
            const response = await axiosClient.post(
            '/',
            {
                query: mutation,
                variables: variables,
            },
            );

            setLoading(false)
            
            if(response.data.errors){
                toast.error(response.data.errors[0].message)
                return
            }

            toast.success('Application successful')
            navigate('/applicant/available-jobs')
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues:{
            essay:"",
            resume:""
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    const uploadPDF = async(file:File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
       
        try {
            setResumeLoading(true)
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
                formData
            );
    
            setResumeLoading(false)
            formik.setFieldValue('resume',response.data.secure_url, true)
        } catch (error) {
            setResumeLoading(false)
            console.error("Upload Error:", error);
            toast.error("Failed to upload PDF");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === 'yes'){
            formik.setFieldValue('laptop', true, true)
        }else if(e.target.value === 'no') {
            formik.setFieldValue('laptop', false, true)
        }
    }

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            await uploadPDF(e.target.files[0])
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            underline
        ],
        content: formik.values.essay,
        editorProps:{
            attributes:{
                class: 'w-full h-60 overflow-auto border border-white bg-transparent'           
            }
        },
        onUpdate: ({ editor }) => {
          const words = editor.getHTML().trim()  
          setWordCount(words.split(' ').length)
          formik.setFieldValue('essay', words, true)
        },
        onBlur: () => {
            formik.handleBlur('essay')
        }
    });

    return (
        <div className="w-full flex flex-col items-center text-white py-8">
            <h1 className='mb-8 text-2xl'>Job Application</h1>
            <form onSubmit={formik.handleSubmit} className='w-3/5 flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <label>1. In not more than 200 words, explain why you are the best fit for this position</label> 
                    <div className='flex flex-col w-full gap-2'>
                        <ToolBar editor={editor}/> 
                        <EditorContent editor={editor} />  
                    </div>
                    <div className='text-sm'><span className={`${wordCount > 200 || wordCount === 0 ? 'text-red-500': 'text-green'}`}>{wordCount}</span> / 200 words</div>
                    {formik.touched.essay && formik.errors.essay && <div className='text-sm text-red-500'>{formik.errors.essay}</div>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label>2. Upload CV/Resume</label>
                    <div className='flex items-center gap-8'>
                        <input type="file" className='text-sm' onChange={handleFileChange} accept="application/pdf"/>
                        {resumeLoading && <Circles height={30} width={30} color='#56C870'/>}
                    </div>
                    {formik.touched.resume && formik.errors.resume && <div className='text-sm text-red-500'>{formik.errors.resume}</div>}
                </div>
                <button disabled={loading} className={`${formik.isValid && formik.dirty ? 'bg-green cursor-pointer': 'bg-green opacity-70 cursor-not-allowed'}  flex items-center justify-center self-center rounded-md w-28 h-10 mt-4`}>{loading ? <Circles height={20} width={20} color='white'/> : 'Submit'}</button>  
            </form>
        </div>
    )
}

export default ApplyJobPost
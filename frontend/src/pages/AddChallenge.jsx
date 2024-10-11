import { useEffect, useState } from "react"
import Button from "../elements/Button"
import { PageType } from "./Authentication"
import Datepicker from "react-tailwindcss-datepicker";
import ReactQuill from 'react-quill';
import QuillToolbar, { modules, formats }  from "../components/EditerToolBar";
import "react-quill/dist/quill.snow.css";
import { addChallenge } from "../apis/challenges";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const initialErrorState = {
    title: '',
    password: '',
    date: '',
    api: ''
}

const AddChallenge = () =>{
    const handleResponse = async ([response, error]) => {
        if(error){
            setErrors(prevErrors => ({
                ...prevErrors,
                api: error // Chỉ cập nhật trường 'api' trong errors
            }))
        }else{
            console.log("response", response);
            // show toast
            navigate("/");
            
        }
    }
    const [cookies, setCookie] = useCookies([]);
    const navigate = useNavigate()
    useEffect (()=>{
        if(!cookies.jwt){
            // show toast
            navigate('/');
        }
    })
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const handleTitleChange = (e) =>{
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e) =>{
        setDescription(e)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let newErrors = {}
        if(title.length === 0){
            newErrors = {
                ...newErrors,
                title: 'Please enter a title'
            }
            //show error message
        }
        if(description.length === 0){
            newErrors = {
                ...newErrors,
                description: 'Pleas enter a description'
            }
            //show error message
        }
        if(value.startDate === null || value.endDate === null){
            newErrors = {
                ...newErrors,
                date: 'Select start date and end date'
            }
            //show error message
        }
        setErrors(newErrors)

        addChallengeApi()
    }
    const addChallengeApi = async () => {
        const [response, error] = await addChallenge(cookies.jwt, {
            challenge:{
                title: title,
                description: description,
                start_date: value.startDate,
                end_date: value.endDate
            }
        })
        handleResponse([response, error])
    }
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });
    

    const handleBack = () => {
        navigate(-1); // Điều hướng quay lại trang trước
    };

    const today = new Date();
    const [errors, setErrors] = useState(initialErrorState)
    return (
        
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center">
            <Button type="button" onClick={handleBack} 
            className="bg-indigo-500 text-white hover:bg-indigo-600 px-3 py-2 rounded"
            >
                        Back
            </Button>
            </div>
            <h1 className="text-4xl">
            Add a new challenge
            </h1>
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
                <div>
                <input 
                className="py-2 w-full border boder-gray-600 rounded px-3"
                type="text" 
                name="text" 
                value={title}
                placeholder="Challenge Title"
                onChange={handleTitleChange}
                />
                {errors.title && <p className="text-sm text-medium text-red-500">{errors.title}</p>}
                </div>
                <div>
                <Datepicker
                placeholder="Start Date ~ End Date"
                inputClassName="border border-gray-600 rounded px-3 py-2 w-full"
                    minDate={today}
                    value={value}
                    displayFormat={"DD, MMMM"}
                    onChange={newValue => setValue(newValue)}
                />
                {errors.date && <p className="text-sm text-medium text-red-500">{errors.date}</p>}
                </div>
                <div className="text-editor">
                <QuillToolbar />
                <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                />
                {errors.description && <p className="text-sm text-medium text-red-500">{errors.description}</p>}
                </div>
                
                <div>
                <Button type="submit">
                    Add challenge
                </Button>
                {errors.api && <p className="text-sm text-medium text-red-500">{errors.api}</p>}
                </div>
            </form>
            
        </div>
    )
}
export default AddChallenge
import PropTypes from "prop-types"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import { validateEmail, validatePassword } from "../utlities/validations"
import { Link } from "react-router-dom"
import { loginApi, registerApi } from "../apis/authentication"
import { useCookies } from "react-cookie"
import Button from "../elements/Button"

const initialErrorState = {
    email: '',
    password: '',
    api: ''
}
const Authentication = ({pageType}) => {
    const [cookies, setCookie] = useCookies([]);
    const navigate = useNavigate()
    useEffect (() => {
        if(cookies.jwt){
            navigate('/');
        }
    }, [])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(initialErrorState)
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleResponse = async ([response, error]) => {
        if(error){
            setErrors(prevErrors => ({
                ...prevErrors,
                api: error // Chỉ cập nhật trường 'api' trong errors
            }))
        }else{
            const jwt = response.headers.get('Authorization')
            setCookie('jwt', jwt);
            // const result = await response.json();
            // const message = result.message
            // const user = result.data
            navigate('/')
            // console.log("cookies: ", cookies.jwt);
        }
    }
    
    

            
    const handleSubmit = async (e) => {
        e.preventDefault()
        let newErrors = {}
        if(!validateEmail(email)){
            newErrors = {
                ...newErrors,
                email: 'Invalid email address'
            }
            //show error message
        }
        if(!validatePassword(password)){
            newErrors = {
                ...newErrors,
                password: 'Invalid password. At least 6 character'
            }
            //show error message
        }
        setErrors(newErrors)

        if(pageType === PageType.LOGIN){
            const [response, error] = await loginApi({
                user:{
                    email: email,
                    password: password
                }
            })
            handleResponse([response, error])
        }else {
            const [response, error] = await registerApi({
                user:{
                    email: email,
                    password: password
                }
            })
            handleResponse([response, error])
        }
        
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
                <h3 className="text-2xl font-bold">
                    {(pageType === PageType.LOGIN)? 'Login' : 'Register' }
                </h3>
                {
                    (pageType === PageType.LOGIN)?
                    <p className="mt-4">Not a user? 
                    <Link
                    to='/register'
                    className='ms-1 underline'
                    >
                    Register
                    </Link>
                    </p>
                    :
                    <p className="mt-4">Have Account? 
                    <Link
                    to='/login'
                    className='ms-1 underline'
                    >
                    Login
                    </Link>
                    </p>
                }

                <form className="mt-10 max-w-96 flex-col flex gap-8">
                    <div>
                        <input 
                        className="py-2 w-full border boder-gray-600 rounded px-3"
                        type="email" 
                        name="email" 
                        value={email}
                        placeholder="Enter email"
                        onChange={handleEmailChange}
                        />
                        {errors.email && <p className="text-sm text-medium text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <input 
                        className="py-2 w-full border boder-gray-600 rounded px-3"
                        type="password" 
                        name="password" 
                        value={password}
                        placeholder="Enter password"
                        onChange={handlePasswordChange}
                        />
                        {errors.password && <p className="text-sm text-medium text-red-500">{errors.password}</p>}
                    </div>
                        <Button 
                        // parentClassname=""
                        // childrenClassName=""
                        // id ="random"
                        onClick={handleSubmit}>
                        {(pageType === PageType.LOGIN)? 'Login' : 'Register' }
                        </Button>
                    {errors.api && <p className="text-sm text-medium text-red-500">{errors.api}</p>}
                </form>
            </div>   
        </div>
    )
}
export const PageType = Object.freeze({
    LOGIN : 0,
    REGISTER : 1
})
Authentication.prototype = {
    pageType: PropTypes.number.isRequired
} 
export default Authentication
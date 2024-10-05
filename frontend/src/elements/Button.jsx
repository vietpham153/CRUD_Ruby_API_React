const Button =({children, onClick, parentClassname='bg-indigo-300', childrenClassname='bg-indigo-300', ...rest})=>{
    return (
        <div className={`${parentClassname} rounded hover:-translate-x-0.5 hover:-translate-y-0.5"`}>
        <button 
        type="submit"
        onClick={onClick}
        className={`w-full ${childrenClassname} text-black hover:-translate-x-1.5 
        hover:-translate-y-1.5 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded text-white`}
        {...rest}
        >
            {/* {(pageType === PageType.LOGIN)? 'Login' : 'Register' } */}
            {children}
        </button>
        </div>
    )
}
export default Button
import facebook from '../assets/facebook.svg'
import github from '../assets/github.svg'
import linkedin from '../assets/linkedin.svg'
import zalo from '../assets/zalo.svg'
const Footer = () =>{
    return (
        <div className="bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between items-center gap-2">
                <div className='flex gap-3'>
                    <a href=""><img className='w-6 h-6' src={facebook} /> </a>
                    <a href=""><img className='w-6 h-6' src={zalo} /></a>
                    <a href=""><img className='w-6 h-6' src={linkedin} /></a>
                    <a href=""><img className='w-6 h-6' src={github} /></a>
                </div>
                <p className="mt-4 font-medium text-sm text-gray-600">
                    CopyRight © 2024 PhamHoangViet's Project
                </p>
                <p className="flex items-center gap-2 font-medium text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>

                    Develop by Viet and my techers. ❤️
                </p>
            </div>
        </div>
        </div>
    )
}
export default Footer
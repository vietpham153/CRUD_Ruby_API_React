import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom"
import { useCookies } from "react-cookie";
import { getChallengeById } from "../apis/challenges";
import RichTextViewer from "../elements/RichTextViewer";
const Challenge = ()=>{
    const location = useLocation();


    const [challenge, setChallenge] = useState(null)
    const handleResponse = async ([response, error]) => {
        if(error){
            //TODO  handle error
        }else{
            // show toast
            const data = await response.json()
            console.log(data.data);
            setChallenge(data.data)
        }
    }
    const [cookies] = useCookies([]);
    useEffect(()=>{
        const segments = location.pathname.split("/");
        const challengeId = segments[segments.length - 1];
        getActiveUpcomingChallengesApi( challengeId)
    },[])
    const getActiveUpcomingChallengesApi = async (id) => {
        const [response, error] = await getChallengeById(cookies.jwt, id)
        handleResponse([response, error])
    }


   
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-12 space-y-10">
            {challenge &&
            <div>
                <h1 className="text-3xl text-black">
                    {challenge.title}
                </h1>
                <RichTextViewer className="mt-8"
                content={challenge.description} />
            </div>
            }
        </div>
    )
}
export default Challenge
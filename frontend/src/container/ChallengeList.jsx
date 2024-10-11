import { getActiveAndUpcomingChallenges } from "../apis/challenges";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import ChallengeCard from "../components/ChallengeCard";
import { useNavigate } from "react-router-dom";
import "./style.css"


const ChallengeList = () =>{
    const navigate = useNavigate()
    const [activeChallenges, setActiveChallenges] = useState([])
    const [upcomingChallenges, setUpcomingChallenges] = useState([])
    const handleResponse = async ([response, error]) => {
        if(error){
            //TODO  handle error
        }else{
            // show toast
            const data = await response.json()

            setActiveChallenges(data.active)
            setUpcomingChallenges(data.upcoming)
        }
    }
    const [cookies] = useCookies([]);
    useEffect(()=>{
        getActiveUpcomingChallengesApi()
    }, [])
    const getActiveUpcomingChallengesApi = async () => {
        const [response, error] = await getActiveAndUpcomingChallenges(cookies.jwt)
        handleResponse([response, error])
    }
    const handleAdd=() =>{
        navigate("add-challenge")
    }
    
    const today = new Date();
    return (
        
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-12 space-y-10">
            
            {
                activeChallenges && activeChallenges.length > 0 && 
                <div>
                <h3 className="text-2xl font-bold">Active Challenges</h3>
                <div className="tag">
                <button 
                type="button"
                onClick={handleAdd}
                className="challenge-header new-tag"
                >
                    Add <i className="fas fa-plus"></i>
                </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 my-6">
                {activeChallenges.map((challenge)=>{
                    return <ChallengeCard 
                    key = { challenge.id }
                    challenge={challenge} />
                })}
                </div>
                </div>
            }
            {
                upcomingChallenges && upcomingChallenges.length > 0 && 
                <div>
                <h3 className="text-2xl font-bold">Upcoming Challenges</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 my-6">
                {upcomingChallenges.map((challenge) => {
                    return <ChallengeCard 
                    key = { challenge.id }
                    challenge={challenge} />
                })}
                </div>
                </div>
            }
            <h1 className="text-4xl">
            Challenges Active: {activeChallenges.length} upcoming: {upcomingChallenges.length}
            </h1>

            
        </div>
    )
}
export default ChallengeList
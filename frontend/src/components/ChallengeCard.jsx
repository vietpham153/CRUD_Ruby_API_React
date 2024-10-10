import { Link } from 'react-router-dom';
import DefaultThumbnail from '../assets/programing.svg'
import { formatDate } from '../utlities/date';
const ChallengeCard = ({challenge}) =>{
    const startDate = new Date(challenge.start_date);
        const endDate = new Date(challenge.end_date);
        const currentDate = new Date();
    const dateText = () => {
        

        if(startDate > currentDate){
            
            return (<p className='font-medium text-green-600'> {`Start date: ${formatDate(startDate)}`}</p>)
            // future challenges
        }
        else if(startDate < currentDate && endDate > currentDate){
            return (<p className='font-medium text-red-600'> {`End date: ${formatDate(endDate)}`}</p>)
            // ongoing challenges
        }else {
            return (<p className='font-medium text-gray-600'> {`Start date: ${formatDate(startDate)} / End date: ${formatDate(endDate)}`}</p>)
        }
    }
    return (
        <Link to={`/challenge/${challenge.id}`}>
        <div className="flex flex-col border-black rounded hover:cursor-pointer hover:border-2 hover:shadow-lg">
            <img src={DefaultThumbnail} className='aspect-square w-full border-b border-black' />
            <div className='p-4 space-y-2'>
                <p className='font-medium line-clamp-1 text-ellipsis'>{challenge.title}</p>
                {dateText()}
            </div>
        </div>
        </Link>
    )
}
export default ChallengeCard
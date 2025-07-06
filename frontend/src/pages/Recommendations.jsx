import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { getAIRecommendation } from '../lib/aimodel'
import RecommendedMovies from '../components/recommendedMovies'

const questions = [
    {
        label: 'genre',
        name : 'what is your favorite genre?',
        options: ['Action', 'Comedy', 'Horror', 'Drama', 'Thriller', 'Romance', 'Sci-Fi'] 
    },
    {
        label: 'mood',
        name: 'what is your current mood?',
        options: ['Excited', 'Relaxed', 'Stressed', 'Inspired', 'Thoughtful', 'Scared'] 
    },
    {
        label: 'time_period',
        name: 'what is your preferred decade?',
        options: ['2020s', '2010s', '2000s', '1990s', 'Older'] 
    },
    {
        label: 'language',
        name: 'what is your preferred language?',
        options: ['English', 'Japanese', 'Korean', 'French', 'Other'] 
    },
    {
        label: 'length',
        name: 'what is your preferred movie length?',
        options: ['Short(<90 mins)', 'Standard (90-120 mins)', 'Long (>120 mins)'] 
    }
]

const initialValues = questions.reduce((acc, question)=>{
    acc[question.label] = ''
    return acc
}, {})
//this can be hardcoded as well
//{
//genre: '',
//mood: '',
//...
//}


const Recommendations = () => {

    const [inputs, setInputs] = useState(initialValues)
    const [question, setQuestion] = useState(0)
    const [recommendation, setRecommendation] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleInputs = (value) =>{
        setInputs({...inputs, [questions[question].label] : value})
    }

    const handleNext = () =>{
        if (question < questions.length -1){
            setQuestion(question + 1)
        }else{
            console.log(inputs)
        }
    }

    const handleBack = () =>{
        if(question > 0){
            setQuestion(question - 1)
        }
    }

    const generateRecommendations = async() =>{
        if(!inputs){
            toast('please enter your preferances')
        }

        setIsLoading(true)

        const userPrompt = `Given the following user inputs:
        -time period: ${inputs.time_period}
        -genre: ${inputs.genre}
        -mood: ${inputs.mood}
        -language: ${inputs.language}
        -length: ${inputs.length}
        
        Recommend 10 movies related to the mood ${inputs.mood}, language ${inputs.language} belonging to the genre ${inputs.genre} released in the time period ${inputs.time_period} with a runtime of ${inputs.length}. Return the result as a plain json array of movie titles only, no extra text, no explanations, no code blocks, no markdown. just the json array of structure:
        [
        "Movie title 1",
        "Movie title 2",
        "Movie title 3",
        "Movie title 4",
        "Movie title 5",
        "Movie title 6",
        "Movie title 7",
        "Movie title 8",
        "Movie title 9",
        "Movie title 10",
        ]`
        
        const result = await getAIRecommendation(userPrompt)
        setIsLoading(false)
        if(result){
            const cleanedResults = result.replace(/```json\n/i, '').replace(/\n```/i, '')
            try {
                const recommendationArray = JSON.parse(cleanedResults)
                setRecommendation(recommendationArray)
                console.log(result)
                console.log(recommendationArray)
            } catch (error) {
                console.log('error getting recommendations', error)
            } 
        }else{
            toast.error('failed to get recommendations')
        }
    }


    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#333333] to-black relative overflow-hidden'>
            
            {!(recommendation && recommendation.length>0) && (<img src="/background_banner.jpg" alt="bg" className='absolute inset-0 h-full w-full object-cover opacity-20 blur-[2px]'/>)}
            
            {recommendation && recommendation.length>0 ? (
                <div className='w-full max-w-7xl auto-max mt-2'>
                    <h1 className='text-3xl font-bold text-white mb-8'>Your Recommendations</h1>
                    <RecommendedMovies movieTitles={recommendation}/>
                </div>
            ) : (
                <div className='relative w-full max-w-md mx-auto rounded-2xl bg-[#111111]/90 shadow-2xl border border-[#333] px-8 py-10 mt-4 flex flex-col items-center min-h-[480px]'>
                <h2 className='text-2xl text-white text-center font-extrabold mb-8 tracking-tight drop-shadow-lg'>AI Movie Recommendations</h2>
                <div className='w-full flex items-center mb-8'>
                    <div className='flex-1 h-2 bg-[#232323] rounded-full overflow-hidden'>
                        <div className='h-full bg-green-500 transition-all duration-300' style={{width: `${((question + 1)/questions.length) * 100}%`}}></div>
                    </div>
                    <span className='ml-4 text-white text-sm font-semibold'>{question + 1}/{questions.length}</span>
                </div>
                <div className='w-full flex flex-col flex-1'>
                    <div className='mb-6 flex-1'>
                        <h3 className='text-lg font-semibold text-white mb-6 text-center'>
                            {questions[question].name}
                        </h3>
                        <div className='grid-cols-1 gap-3'>
                            {questions[question].options.map((opt) => (<button onClick={() => {handleInputs(opt)}} key={opt} className={`w-full py-3 rounded-xl focus:border-4 focus:border-white border-2 border-black mb-2 transition font-semibold text-base flex items-center justify-center text-white shadow-lg ${inputs[questions[question].label] == opt ? "bg-[#006400]" : "bg-[#333333] hover:bg-[#006400]"}`}>{opt}</button>))}
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-6'>
                        <button disabled={question==0} onClick={handleBack} className='px-6 py-2 rounded-lg font-semibold transition border-2 border-black text-white bg-[#222222] hover:bg-[#333333]'>Back</button>
                        <button disabled={isLoading} onClick={question == questions.length-1? generateRecommendations : handleNext} className='px-6 py-2 rounded-lg font-semibold transition border-2 border-black text-white bg-green-700 hover:bg-green-600'>{question == questions.length -1 ? 'Finish' : 'Next'}</button>
                    </div>
                </div>
            </div>
            )}
            
            
        </div>
        
    )
}

export default Recommendations
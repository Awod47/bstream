import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GENAI_API_KEY
})

const config = {
    responseMimeType: 'text/plain'
}

const model = 'gemini-2.0-flash'

export const getAIRecommendation = async(prompt) =>{
    try {
        const response = await ai.models.generateContent({
            model,
            config,
            contents: [{role: 'user', parts: [{text: prompt}]}]
        })

        return response.candidates?.[0]?.content?.parts?.[0]?.text

    } catch (error) {
        console.log('error in gemini ai api', error)
        return null
    }
}
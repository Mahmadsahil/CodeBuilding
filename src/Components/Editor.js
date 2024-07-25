import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import nullImage from "../Utils/Images/null.png"

const Editor = () => {
    const { QuestionDetails } = useSelector(state => state.Questions);
    const { question, difficulty, example, topic } = QuestionDetails;
    const [response, setResponse] = useState("");
    const [generatedCode, setGeneratedCode] = useState(null);
    const [language, setLanguage] = useState("javascript");
    const [language2, setLanguage2] = useState("javascript");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const { color, message, result } = response;
    const GOOGLE_API_KEY = "AIzaSyAPdmWONnC5If_2QJ5ErP_X96fTUUOrM4Q";

    const getData = async () => {
        setResponse("")
        setLoading(true)

        // Make sure to include these imports:
        // import { GoogleGenerativeAI } from "@google/generative-ai";
        const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
    Please execute the provided code and verify if it correctly answers the given question in the specified language.

Question:${question}
Code: ${code}
Language: ${language}

Important:check whether the code correctly answers the question or not, regardless of whether it executes successfully or fails.

If the code runs successfully return executed message and color:green else return error message and color:red and answers the question correctly or wrong in json:
{
  "result": "",
  "color": "",
  "message": ""
}


        `;

        const result = await model.generateContent(prompt);
        const data = result.response.candidates[0].content.parts[0].text;
        const jsonMatch = data.match(/```json\s*([\s\S]*?)\s*```/);

        if (jsonMatch && jsonMatch[1]) {
            try {
                const jsonString = jsonMatch[1];
                const jsonObject = JSON.parse(jsonString);
                setLoading(false)
                setResponse(jsonObject)
            } catch (error) {
                console.error("Failed to parse JSON:", error);
            }
        } else {
            console.error("No JSON found in the response text.");
        }
    }

    const generateCode = async () => {
        setGeneratedCode("")
        setLoading2(true)
        // Make sure to include these imports:
        // import { GoogleGenerativeAI } from "@google/generative-ai";
        const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
   write code for given question using given example with given programming language.response should only the code
Question: ${question}
example: ${example}
Language: ${language2}
        `;

        const result = await model.generateContent(prompt);
        const textContent = result.response.candidates[0].content.parts[0].text;
        const code = textContent.replace(/```/g, '');
        setLoading2(false)
        setGeneratedCode(code)
    }

    const handleLanguage = (e) => {
        setLanguage(e.target.value);
    }
    const handleLanguage2 = (e) => {
        setLanguage2(e.target.value);
    }

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    const handleRun = () => {
        if (code === "") {
            return
        }
        getData()
    }

    const handleGenerateCode = () => {
        generateCode()
    }

    if (QuestionDetails.length === 0) {
        return (<div className='h-screen w-full flex justify-center items-center'>
            <LazyLoadImage className='w-64' src={nullImage} effect='blur' alt='null image' />
        </div>)
    }

    return (
        <>

            <div className='w-full h-screen flex flex-col md:flex-row p-2 md:p-0'>

                <div className=' md:w-5/12 p-4 border'>

                    <header className='text-2xl text-slate-600 py-2 font-semibold'>Problem :</header>
                    <header className={` ${difficulty === "easy" ? "text-green-600" :
                        difficulty === "medium" ? "text-orange-400" :
                            difficulty === "hard" ? "text-red-500" : ""} `}> {difficulty}</header>

                    <p className='py-2 text-slate-700'>{topic}</p>
                    <header className='text-xl text-slate-700 font-normal py-2'><strong >Q :</strong> {question}</header>
                    <p className='py-4 text-slate-700'><strong>Example : </strong>{example}</p>

                    <div className={`w-full md:h-80 p-2 `}>
                        <div className='flex gap-2 items-start'>
                            <select className='text-sm p-1 cursor-pointer'
                                onChange={handleLanguage2}
                            >
                                <option>Javascript</option>
                                <option>Python</option>
                                <option>Java</option>
                                <option>C</option>
                                <option>C++</option>
                                <option>GoLang</option>
                                <option>Swift</option>
                                <option>Kotlin</option>
                                <option>C#</option>
                            </select>
                            <button className='font-semibold cursor-pointer text-sm bg-blue-600 text-white rounded-lg mb-2 py-1 px-2'
                                onClick={handleGenerateCode}>Generate Code
                                {loading2 && <div className='inline-block h-3 w-3 mx-2 rounded-full border-2 border-t-blue-600 animate-spin'></div>}
                            </button>
                        </div>
                        <pre className='bg-slate-50 overflow-y-scroll'>
                            <code dangerouslySetInnerHTML={{ __html: generatedCode }} />
                        </pre>
                        {/* <p className='px-2'>{generatedCode}</p> */}
                    </div>

                </div>

                <div className='md:w-7/12 h-full my-1 md:my-0'>

                    {/* Coding Section */}
                    <div className='relative h-96 bg-slate-300'>
                        <div className='absolute t-0 l-0 flex justify-start items-start'>
                            <select className='text-sm p-1 cursor-pointer'
                                onChange={handleLanguage}
                            >
                                <option>Auto</option>
                                <option>Javascript</option>
                                <option>Python</option>
                                <option>Java</option>
                                <option>C</option>
                                <option>C++</option>
                                <option>GoLang</option>
                                <option>Swift</option>
                                <option>Kotlin</option>
                                <option>C#</option>
                            </select>
                            <button className='px-3 text-white hover:text-blue-300 rounded font-semibold' onClick={handleRun}>Run</button>
                        </div>
                        <textarea className='w-full h-full outline-none resize-none text-sm px-2 pt-10 overflow-y-scroll bg-slate-600 text-white'
                            placeholder='Code here...' value={code} onChange={handleCode}></textarea>
                    </div>

                    {/*Output Section */}
                    <div className=''>
                        <header className='p-2 text-xl font-medium inline-block'>Output :  {loading && <div className='inline-block h-4 w-4 mx-2 rounded-full border-2 border-t-blue-600 animate-spin'></div>} </header>

                        <p className={`px-4 mb-8 text-${color}-600`}>{result}<br></br>{message}</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Editor
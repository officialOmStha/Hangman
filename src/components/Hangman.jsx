import { useState, useEffect, useRef } from 'react'
import words from './dictionary';
import Zero from '../assets/Zero.png'
import One from '../assets/One.png'
import Two from '../assets/Two.png'
import Four from '../assets/Four.png'
import Five from '../assets/Five.png'
import Six from '../assets/Six.png'
import InpSound from '../assets/Inp.mp3'
import LostSOund from '../assets/Lost.mp3'
import WinSound from '../assets/Win.mp3'




const Hangman = () => {
    const inputRef = useRef(null);
    const guessSound = useRef(new Audio(InpSound));

    const [comWord, setComWord] = useState("");
    const [inp, setInp] = useState('');
    const [wrong, setWrong] = useState([]);
    const [count, setCount] = useState(0);
    const [boxes, setBoxes] = useState([""]);
    const [message, setMessage] = useState("");

    const getWord = () => {
        const data = (words[Math.floor(Math.random() * words.length)]).toUpperCase();
        setComWord(data)
        setBoxes(Array(data.length).fill(""))
    }


    const handelInp = (e) => {
        e.preventDefault();
        if (count >= 6) return;
        if (!boxes.includes("")) {
            return;
        }

        if (!inp) return;
        if (wrong.includes(inp) || boxes.includes(inp)) {
            setInp("");
            setMessage("You already guessed :" + inp);
            return;
        }

        guessSound.current.currentTime = 0;
        guessSound.current.play();

        const newBoxes = [...boxes];

        for (let i = 0; i < comWord.length; i++) {
            if (comWord[i] === inp) {
                newBoxes[i] = inp;
            }
        }

        if (!comWord.includes(inp) && !wrong.includes(inp)) {
            setCount((prev) => prev + 1);
            setWrong((prev) => [...prev, inp])

        }

        setBoxes(newBoxes);
        setInp("");
    }

    const handelReset = () => {
        setWrong([]);
        setCount(0)
        setBoxes([])
        setMessage("");
        setInp("")
        getWord();
    }

    useEffect(() => {
        getWord();
    }, [])

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        if (count >= 6) { // 6 is your losing limit
            const lostAudio = new Audio(LostSOund);
            lostAudio.currentTime = 0;
            lostAudio.play();
        }
    }, [count]);

    useEffect(() =>{
        if(!boxes.includes("")){
            const WinAudio = new Audio(WinSound);
            WinAudio.currentTime = 0;
            WinAudio.play();
        }
    },[boxes])


    return (
        <>

            < div
                className="w-full p-4 md:p-20 flex flex-col  md:flex-row justify-center items-center gap-[20px] md:gap-[10%]"
            >
                <div className="flex flex-col justify-center items-center w-70%">
                    <h1 className='text-5xl '>Hang Man</h1>
                    <form
                        className='flex gap-2 my-6'
                        onSubmit={handelInp}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={inp}
                            maxLength={1}
                            placeholder='Character to check'
                            onChange={(e) => setInp((e.target.value).toUpperCase())}
                            // disabled={count >= 6 || !boxes.includes("") || inp===""}
                            className='py-2 px-4 rounded border-2'
                        />
                        <button
                            type='submit'
                            // disabled={count >= 6 || !boxes.includes("")}
                            className='bg-green-400 hover:bg-green-500 py-2 px-4 rounded border-2'
                        >
                            Put
                        </button>
                    </form>
                    <ul className="flex gap-2">
                        {boxes.map((box, index) => (
                            <li
                                className='w-10 h-10 border-2 flex justify-center items-center'
                                key={index}>{box}</li>
                        ))}
                    </ul>
                    {(count >= 6 || !boxes.includes("")) && <span>Commputer Generated : {comWord}</span>}

                    <span
                        className='flex'
                    >
                        Wrong letter :
                        {wrong.map((wchar, index) => (
                            <div
                                className='mx-[4px] text-red-500'
                                key={index}>{wchar}</div>
                        ))}
                    </span>
                    {!boxes.includes("") ? <div>You Won</div> : ""}
                    {count >= 6 ? <div> You Lost</div> : ""}

                    {message && <div className='text-red-500'>{message}</div>}
                    {(count >= 6 || !boxes.includes("")) &&
                        <button
                            className='bg-green-400 hover:bg-green-500 py-2 px-4 rounded border-2'
                            onClick={handelReset}
                        >
                            Reset
                        </button>}
                </div>
                <div
                    className='md:w-[30%] w-full'
                >
                    {count == 0 && <img src={Zero} alt="hangman" />}
                    {count == 1 && <img src={One} alt="hangman" />}
                    {count == 2 && <img src={Two} alt="hangman" />}
                    {count == 3 && <img src={Four} alt="hangman" />}
                    {count == 4 && <img src={Four} alt="hangman" />}
                    {count == 5 && <img src={Five} alt="hangman" />}
                    {count == 6 && <img src={Six} alt="hangman" />}

                </div>
            </div>
        </>
    )
}

export default Hangman
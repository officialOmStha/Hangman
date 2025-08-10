import { useState, useEffect, useRef } from 'react'

const Hangman = () => {
    const inputRef = useRef(null);

    const [comWord, setComWord] = useState("");
    const [inp, setInp] = useState('');
    const [wrong, setWrong] = useState([]);
    const [count, setCount] = useState(0);
    const [boxes, setBoxes] = useState([""]);
    const [message, setMessage] = useState("");


    const words = ["apple", "ball", "cat", "danger", "eager", "gun"];

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

    return (
        < div
            className="w-full p-4 md:p-20 flex flex-col justify-center items-center"
        >
            <h1 className='text-5xl'>Hang Man</h1>
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
                    disabled={count >= 6 || !boxes.includes("")}
                    className='py-2 px-4 rounded border-2'
                />
                <button
                    type='submit'
                    disabled={count >= 6 || !boxes.includes("")}
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
            <span>Commputer Generated : {comWord}</span>
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
    )
}

export default Hangman
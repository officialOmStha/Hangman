import { useState, useEffect } from 'react'

const Hangman = () => {
    const [comWord, setComWord] = useState("");
    const [inp, setInp] = useState('');
    const [wrong, setWrong] = useState('');
    const [count, setCount]= useState(0);
    const [boxes, setBoxes] = useState([""])

    const words = ["apple", "ball", "cat", "danger", "eager", "gun"];

    const getWord = () => {
        const data = (words[Math.floor(Math.random() * words.length)]).toUpperCase();
        setComWord(data)
        setBoxes(Array(data.length).fill(""))
    }


    const handelInp = (e) => {
        e.preventDefault();
        if (!inp) return;

        const newBoxes = [...boxes];

        for (let i = 0; i < comWord.length ; i++) {
            if(comWord[i] === inp){
                newBoxes[i] = inp;
            }
        }

        setBoxes(newBoxes);
        setInp("");
    }
    useEffect(() => {
        getWord();
    }, [])
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
                    type="text"
                    value={inp}
                    maxLength={1}
                    placeholder='Character to check'
                    onChange={(e) => setInp((e.target.value).toUpperCase())}
                    className='py-2 px-4 rounded border-2'
                />
                <button
                    type='submit'
                    className='bg-green-400 hover:bg-green-500 py-2 px-4 rounded border-2'>
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
        </div>
    )
}

export default Hangman
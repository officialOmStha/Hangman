import { useState, useEffect } from 'react'

const Hangman = () => {
    const [comWord, setComWord] = useState("");
    const [inp, setInp] = useState('');

    const words = ["apple", "ball", "cat", "danger", "eager", "gun"];

    const getWord = () => {
        const data = words[Math.floor(Math.random() * words.length)]
        setComWord(data)
    }


    const handelInp = (e) => {
        e.preventDefault();


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
                    placeholder='Character to check'
                    onChange={(e) => setInp(e.target.value)}
                    className='py-2 px-4 rounded border-2'
                />
                <button
                    type='submit'
                    className='bg-green-400 hover:bg-green-500 py-2 px-4 rounded border-2'>
                    Put
                </button>
            </form>
            <span>Your Char: {inp}</span>
            <span>Commputer Generated : {comWord}</span>
        </div>
    )
}

export default Hangman
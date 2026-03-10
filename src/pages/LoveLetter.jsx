import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { GiCrossMark } from 'react-icons/gi'

const LoveLetter = () => {
    const navigate = useNavigate();
    const lettersData = [
        {
            id: 8,
            name: "Mani Kunju ❤️",
            msg: "One year ago today — March 27, 2025 — was the day I first met you. And in that single moment, my life changed forever. I didn’t know then that you would become my whole world, my Shrii.",
        },
        {
            id: 7,
            name: "Mani Kunju",
            msg: "365 days. 12 months. 1 whole year. And every single day, I have been grateful that it was you who walked into my life. You made ordinary days feel extraordinary.",
        },
        {
            id: 6,
            name: "Mani Kunju",
            msg: "I promise you today, on our 1st anniversary, that I will love you more every day than I did the day before. Your happiness is my mission, your smile is my reward.",
        },
        {
            id: 5,
            name: "Mani Kunju",
            msg: "You are not just my love. You are my best friend, my comfort, my home. Every laugh, every fight, every silent moment together has been a treasure I will hold forever.",
        },
        {
            id: 4,
            name: "Mani Kunju",
            msg: "I still remember the first time I saw you. My heart skipped a beat. You were so beautiful, so real, so perfectly you. And from that moment, I knew — you were meant to be mine.",
        },
        {
            id: 3,
            name: "Mani Kunju",
            msg: "Month by month, our love grew deeper. From shy smiles and careful words, to open hearts and unguarded laughter. Thank you for trusting me with your heart, Shrii.",
        },
        {
            id: 2,
            name: "Mani Kunju",
            msg: "Some love stories are written in the stars. But ours? Ours was written in every little message, every late night call, every moment where we chose each other over everything else.",
        },
        {
            id: 1,
            name: "Mani Kunju",
            msg: "March 27, 2025 — the day that started it all. One simple meeting. One moment that became the beginning of the most beautiful chapter of my life. Happy 1st Anniversary, my Shrii. 💕",
        },
    ];
    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState([]);
    const [zIndexCounter, setZIndexCounter] = useState(10);
    const lettersContainerRef = useRef(null);
    useEffect(() => {
        setLetters(lettersData);
    }, []);
    // Drag logic
    const handleMouseDown = (e) => {
        const isTouch = e.type === "touchstart";
        const startEvent = isTouch ? e.touches[0] : e;

        if (startEvent.target.tagName === "BUTTON") return;

        const letterEl = e.currentTarget;

        const rect = letterEl.getBoundingClientRect();

        const offsetX = startEvent.clientX - rect.left;
        const offsetY = startEvent.clientY - rect.top;

        const startLeft = rect.left + window.scrollX;
        const startTop = rect.top + window.scrollY;

        letterEl.style.transform = "none";
        letterEl.classList.remove("-translate-x-1/2");
        letterEl.classList.remove("-translate-y-1/2");

        letterEl.style.position = "absolute";
        letterEl.style.left = `${startLeft}px`;
        letterEl.style.top = `${startTop}px`;
        letterEl.style.margin = 0;
        letterEl.style.zIndex = zIndexCounter;
        setZIndexCounter(prev => prev + 1);

        const moveAt = (posX, posY) => {
            letterEl.style.left = `${posX - offsetX}px`;
            letterEl.style.top = `${posY - offsetY}px`;
        };

        const onMouseMove = (moveEvent) => {
            const ev = isTouch ? moveEvent.touches[0] : moveEvent;
            moveAt(ev.clientX, ev.clientY);
        };

        const onMouseUp = () => {
            if (isTouch) {
                document.removeEventListener("touchmove", onMouseMove);
                document.removeEventListener("touchend", onMouseUp);
            } else {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
        };

        if (isTouch) {
            document.addEventListener("touchmove", onMouseMove);
            document.addEventListener("touchend", onMouseUp);
        } else {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };


    const handleCloseLetter = (id) => {
        setLetters((prev) => prev.filter((l) => l.id !== id));
    };


    return (
        <main className='munna bg-[#8b0000] h-screen w-full overflow-hidden'>
            {/* Close button to go back to main page */}
            <div onClick={() => navigate('/')} className="crossAll" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 999999 }}>
                <GiCrossMark className="text-white" />
            </div>
            <section className="munna cssletter z-10">
                <div className={`envelope ${openEnvelope ? "active" : ""}`}>
                    <button
                        className="munna heart"
                        id="openEnvelope"
                        aria-label="Open Envelope"
                        onClick={() => setOpenEnvelope(true)}
                    >
                        <span className="munna heart-text">Open</span>
                    </button>
                    <div className="munna envelope-flap text-black relative">
                        <div className='munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2'>
                            <span className='munna font-sriracha md:text-2xl text-lg'>Envelope Of Our Anniversary</span>
                            <span className='munna font-dancingScript md:text-3xl text-xl'>From Mani Kunju 💕</span>
                        </div>
                    </div>
                    <div className="munna envelope-folds">
                        <div className="munna envelope-left"></div>
                        <div className="munna envelope-right"></div>
                        <div className="munna envelope-bottom"></div>
                    </div>
                </div>

                <div className="munna letters" ref={lettersContainerRef}>
                    {letters.map((letter) => (
                        <blockquote
                            key={letter.id}
                            className="munna letter center -translate-x-1/2 -translate-y-1/2"
                            id={letter.id}
                            tabIndex={0}
                            style={{
                                position: 'absolute',
                                top: window.innerWidth < 768 ? '53%' : '50%',
                                left: window.innerWidth < 768 ? '50%' : '50%',
                                transform: 'none',
                            }}

                            onMouseDown={(e) => handleMouseDown(e, letter.id)}
                            onTouchStart={handleMouseDown}
                        >
                            <button
                                className="munna closeLetter"
                                title={`Close ${letter.name}'s letter`}
                                onClick={() => handleCloseLetter(letter.id)}
                            >
                                Close {letter.name}'s letter
                            </button>
                            <p>{letter.msg}</p>
                            <cite>— {letter.name}</cite>
                        </blockquote>
                    ))}
                </div>
            </section>


            {/* ------------------ Heart Beating  */}
            <div className="munna heart-container absolute top-[20%] md:left-20 left-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            {/* ------------------ Heart Falling  */}
            <div className="munna snowflakes z-0">
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
            </div>
        </main>
    )
}

export default LoveLetter
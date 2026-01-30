// StartScreen.jsx
import { useNavigate } from "react-router-dom";
import { useSound } from "../../contexts/SoundContext";
import { useEffect, useRef, useState } from "react";
import "./startScreen.css";
import { motion } from "framer-motion";
import Loading from "../../components/loading.jsx";
const leaf =
    "https://res.cloudinary.com/djajtxjpr/image/upload/v1769788777/leaf_q4r7mv.png";
const leavesFull =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769088452/leavesFull_x40uwf.png";
const leavesLeft =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788791/leavesL_t9ayks.png";
const leavesRight =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788789/leavesR_svc0g6.png";
const rustle =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788759/rustle_b7yccz.mp3";
const rustleQuiet =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788760/rustleQuietHover_qxiotc.mp3";
const secretGardenDoor =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788799/secretGardenDoorSquare_hjekhq.png";
const songbirdLogo =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769790379/theSongbirdLogo_jpuiqp.png";
const town =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788807/townExtended-4_ee2t87.png";

function StartScreen({ onEnter }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { playBirdSound } = useSound();
    const navigate = useNavigate();
    //just
    useEffect(() => {
        //preload images
        const preLoadImage = (src) => {
            const img = new Image();
            img.src = src;
        };

        preLoadImage(leaf);
        preLoadImage(leavesFull);
        preLoadImage(leavesLeft);
        preLoadImage(leavesRight);
        preLoadImage(secretGardenDoor);
        preLoadImage(songbirdLogo);
        preLoadImage(town);

        //preload sounds

        const quietRustle = new Audio(rustleQuiet);
        quietRustle.preload = "auto";

        const rustleSound = new Audio(rustle);
        rustleSound.preload = "auto";

        //fake loading delay or real check
        setTimeout(() => setIsLoaded(true), 1500);
    }, []);

    const handleClick = () => {
        playBirdSound();
        navigate("/garden");
    };

    return (
        <div className="startScreenContainer">
            {isLoaded ? (
                <>
                    <motion.img
                        src={leaf}
                        key="leaf"
                        alt="Enter The Songbird"
                        className="leafInto"
                        whileHover={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                            transition: {
                                duration: 2,
                                repeat: Infinity,
                            },
                            y: ["0%", "-10%", "0%"], // Adds slight bounce
                            x: ["0%", "-5%", "0%"], // Adds slight bounce
                        }}
                        onClick={handleClick}
                    />
                    <div className="callToAction">
                        Enter The Songbird Garden
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default StartScreen;

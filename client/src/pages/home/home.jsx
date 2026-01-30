import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../home/home.css";
//Image URLS preloaded on start screen
const leavesLeft =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788791/leavesL_t9ayks.png";

const leavesRight =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788789/leavesR_svc0g6.png";

const leavesFull =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769088452/leavesFull_x40uwf.png";

const secretGardenDoorSquare =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788799/secretGardenDoorSquare_hjekhq.png";

const rustleSound =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788759/rustle_b7yccz.mp3";

const rustleQuietHover =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788760/rustleQuietHover_qxiotc.mp3";

const redLeaf =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788765/redLeaf_zfqfy1.png";

//bird sound context
import { useSound } from "../../contexts/SoundContext";

function Home() {
    const [exitIndex, setExitIndex] = useState(0);

    const navigate = useNavigate();

    const handleClick = () => {
        setExitIndex((prev) => prev + 1);
    };

    const handleLastClick = () => {
        playBirdSound(); //start the bird sound
    };

    const { playBirdSound } = useSound();

    const rustle = new Audio(rustleSound);
    const rustleQuiet = new Audio(rustleQuietHover);

    // Optional: so it doesn’t overlap repeatedly
    rustle.volume = 0.6;
    rustle.preload = "auto";

    rustleQuiet.volume = 0.4;
    rustleQuiet.preload = "auto";

    return (
        <motion.div
            className="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="secretGardenContainer">
                <motion.button
                    src={redLeaf}
                    alt="leaf button"
                    className="redLeaf"
                    onClick={handleClick}
                    whileHover={{
                        scale: [1.3, 1.5, 1.2],
                        rotate: [0, 5, -5, 0],
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                        },
                        y: ["0%", "-10%", "0%"], // Adds slight bounce
                        x: ["0%", "-5%", "0%"], // Adds slight bounce
                    }}
                >
                    <p className="buttonTextHome">Click Me</p>
                </motion.button>

                {/*{exitIndex >= 1 && <TownScene />}    could use this if you want to stay on the garden - otherwise - navigate to the townscene*/}

                {/* Left and Right Leaves */}

                <div className="secretGardenBush">
                    <AnimatePresence>
                        {/* Left */}
                        {exitIndex < 1 && (
                            <motion.div
                                key="LLeftD"
                                className="leavesLeftDiv"
                                onAnimationStart={() => rustle.play()}
                                initial={{ x: 0, opacity: 1 }}
                                exit={{
                                    x: "-100vw",
                                    opacity: 1,
                                    rotate: [0, 2, -2, 1, -1, 0],
                                }}
                                transition={{ duration: 1.2 }}
                            >
                                <motion.img
                                    key="leavesLeft"
                                    src={leavesLeft}
                                    onHoverStart={() => rustleQuiet.play()}
                                    whileHover={{
                                        rotate: [0, -2, 2, -1, 1, 0],
                                        transition: { duration: 0.6 },
                                        scale: [1, 1.01, 1],
                                    }}
                                    alt="leaves left"
                                    className="leavesLeft"
                                />
                            </motion.div>
                        )}
                        {/* Right */}
                        {exitIndex < 2 && (
                            <motion.div
                                key="LRightD"
                                className="leavesRightDiv"
                                onAnimationStart={() => rustle.play()}
                                initial={{ x: 0, opacity: 1 }}
                                exit={{
                                    x: "100vw",
                                    opacity: 1,
                                    rotate: [0, 2, -2, 1, -1, 0],
                                }}
                                transition={{ duration: 1.2 }}
                            >
                                <motion.img
                                    key="leavesright"
                                    src={leavesRight}
                                    onHoverStart={() => rustleQuiet.play()}
                                    whileHover={{
                                        rotate: [0, 2, -2, 1, -1, 0],
                                        transition: { duration: 0.6 },
                                        scale: [1, 1.01, 1],
                                    }}
                                    alt="leaves right"
                                    className="leavesRight"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Full Leaves */}
                <AnimatePresence>
                    {exitIndex < 3 && (
                        <motion.div
                            key="fullLeaves"
                            className="leavesFullDiv"
                            onAnimationStart={() => rustle.play()}
                            initial={{ opacity: 1 }}
                            exit={{
                                opacity: 0,
                                scale: [1, 1.03, 1],
                                rotate: [0, 0.5, 0],
                            }}
                            transition={{ duration: 1.5 }}
                            onClick={handleClick}
                        >
                            <motion.img
                                key="leavesFull"
                                src={leavesFull}
                                alt="leaves full"
                                className="leavesFull"
                                onHoverStart={() => rustleQuiet.play()}
                                whileHover={{
                                    scale: [1, 1.03, 1],
                                    rotate: [0, -1, 1, -1, 1, 0],
                                    transition: { duration: 0.6 },
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Secret Garden Door */}
                <AnimatePresence>
                    {exitIndex < 4 && (
                        <motion.div
                            key="door"
                            className="secretGardenDoorSqu"
                            initial={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            exit={{ opacity: 0, scale: 1.3 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            onClick={handleClick && handleLastClick}
                            onAnimationComplete={() => {
                                navigate("/townscene");
                            }}
                        >
                            <img
                                src={secretGardenDoorSquare}
                                alt="secret garden door"
                                className="secretGardenDoorSqu"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default Home;

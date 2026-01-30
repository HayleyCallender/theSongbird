import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import "../pages/townscene/townscene.css";

const banner =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788747/birdBanner_frlv8e.png";
const birdFlying =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788769/birdflying_dsbmrc.mp3";

function Bird2() {
    //tr
    useEffect(() => {
        const flying = new Audio(birdFlying);
        flying.loop = true;
        flying.volume = 0.2;
        flying.preload = "auto";
        flying.play();
        // cleanup function - runs when component unmounts
        return () => {
            flying.pause();
            flying.currentTime = 0; //reset to beginning
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                style={{
                    height: "auto",
                    position: "absolute",
                    top: "20%",
                    zIndex: "20000",
                }}
                initial={{
                    x: "calc(100vw + 400px)",
                }}
                animate={{
                    x: "-600px",
                    rotate: [
                        0, 0, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.1, 0,
                        0, 0, 0, 0,
                    ],
                }}
                transition={{
                    rotate: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    },
                    x: { duration: 20, ease: "linear", repeat: Infinity },
                }}
                alt="bird with instructions banner"
                className="birdBanner"
            >
                <img
                    src={banner}
                    alt="bird carrying banner with instructions for use - use keyboard arrows or mouse to explore the town"
                    style={{ width: 600 }}
                />
            </motion.div>
        </AnimatePresence>
    );
}

export default Bird2;

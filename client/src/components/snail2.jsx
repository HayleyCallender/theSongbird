import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../pages/townscene/townscene.css";
const snail =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769788776/snail_iviig0.png";

function Snail2() {
    //console.log("Snail2 rendering!");
    const navigate = useNavigate();

    const handleClick = () => {
        //console.log("navigate to..:", navigate);
        navigate("/snailBait");
    };

    return (
        <AnimatePresence>
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "5%",
                    left: 0,
                    zIndex: "9999",
                    cursor: "pointer",
                    pointerEvents: "auto !important",
                }}
                initial={{
                    x: "-400px",
                }}
                animate={{
                    x: "calc(100vw + 400px)",
                    rotate: [0, 0, 0, 1, 2, 2, 3, 4, 5, 4, 3, 2, 1, 0, 0, 0],
                }}
                transition={{
                    rotate: { duration: 10, repeat: Infinity },
                    x: { duration: 40, ease: "linear", repeat: Infinity },
                }}
                onClick={handleClick}
            >
                <button
                    className="flag"
                    style={{
                        width: 250,
                        height: 50,
                        backgroundColor: "lightblue",
                        position: "absolute",
                        fontFamily: "courier",
                        mt: "100px",
                        ml: "50px",
                        cursor: "pointer",
                        pointerEvents: "auto !important",
                        zIndex: "9999",
                    }}
                >
                    Click to play "Snail-Bait"!
                </button>
                <div
                    className="flagPole"
                    style={{
                        width: 10,
                        height: "150px",
                        backgroundColor: "brown",
                        mt: "100px",
                        ml: "50px",
                        position: "absolute",
                    }}
                ></div>
                <img
                    className="snailImg"
                    src={snail}
                    alt="snail moving slowly across the screen"
                    style={{ transform: "rotate(-8deg)", width: 300 }}
                />
            </motion.div>
        </AnimatePresence>
    );
}

export default Snail2;

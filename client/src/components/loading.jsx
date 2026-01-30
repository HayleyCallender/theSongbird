import "../pages/startScreen/startScreen.css";
import { motion } from "framer-motion";
const songbirdLogo =
    "https://res.cloudinary.com/djajtxjpr/image/upload/f_auto,q_auto/v1769790379/theSongbirdLogo_jpuiqp.png";

function Loading() {
    return (
        <div className="loadingContainer w-full h-full justify-center align-center flex ">
            <div className="imageTextLoading  h-auto flex-col justify-center self-center">
                <motion.img
                    className="loadingImage w-32 h-32 text-gray-500"
                    key="loadingImage"
                    src={songbirdLogo}
                    alt="songbird Logo"
                    animate={{
                        rotate: 360, //rotation 360
                        y: ["0%", "-5%", "0%"], // Adds slight bounce
                    }}
                    transition={{
                        repeat: Infinity, //continuous rotation
                        duration: 5, // 5 seconds to rotate
                        ease: "linear", // no stopping
                    }}
                ></motion.img>
                <p className="loadingText text-center">Loading ...</p>
            </div>
        </div>
    );
}

export default Loading;

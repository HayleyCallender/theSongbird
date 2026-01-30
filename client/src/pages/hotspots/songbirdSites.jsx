import "./hotspots.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./ogruRecords.css";
import "./songbirdSites.css";
import "../../fonts/fonts.css";
import Read from "./read.jsx";
import Sites from "./sites.jsx";
import Typewriter from "../../components/typewriter.jsx";
import Loading from "../../components/loading.jsx";
import Button from "../../components/button.jsx";
import BackToTop from "../../components/backToTop/backToTop.jsx";
import Nav from "../../components/nav.jsx";
import "../townscene/townscene.css";
import "../home/home.css";
//import UseImagePreloader from '../../components/useImagePreloader.jsx';

const optionCards = [
    {
        id: "read",
        label: "Read",
        color: "rgba(120, 178, 32, 0.621)",
        colorTwo: "rgb(105, 120, 81)",
        p: "Read the story",
    },
    {
        id: "sites",
        label: "Sites",
        color: "rgba(89, 37, 37, 0.502)",
        colorTwo: "rgb(100, 81, 81)",
        p: "Browse the work",
    },
];

function SongbirdSites() {
    const [clicked, setClicked] = useState();
    const [complete, setComplete] = useState(false);
    const [showingProjects, setShowingProjects] = useState(false);
    //const bgImageUrl = 'https://res.cloudinary.com/djajtxjpr/image/upload/v1769088588/SongbirdSites_bybkpr.png';
    //const imageLoaded = UseImagePreloader(bgImageUrl);

    const handleGreetingComplete = () => {
        //STORING LOCAL STORAGE GREETINGS TO ENSURE TYPING DOESN'T HAPPEN TWICE
        setComplete(true);
        localStorage.setItem("greetingComplete", "true");
    };

    useEffect(() => {
        const stored = localStorage.getItem("greetingComplete"); //RETRIEVING GREETINGS STATE
        if (stored === "true") {
            setComplete(true);
        }
    }, []);

    // When they click the button STORE IN LOCAL STORAGE FOR RETURN TO PAGE AFTER FOLLOWING EXTERNAL LINK
    const handleShowProjects = () => {
        setShowingProjects(true);
        localStorage.setItem("webDevStoreView", "projects");
    };

    useEffect(() => {
        const savedView = localStorage.getItem("webDevStoreView"); //RETRIEVING STORE STATE - SHOULD SHOW SITES LOADED
        if (savedView === "projects") {
            setShowingProjects(true);
        }
    }, []);

    return (
        <motion.div
            className="page scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="sitesContainer">
                <motion.div
                    className="backdrop scrollbar-hide"
                    initial={{ y: 500 }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                    animate={{ y: 0, height: "auto" }}
                >
                    <Greetings setComplete={setComplete} />
                    {complete && (
                        <motion.div className="ogruCardContainer">
                            {optionCards.map(
                                ({ id, label, color, colorTwo, p }) => (
                                    <OgruOptionCard
                                        key={id}
                                        id={id}
                                        label={label}
                                        p={p}
                                        color={color}
                                        colorTwo={colorTwo}
                                        onClick={() => {
                                            setClicked(id);
                                            setShowingProjects(true);
                                            handleShowProjects;
                                            setTimeout(() => {
                                                document
                                                    .getElementById(
                                                        "contentSection"
                                                    )
                                                    .scrollIntoView({
                                                        behavior: "smooth",
                                                    });
                                            }, 200); // small delay to allow animation if needed
                                        }}
                                    />
                                )
                            )}
                        </motion.div>
                    )}
                    <motion.div
                        id="contentSection"
                        className="mt-10 optionPage"
                    >
                        <AnimatePresence mode="wait">
                            {clicked === "read" && (
                                <motion.div
                                    key="read"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Read />
                                </motion.div>
                            )}

                            {clicked === "sites" && (
                                <motion.div
                                    key="sites"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {showingProjects && <Sites />}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <div className="magicLeafDiv">
                        <Button
                            className="magicLeafBack"
                            id="magicLeafText"
                            text="Exit"
                            to={"/townscene"}
                            style={{ cursor: "pointer" }}
                        ></Button>
                    </div>
                    <Nav />
                </motion.div>
            </div>
            <BackToTop containerSelector=".App" />
        </motion.div>
    );
}

function Greetings({ setComplete, complete }) {
    return (
        <>
            {complete ? (
                <motion.div className="greetings">
                    <motion.h1 className="ogruTitle">Songbird Sites</motion.h1>
                    <h2 className="ogruText">Hi, Welcome back</h2>
                </motion.div>
            ) : (
                <motion.div className="greetings">
                    <motion.h1 className="ogruTitle">Songbird Sites</motion.h1>
                    <Typewriter
                        lines={[
                            " Good day to you. ",
                            " What would you like to do? ",
                        ]}
                        speed={70}
                        pauseBetween={200}
                        className="ogruText"
                        onComplete={() => {
                            setComplete(true);
                        }} // trigger when typing is complete
                    />
                </motion.div>
            )}
        </>
    );
}

function OgruOptionCard({ label, color, p, colorTwo, onClick }) {
    return (
        <motion.button
            className="ogruOptionCard"
            style={{ backgroundColor: color }}
            onClick={onClick}
            whileHover={{ backgroundColor: colorTwo }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
        >
            <motion.h1 className="optionTitle">{label}</motion.h1>
            <motion.p className="optionText">{p}</motion.p>
        </motion.button>
    );
}

export default SongbirdSites;

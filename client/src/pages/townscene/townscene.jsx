import "./townscene.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PanoramaViewer from "../../components/panoramaViewer.jsx";
import Bird2 from "../../components/bird2.jsx";
import Snail2 from "../../components/snail2.jsx";
import Loading from "../../components/loading.jsx";
import DropLeaves from "../../components/dropLeaves.jsx";
import { useSound } from "../../contexts/SoundContext";

const town =
    "https://res.cloudinary.com/djajtxjpr/image/upload/v1769788807/townExtended-4_ee2t87.png";
const gust =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788753/gustOwind_c4dhy5.mp3";
const leaf =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788754/leafFall_uiae0c.mp3";
const shop =
    "https://res.cloudinary.com/djajtxjpr/video/upload/v1769788764/shopDoorBellOpenClose_hu6wn8.mp3";

const hotspots = [
    { id: "ogruRecords", label: "Ogru Records", position: "20%" },
    { id: "songbirdDesigns", label: "Songbird Design", position: "38%" },
    { id: "noticeboard", label: "Noticeboard", position: "52%" },
    { id: "songbirdSites", label: "Songbird Sites", position: "70%" },
];

function TownScene() {
    const navigate = useNavigate();
    const [hasAppeared, setHasAppeared] = useState([]);
    const [loading, setLoading] = useState(true);
    const { stopBirdSound, playBirdSound } = useSound();

    const gustOwind = new Audio(gust);
    gustOwind.volume = 0.5;
    gustOwind.preload = "auto";

    const leafFall = new Audio(leaf);
    leafFall.volume = 0.6;
    leafFall.preload = "auto";

    const door = new Audio(shop);
    door.volume = 0.5;
    door.preload = "auto";

    useEffect(() => {
        playBirdSound();

        return () => {
            // only stop when nagigating to shops
        };
    }, []);
    //load saved state on mount
    useEffect(() => {
        loadLeafState();
    }, []);

    useEffect(() => {
        if (!loading && hasAppeared.length >= 0) {
            saveLeafState();
        }
    }, [hasAppeared, loading]);

    const loadLeafState = () => {
        //console.log("local storage exists?",localStorage.getItem("leaf-state"));
        try {
            const result = localStorage.getItem("leaf-state");
            //console.log("loaded result:", result);
            if (result) {
                setHasAppeared(JSON.parse(result));
            }
        } catch (error) {
            console.error("No saved state yet", error);
        } finally {
            setLoading(false);
        }
    };

    const saveLeafState = () => {
        //console.log("trying to save:", hasAppeared);
        try {
            localStorage.setItem("leaf-state", JSON.stringify(hasAppeared));
            //console.log("save successful!", hasAppeared);
        } catch (error) {
            console.error("Failed to save state:", error);
        }
    };

    const dropLeaf = (leafId) => {
        if (!hasAppeared.includes(leafId)) {
            setHasAppeared([...hasAppeared, leafId]);
        }
    };

    const dropAllLeaves = () => {
        //console.log("drop all leaves was clicked");

        const allLeafIds = hotspots.map((leaf) => leaf.id);
        // Shuffle but keep consistent timing
        const shuffled = [...allLeafIds].sort(() => Math.random() - 0.5);

        shuffled.forEach((leafId, index) => {
            setTimeout(() => {
                setHasAppeared((prev) => [...prev, leafId]);
            }, index * 150);
        });
    };

    const resetLeaves = () => {
        //console.log("reset leaves was clicked");
        setHasAppeared([]);
        gustOwind.play();
        try {
            localStorage.removeItem("leaf-state");
        } catch (error) {
            console.error("Failed to delete state:", error);
        }
    };

    const handleNavigation = (destination) => {
        stopBirdSound(); // Stop when entering a shop
        navigate(`/${destination}`);
    };

    if (loading) return <Loading className="w-sm" />;

    const variants = {
        initial: { opacity: 0, x: 200 },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.2, ease: "easeOut" },
        },
        exit: { opacity: 0, x: -200, transition: { duration: 1 } },
    };

    return (
        <motion.div
            className="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <PanoramaViewer src={town} className="townContainer">
                <DropLeaves
                    hasAppeared={hasAppeared}
                    dropAllLeaves={dropAllLeaves}
                    resetLeaves={resetLeaves}
                    hotspots={hotspots}
                />
                {hotspots.map(({ id, label, position }) => {
                    return (
                        <HotspotButton
                            leafFall={leafFall}
                            key={id}
                            id={id}
                            label={label}
                            position={position}
                            hasAppeared={hasAppeared.includes(id)}
                            onHover={() => dropLeaf(id)}
                            onClick={() => {
                                //console.log({ label }, "was clicked");
                                handleNavigation(id);
                                door.play();
                            }}
                        />
                    );
                })}
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        overflow: "hidden",
                    }}
                >
                    <Bird2 />
                    <Snail2 />
                </div>
            </PanoramaViewer>
        </motion.div>
    );
}

function HotspotButton({
    label,
    position,
    onClick,
    hasAppeared,
    onHover,
    leafFall,
}) {
    const buttonVariants = {
        initial: { opacity: 0, y: -300, rotate: -10, scale: 1 },
        visible: {
            opacity: 1,
            y: ["-500%", "10px"],
            rotate: [-40, 20],
            transition: {
                staggerChildren: 0.2,
                duration: 1.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 50,
            },
        },
        exit: {
            opacity: 0,
            x: -400,
            rotate: [-180, 0, 180],
            transition: { staggerChildren: 0.2, duration: 2, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            style={{
                position: "absolute",
                top: "60%",
                left: position,
                zIndex: 200,
            }}
            className="hotspot"
            role="button"
            tabIndex={0}
            focusable="true"
            whileFocus={{ backgroundColor: "rgba(24, 239, 67, 0.256)" }}
            whileHover={{ backgroundColor: "rgba(24, 239, 67, 0.256)" }}
            onMouseEnter={() => {
                //console.log("Hovered", label);
                onHover();
            }}
            onAnimationStart={() => leafFall.play()}
        >
            <AnimatePresence>
                {hasAppeared && (
                    <motion.button
                        className="leafButton"
                        whileFocus={{
                            scale: [1, 1.4, 1],
                            rotate: [0, 5, -5, 0],
                            transition: {
                                duration: 2,
                                repeat: Infinity,
                            },
                        }}
                        whileHover={{
                            scale: [1, 1.4, 1],
                            rotate: [0, 5, -5, 0],
                            transition: {
                                duration: 2,
                                repeat: Infinity,
                            },
                        }}
                        whileTap={{ scale: 0.8 }}
                        onClick={onClick}
                        variants={buttonVariants}
                        initial="initial"
                        animate="visible"
                        exit="exit"
                    >
                        <p className="buttonText">{label}</p>
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default TownScene;

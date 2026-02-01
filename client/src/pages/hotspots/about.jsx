import './ogruRecords.css';
import { motion } from 'framer-motion';
import Typewriter from '../../components/typewriter.jsx';

function About() {
    return (
        <motion.div
            className="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="topicContainer">
                <h1 className="topicTitle">About</h1>
                <Typewriter
                    className="topicText ogruText"
                    lines={[
                        "I have learned through necessity to design assets and graphic elements for my web design projects and musical promotion and marketing.",
                        "The projects that you can view in Designs use Adobe Creative Suite and mostly Photoshop, InDesign and Illustrator but I have also created videos using Premier Pro.",
                        "I have included these projects to showcase my skills that are beneficial to website development and design.",
                        "I like to mix drawings or photographed elements with graphics. I like the textures that can create. My plan for this portfolio is to develop some drawings for the town and backgrounds. "
                   
                    ]}
                    speed={20}
                    pauseBetween={1000}
                ></Typewriter>
            </div>
        </motion.div>
    );
}

export default About;
"use client";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <motion.div 
            initial={{ opacity: 90, y: 0 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white pt-10 bg-black min-h-[40vh] mt-24 md:mt-32 flex flex-col items-center justify-center px-4"
        >
            {/* Animated Title */}
            <motion.div 
                className="text-4xl md:text-5xl lg:text-6xl font-bold flex flex-wrap justify-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.span 
                    className="text-purple-500"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    Welcome
                </motion.span>
                <motion.span 
                    className="text-white mx-2 md:mx-4"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    Defi-Tasker
                </motion.span>
            </motion.div>

            {/* Subtitle with Smooth Fade-in */}
            <motion.div 
                className="text-lg md:text-2xl text-center pt-6 md:pt-8 w-full px-2 md:px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
            >
                ONE STOP SOLUTION TO GET YOUR TASK DONE !!
            </motion.div>
        </motion.div>
    );
};

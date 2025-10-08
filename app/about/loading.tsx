'use client'
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const gradient =
    "bg-gradient-to-br from-[#00c6fb] via-[#0296c7] to-[#005c82]";

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <motion.div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 ${gradient}`}
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1.2,
                    ease: "easeInOut",
                }}
            >
                {/* Wrench Icon (SVG, styled to match Toolinger logo) */}
                <div className="gradient-bg p-2 rounded-lg">
                    <Wrench className="h-6 w-6 text-white" />
                </div>
                {/* <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M14.7 6.3a5 5 0 0 1-6.6 6.6l-4.1 4.1a2 2 0 1 0 2.8 2.8l4.1-4.1a5 5 0 1 0 6.6-6.6z" />
        </svg> */}
            </motion.div>
            <div className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00c6fb] to-[#0296c7] mb-2">
                Toolinger
            </div>
            <div className="text-muted-foreground text-base tracking-wide">
                Loading, please wait...
            </div>
        </div>
    );
}
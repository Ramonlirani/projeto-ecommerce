import React from "react";
import { motion } from "framer-motion";

interface LoadAnimateProps {
   children: React.ReactNode;
   amount?: number;
}

function LoadAnimate({ children, amount = 0.5 }: LoadAnimateProps) {
   return (
      <>
         <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
               duration: 0.6,
            }}
            viewport={{ once: false, amount: amount }}
         >
            {children}
         </motion.div>
      </>
   );
}

export default LoadAnimate;

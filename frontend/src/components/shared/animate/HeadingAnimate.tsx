import React from "react";
import { motion } from "framer-motion";

interface HeadingAnimate {
   children: React.ReactNode;
   amount?: number;
}

function HeadingAnimate({ children, amount = 0.5 }: HeadingAnimate) {
   return (
      <>
         <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
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

export default HeadingAnimate;

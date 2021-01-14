import Link from "next/link";
import Navmenu from "./navmenu";
import styles from "./layout.module.scss";
import { useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useRouter } from "next/router";

const variations = {
    enter: (direction) => {
        return {
            position: "relative",
            opacity: 0,
            x: direction < 0 ? 500 : direction === 0 ? 0 : -500,
            scale: direction === 0 ? 0.75 : 1,
        };
    },
    center: {
        scale: 1,
        opacity: 1,
        x: 0,
    },
    exit: (direction) => {
        return {
            position: "absolute",
            width: "100%",
            opacity: 0,
            scale: direction === 0 ? 1.25 : 1,
            x: direction > 0 ? 500 : direction === 0 ? 0 : -500,
            transitionEnd: {
                width: "unset",
            },
        };
    },
};

export default function Layout({ children }) {
    const [dir, setPage] = useState(0);
    const router = useRouter();

    return (
        <>
        
            <nav className={styles.navbar}>
                <Link href="/">
                    <a className="navbar-brand">Navbar</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <Navmenu setPage={setPage} />
            <AnimatePresence custom={dir}>
                <motion.div
                    key={router.pathname}
                    custom={dir}
                    transition={{
                        x: { type: "tween", duration: 0.5 },
                        opacity: { duration: 0.3 },
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variations}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    );
}

"use client";
import styles from "./page.module.scss";
import cardData from "../../data.json";
import Card from "./component/Card";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  const mainRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  const cards = cardData.map((card, index) => {
    const targetScale = 1 - (cardData.length - index) * 0.05;
    return (
      <Card
        key={index}
        index={index}
        {...card}
        range={[index * 0.25, 1]}
        targetScale={targetScale}
        progress={scrollYProgress}
      />
    );
  });
  return (
    <main className={styles.main} ref={mainRef}>
      {cards}
    </main>
  );
}

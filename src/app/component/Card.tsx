"use client";
import Image from "next/image";
import "./card.scss";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ICardData {
  title: string;
  description: string;
  src: string;
  color: string[];
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export default function Card(data: ICardData) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const cardScale = useTransform(data.progress, data.range, [
    1,
    data.targetScale,
  ]) as unknown as number;
  return (
    <div className="cardContainer" ref={cardRef}>
      <motion.div
        className="card"
        style={{
          scale: cardScale,
          top: `calc(-10% + ${data.index * 25}px)`,
          backgroundColor: data.color[0],
          border: `1px solid ${data.color[1]}`,
          boxShadow: `0px 5px 15px 5px ${data.color[1]}`,
          color: data.color[2],
        }}
      >
        <h3 className="card__title">{data.title}</h3>
        <div
          className="card__imgContainer"
          style={{
            border: `1px solid ${data.color[3]}`,
            boxShadow: `0px 0px 5px 10px ${data.color[3]}`,
          }}
        >
          <motion.div
            style={{ scale: imageScale }}
            className="card__imgContainer__inner"
          >
            <Image
              className="card__imgContainer__inner--img"
              src={data.src}
              alt={data.title}
              fill
            />
          </motion.div>
        </div>
        <p className="card__description">{data.description}</p>
      </motion.div>
    </div>
  );
}

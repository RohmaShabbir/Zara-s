"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Truck } from "lucide-react";
import ButtonLink from "@/app/components/ui/ButtonLink";
import Magnetic from "@/app/components/effects/Magnetic";

const words = ["Dress", "the", "way", "you"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="container grid items-center gap-12 py-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:py-16">
        {/* text */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs uppercase tracking-[0.3em] text-muted"
          >
            New season &middot; 2026
          </motion.p>

          <h1 className="font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.9]">
            {words.map((w, i) => (
              <span
                key={w}
                className="mr-[0.25em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block italic text-plum"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                feel.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 max-w-md text-lg text-muted"
          >
            Timeless pieces, soft colours and easy silhouettes. Curated for the
            way you actually live.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Magnetic>
              <ButtonLink href="/shop?sort=newest">
                Shop the drop <ArrowRight size={16} />
              </ButtonLink>
            </Magnetic>
          </motion.div>
        </div>

        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
        >
          <div className="absolute -right-10 top-10 -z-10 h-72 w-72 rounded-full bg-blush/50 blur-3xl" />

          <div className="relative aspect-[3/4] overflow-hidden rounded-b-3xl rounded-t-[999px] bg-ink/5">
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-x-0 -top-[8%] h-[116%]"
            >
              <Image
                src="/images/w-jacket.jpg"
                alt="Woman wearing a classic trench jacket"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* floating badge */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-3 top-16 grid h-24 w-24 place-items-center rounded-full bg-plum text-center text-[10px] uppercase leading-tight tracking-widest text-paper shadow-xl"
          >
            New
            <br />
            drop
          </motion.div>

          {/* glass card */}
          <div className="absolute -bottom-4 left-2 flex items-center gap-3 rounded-2xl bg-paper/80 p-3 pr-5 shadow-lg backdrop-blur-md lg:-left-10">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-blush">
              <Truck size={18} />
            </span>
            <p className="text-sm leading-tight">
              <span className="block font-medium">Free shipping</span>
              <span className="text-muted">on orders over $55</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export const ContainerScroll = ({
  users,
  titleComponent,
}: {
  users: {
    name: string;
    designation: string;
    image: string;
    badge?: string;
  }[];
  titleComponent: string | React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[80rem] flex items-center justify-center relative p-20"
      ref={containerRef}
    >
      <div
        className="py-40 w-full relative pt-0"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          users={users}
        />
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  users,
}: {
  rotate: any;
  scale: any;
  translate: any;
  users: {
    name: string;
    image: string;
    badge?: string;
  }[];
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl  mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="bg-foreground h-full w-full rounded-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-y-scroll p-4 ">
        {users.map((user, idx: number) => (
          <motion.div
            key={`comuna-${idx}`}
            className="bg-card rounded-md cursor-pointer relative"
            style={{ translateY: translate }}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <div className="absolute top-2 right-2 rounded-full text-xs font-bold bg-muted px-2 py-1">
              {user.badge}
            </div>
            <Image
              src={user.image}
              className="rounded-tr-md rounded-tl-md text-sm "
              alt="thumbnail"
              width={200}
              height={200}
            />
            <div className="p-4 space-y-1">
              <h1 className="font-semibold text-sm">{user.name}</h1>
              <Button size='icon' variant='outline'>
                <ArrowRightIcon></ArrowRightIcon>
              </Button>
            </div>
          </motion.div>
        ))}
        <div className="grow flex justify-center items-center col-span-full">
          <Button variant="secondary" size="lg">
            VER MAS COMUNAS
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

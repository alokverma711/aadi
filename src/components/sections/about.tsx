import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center min-h-[120vh] py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="about"
          title="About myself"
          desc="A glimpse into who I am."
          className="mb-12 md:mb-20 mt-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-sm opacity-70" />
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-background shadow-2xl">
              <Image
                src="/assets/profile.jpg"
                alt="Aditi Prachi Tigga"
                fill
                sizes="(max-width: 768px) 10rem, 12rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6 text-lg text-muted-foreground leading-relaxed bg-background/40 backdrop-blur-md border border-border/60 rounded-2xl p-6 md:p-10 shadow-xl"
        >
          <p>
            I am <strong className="text-foreground">Aditi Prachi Tigga</strong>,
            a third-year B.Tech student specializing in Computer Science and
            Engineering (Data Science). I have a strong foundation in{" "}
            <strong className="text-foreground">
              Data Structures and Algorithms (DSA)
            </strong>{" "}
            and proficiency in{" "}
            <strong className="text-foreground">Java programming</strong>.
            Alongside my technical skills, I have a creative edge in{" "}
            <strong className="text-foreground">
              graphic designing and animation
            </strong>
            , allowing me to combine logic with visual creativity.
          </p>
          <p>
            I possess excellent English communication skills, with a strong
            passion for public speaking, debating, and expressing ideas
            confidently. I actively engage in extracurricular activities that
            help me develop leadership, teamwork, and interpersonal skills. I am
            a passionate, creative, and enthusiastic learner who enjoys exploring
            new opportunities, taking on challenges, and continuously growing
            both personally and professionally.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;

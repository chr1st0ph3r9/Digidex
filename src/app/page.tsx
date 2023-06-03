"use client";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import digimonlogo from "/Materials/Logos/digimon.png";
import digidexLogo from "/Materials/Logos/DigidexLogoImage.png";
import githubIcon from "/Materials/Logos/github-mark.svg";
import linkedinIcon from "/Materials/Logos/LI-In-Bug.png";
import digidexLogoText from "/Materials/Logos/digidexLogoText.png";
import heartIcon from "/Materials/Logos/heartIcon.png";
import DigimonList from "./components/digimonList";
import DigimonDetails from "./components/digimonDetails";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [digimonId, setDigimonId] = useState<number>();

  return (
    //entire page
    <main className={styles.main}>
      {/* Left part of the page/ the list group */}
      <div className={styles.listGroup}>
        {/* extra elements of the list */}

        {/* starting the list of digimons */}
        <DigimonList selectDigimon={setDigimonId} />
      </div>

      {/* right/main part of the page */}
      <div className={styles.mainRight}>
        {/* Nav bar */}
        <div className={styles.bar}>
          {/* left part of the navbar */}
          <div className={styles.digimonLogoGroup}>
            <p>from</p>
            <Image
              src={digimonlogo}
              alt="Digimon logo"
              className={styles.digimonLogo}
              width={100}
              priority
            />
          </div>
          {/* Right part of the navbar */}

          <div className={styles.digidexGroup}>
            <Image
              src={digidexLogoText}
              alt="Digidex logo"
              className={styles.digidexLogoText}
              width={100}
              priority
            />

            <Image
              src={digidexLogo}
              alt="Digidex logo"
              className={styles.digidexLogo}
              width={100}
              priority
            />
          </div>
        </div>

        <div className={styles.subRightpage}>
          {/* details section */}
          {digimonId && (
            <DigimonDetails
              digimonId={digimonId}
              selectDigimon={setDigimonId}
            />
          )}

          {/* footer */}
          <footer className={styles.footerDiv}>
            {/* footer text */}
            <p>
              made with{" "}
              <Image
                src={heartIcon}
                alt="Heart icon"
                className={styles.heartIcon}
                width={30}
                priority
              />{" "}
              by Christopher Hayling
            </p>

            {/* social links */}
            <div className={styles.socialGroup}>
              <a href="https://github.com/chr1st0ph3r9">
                <Image
                  src={githubIcon}
                  alt="Github link"
                  className={styles.githubIcon}
                  width={35}
                  priority
                />
              </a>

              <a href="https://www.linkedin.com/in/christopher19/">
                <Image
                  src={linkedinIcon}
                  alt="Linkedin link"
                  className={styles.linkedinIcon}
                  width={35}
                  priority
                />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

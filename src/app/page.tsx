import Image from "next/image";
import { Inter } from "next/font/google";
import sortListItem from "/Materials/Logos/sortListIcon.png";
import styles from "./page.module.css";
import digimonlogo from "/Materials/Logos/digimon.png";
import digidexLogo from "/Materials/Logos/DigidexLogoImage.png";
import githubIcon from "/Materials/Logos/github-mark.svg";
import linkedinIcon from "/Materials/Logos/LI-In-Bug.png";
import digidexLogoText from "/Materials/Logos/digidexLogoText.png";
import heartIcon from "/Materials/Logos/heartIcon.png";
import digimonImage from "/Materials/Logos/digimonImg.png";
import digimonField from "/Materials/Logos/digimonField.png";
import DigimonList from "./components/digimonList";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    //entire page
    <main className={styles.main}>
      {/* Left part of the page/ the list group */}
      <div className={styles.listGroup}>
        {/* starting the list of digimons */}

        <DigimonList />

        {/* extra elements of the list */}
        <div className={styles.extraList}>
          {/* Sorting button in the list */}
          <Image
            src={sortListItem}
            alt="Sorting icon"
            className={styles.sortingIcon}
            width={100}
            priority
          />
        </div>
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
          <div className={styles.mainDetailsGroup}>
            <h3 className={styles.digimonName}>Garunimon</h3>

            <div className={styles.digimonDetailsGroup}>
              <div className={styles.digimonInfo}>
                <div className={styles.digimonLevel}>
                  <h4>Level</h4>
                  <p>Ultimate</p>
                </div>
                <div className={styles.digimonAtribute}>
                  <h4>Atribute</h4>
                  <p>Vaccine</p>
                </div>
                <div className={styles.digimonType}>
                  <h4>Type</h4>
                  <p>Holy knight</p>
                </div>
              </div>

              <Image
                className={styles.digimonImage}
                src={digimonImage}
                alt="Digimon image"
                width={420}
                priority
              />
            </div>

            <div className={styles.digimonField}>
              <h4>Fields</h4>
              <Image
                className={styles.digimonField}
                src={digimonField}
                alt="Digimon Field"
                width={100}
                priority
              />
            </div>
          </div>
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
              <Image
                src={githubIcon}
                alt="Github link"
                className={styles.githubIcon}
                width={35}
                priority
              />

              <Image
                src={linkedinIcon}
                alt="Linkedin link"
                className={styles.linkedinIcon}
                width={35}
                priority
              />
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

import digimonImage from "/Materials/Logos/digimonImg.png";
import digimonField from "/Materials/Logos/digimonField.png";
import scrollIcon from "/Materials/mouseIcon.svg";
import styles from "src/app/page.module.css";
import Image from "next/image";
import useSWR from "swr";
import { type } from "os";
import { Lovers_Quarrel } from "next/font/google";

import attackIcon from "/Materials/attacksIcon.svg"

import priorEvolutionImgShape from "/Materials/priorFormShape.svg"
import priorEvolutionImgComplete from "/Materials/priorFormComplete.svg"

import nextEvolutionImgShape from "/Materials/digiEvolveShape.svg"
import nextEvolutionImgComplete from "/Materials/digiEvolveComplete.svg"

import PriorEvolutionsPage from "./priorForms"

import NextEvolutionsPage from "./nextForms"
import { useState } from "react";



enum actualPageOptions {
  priorForms = "list",
  details = "details",
  nextForms = "nextForms",

}

export default function DigimonDetails({
  digimonId,
  selectDigimon,
}: {
  digimonId: number;
  selectDigimon: (digimonId: number) => void;
}) {
  const { data: digimonResponse } = useSWR<digimonResponse>(
    `https://www.digi-api.com/api/v1/digimon/${digimonId}`,
    (url: RequestInfo | URL) => fetch(url).then((r) => r.json())
  );

  const [actualPage, setActualPage] = useState<actualPageOptions>(actualPageOptions.details);


  type digimonResponse = {
    id: number;
    name: string;
    images: image[];
    href: string;
    levels: levels[];
    types: type[];
    attributes: attribute[];
    fields: field[];
    releaseDate: number;
    descriptions: description[];
    skills: skill[];
    priorEvolutions: priorEvolution[];
    nextEvolutions: nextEvolution[];
  };

  type image = {
    href: string;
    id: number;
  };
  type levels = {
    id: number;
    level: string;
  };
  type type = {
    id: number;
    type: string;
  };
  type attribute = {
    id: number;
    attribute: string;
  };
  type field = {
    id: number;
    field: string;
  };
  type description = {
    origin: string;
    language: string;
    description: string;
  };
  type skill = {
    id: number;
    skill: string;
    translation: string;
    description: string;
  };
  type priorEvolution = {
    digimon: string;
    id: number;
    image: string;
    condition: string;
  };
  type nextEvolution = {
    digimon: string;
    id: number;
    image: string;
    condition: string;
  };

  return (
    <>
      {actualPage === actualPageOptions.details &&
        <div className={styles.mainDetailsGroup}>


          {digimonResponse?.priorEvolutions && digimonResponse?.priorEvolutions.length && digimonResponse?.priorEvolutions.length > 0 && digimonResponse?.priorEvolutions[0].digimon.toUpperCase() != "DIGITAMA" &&

            <button className={styles.priorDigimons} onClick={() => setActualPage(actualPageOptions.priorForms)}>
              <h3>PRIOR-FORM</h3>
              <Image

                className={styles.priorEvolutionImgShape}
                src={priorEvolutionImgShape}
                width={100}
                height={100}
                alt="Digimon image" />

              <Image

                className={styles.priorEvolutionImgComplete}
                src={priorEvolutionImgComplete}
                width={100}
                height={100}
                alt="Digimon image" />


              {/*
    <ul>
      {digimonResponse?.priorEvolutions &&
        digimonResponse.priorEvolutions.map((priorevolution) => {
          return (
            <li key={priorevolution.id}>
              <button
                onClick={() => {
                  selectDigimon(priorevolution.id);
                }}
              >
                <p>{priorevolution.digimon}</p>
                <Image
                  loader={() => priorevolution.image}
                  className={styles.digimonImage}
                  src={priorevolution.image}
                  width={100}
                  height={100}
                  alt="Digimon image"
                />
              </button>
            </li>
          );
        })}
    </ul> */}
            </button>
          }


          <div className={styles.digimonGroup}>
            <h2 className={styles.digimonName}>{digimonResponse?.name}</h2>

            <div className={styles.digimonDetailsGroup}>
              <div className={styles.digimonInfo}>
                <div className={styles.digimonLevel}>
                  <div className={styles.digimonTypeTitle}>
                    <h4>Level</h4>
                  </div>
                  {digimonResponse?.levels &&
                    digimonResponse.levels.map((level) => {
                      return <p key={level.id}>{level.level}</p>;
                    })}
                </div>
                <div className={styles.digimonAtribute}>
                  <div className={styles.digimonTypeTitle}>
                    <h4>Atribute</h4>
                  </div>
                  {digimonResponse?.attributes &&
                    digimonResponse.attributes.map((attributes) => {
                      return <p key={attributes.id}>{attributes.attribute}</p>;
                    })}
                </div>
                <div className={styles.digimonType}>
                  <div className={styles.digimonTypeTitle}>
                    <h4>Type</h4>
                  </div>
                  {digimonResponse?.types &&
                    digimonResponse.types.map((types) => {
                      return <p key={types.id}>{types.type}</p>;
                    })}
                </div>
                <div className={styles.digimonField}>
                  <div className={styles.digimonTypeTitle}>
                    <h4>Fields</h4>
                  </div>
                  {digimonResponse?.fields &&
                    digimonResponse.fields.map((field) => {
                      return <p key={field.id}>{field.field}</p>;
                    })}
                </div>
              </div>
              {digimonResponse?.images &&
                digimonResponse.images.map((images) => {
                  return (
                    <Image
                      loader={() => images.href}
                      className={styles.digimonImage}
                      src={images.href}
                      alt="Digimon image"
                      width={420}
                      height={420}
                      key={images.id}
                      priority />
                  );
                })}
            </div>
            <div className={styles.scrollIconGroup}>
              <p>
                scroll{" "}
                <Image
                  className={styles.scrollIcon}
                  src={scrollIcon}
                  alt="Arrow down"
                  width={100} />{" "}
                for more!
              </p>
            </div>
            <div className={styles.about}>
              <div className={styles.aboutTitle}>
                <h3>about</h3>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <div className={styles.aboutTitleIcon}>"</div>
              </div>
              <p className={styles.aboutDescription}>

                {digimonResponse?.descriptions[1] &&
                  digimonResponse.descriptions[1].language == "en_us" &&
                  digimonResponse.descriptions[1].description}
                {digimonResponse?.descriptions[0] &&
                  digimonResponse.descriptions[0].language == "en_us" &&
                  digimonResponse.descriptions[0].description}
              </p>
            </div>
            <div className={styles.skills}>
              <div className={styles.skillsTitle}>
                <h3>skills</h3>{" "}
                <div>
                  <Image
                    className={styles.attackIcon}
                    src={attackIcon}
                    alt="Arrow down"
                    width={100} />
                </div>
              </div>

              <ul className={styles.skillsList}>
                {digimonResponse?.skills &&
                  digimonResponse.skills.map((skill) => {
                    return (
                      <li key={skill.id}>
                        <p>{skill.skill}</p>
                        <p>{skill.description}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>





          {digimonResponse?.nextEvolutions && digimonResponse?.nextEvolutions.length && digimonResponse?.nextEvolutions.length > 0 &&

            <button className={styles.nextDigimons} onClick={() => setActualPage(actualPageOptions.nextForms)}>
              <h3>DIGIEVOLVE</h3>

              <Image

                className={styles.nextEvolutionImgShape}
                src={nextEvolutionImgShape}
                width={100}
                height={100}
                alt="Digimon image" />

              <Image

                className={styles.nextEvolutionImgComplete}
                src={nextEvolutionImgComplete}
                width={100}
                height={100}
                alt="Digimon image" />



            </button>

          }









        </div>}

      {digimonResponse?.priorEvolutions && actualPage == actualPageOptions.priorForms &&

        <PriorEvolutionsPage selectDigimon={digimonId => selectDigimon(digimonId)} priorFormsDigimons={digimonResponse.priorEvolutions} selectPage={setActualPage} />

      }
      {digimonResponse?.nextEvolutions && actualPage == actualPageOptions.nextForms &&

        <NextEvolutionsPage selectDigimon={digimonId => selectDigimon(digimonId)} nextFormsDigimons={digimonResponse.nextEvolutions} selectPage={setActualPage} />

      }


    </>
  );
}

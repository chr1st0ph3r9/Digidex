import digimonImage from "/Materials/Logos/digimonImg.png";
import digimonField from "/Materials/Logos/digimonField.png";
import arrowDetails from "/Materials/Logos/arrow-down.png";
import styles from "src/app/page.module.css";
import Image from "next/image";
import useSWR from "swr";
import { type } from "os";
import { Lovers_Quarrel } from "next/font/google";

export default function DigimonDetails({
  digimonId,
  selectDigimon,
}: {
  digimonId: number;
  selectDigimon: (digimonId: number) => void;
}) {
  const { data: digimonResponse } = useSWR<digimonResponse>(
    `https://www.digi-api.com/api/v1/digimon/${digimonId}`,
    (url) => fetch(url).then((r) => r.json())
  );

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

  console.log(digimonResponse?.priorEvolutions[0].id);

  return (
    <div className={styles.mainDetailsGroup}>
      <div className={styles.priorDigimons}>
        <h3>Previous digimons</h3>
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
                      priority
                    />
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={styles.digimonGroup}>
        <h2 className={styles.digimonName}>{digimonResponse?.name}</h2>

        <div className={styles.digimonDetailsGroup}>
          <div className={styles.digimonInfo}>
            <div className={styles.digimonLevel}>
              <h4>Level</h4>
              {digimonResponse?.levels &&
                digimonResponse.levels.map((level) => {
                  return <p key={level.id}>{level.level}</p>;
                })}
            </div>
            <div className={styles.digimonAtribute}>
              <h4>Atribute</h4>
              {digimonResponse?.attributes &&
                digimonResponse.attributes.map((attributes) => {
                  return <p key={attributes.id}>{attributes.attribute}</p>;
                })}
            </div>
            <div className={styles.digimonType}>
              <h4>Type</h4>
              {digimonResponse?.types &&
                digimonResponse.types.map((types) => {
                  return <p key={types.id}>{types.type}</p>;
                })}
            </div>
            <div className={styles.digimonField}>
              <h4>Fields</h4>
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
                  priority
                />
              );
            })}
        </div>

        <Image
          className={styles.arrowDetails}
          src={arrowDetails}
          alt="Arrow down"
          width={100}
          priority
        />
        <div className={styles.about}>
          <h4>about</h4>
          {digimonResponse?.descriptions[1].language == "en_us" &&
            digimonResponse.descriptions[1].description}
          {digimonResponse?.descriptions[0].language == "en_us" &&
            digimonResponse.descriptions[0].description}
        </div>
        <div className={styles.skills}>
          <h4>skills</h4>
          <ul>
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
      <div className={styles.priorDigimons}>
        <h3>Next digimons</h3>
        <ul>
          {digimonResponse?.nextEvolutions &&
            digimonResponse.nextEvolutions.map((nextevolution) => {
              return (
                <li key={nextevolution.id}>
                  <button
                    onClick={() => {
                      selectDigimon(nextevolution.id);
                    }}
                  >
                    <p>{nextevolution.digimon}</p>
                    <Image
                      loader={() => nextevolution.image}
                      className={styles.digimonImage}
                      src={nextevolution.image}
                      width={100}
                      height={100}
                      alt="Digimon image"
                      priority
                    />
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

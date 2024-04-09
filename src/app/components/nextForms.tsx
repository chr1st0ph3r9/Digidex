import styles from "src/app/nextForms.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import nextEvolutionImgShape from "/Materials/digiEvolveShape.svg"
import nextEvolutionImgComplete from "/Materials/digiEvolveComplete.svg"



enum actualPageOptions {
    priorForms = "list",
    details = "details",
    nextForms = "nextForms",

}




export default function NextForms({
    selectDigimon,
    nextFormsDigimons,
    selectPage


}: {
    selectDigimon: (digimonId: number) => void;
    nextFormsDigimons: {
        digimon: string;
        id: number;
        image: string;
        condition: string;
    }[];
    selectPage: (page: actualPageOptions) => void;

}) {





    return (

        <section className={styles.nextFormsSection}>

            <h3>DIGIEVOLUTIONS</h3>
            <div className={styles.nextFormsBackground}>
                <Image
                    className={styles.nextEvolutionImgShape}
                    src={nextEvolutionImgShape}
                    width={100}
                    height={100}
                    alt="Digimon image"
                />
                <Image
                    className={styles.nextEvolutionImgComplete}
                    src={nextEvolutionImgComplete}
                    width={100}
                    height={100}
                    alt="Digimon image"
                />


            </div>
            <button className={styles.nextFormsCloseButton} onClick={() => selectPage(actualPageOptions.details)}>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    fill="none"
                    className={styles.closeNextFormsSvg}

                >
                    <path
                        d="M7.7822 0L0.00402492 7.77817L8.01597 15.7901L0 23.8061L7.77817 31.5843L15.7941 23.5683L23.8068 31.5809L31.585 23.8028L23.5723 15.7901L31.581 7.78149L23.8028 0.0033167L15.7941 8.01195L7.7822 0Z"
                        fill="#E7EDF4"
                    />
                </svg>
            </button>

            <ul className={styles.nextFormsGroup}>
                {nextFormsDigimons &&
                    nextFormsDigimons.map((nextevolution) => {
                        return (
                            <li className={styles.priorFormsList}
                                key={nextevolution.id}>
                                <button
                                    onClick={() => {
                                        selectDigimon(nextevolution.id); selectPage(actualPageOptions.details)
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
                                    />
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </section>
    )



}

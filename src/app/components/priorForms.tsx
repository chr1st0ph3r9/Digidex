import styles from "src/app/priorForms.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import priorEvolutionImgShape from "/Materials/priorFormShapeWhite.svg"
import priorEvolutionImgComplete from "/Materials/priorFormCompleteWhite.svg"

enum actualPageOptions {
    priorForms = "list",
    details = "details",
    nextForms = "nextForms",

}


export default function PriorForms({
    selectDigimon,
    priorFormsDigimons,
    selectPage,


}: {
    selectDigimon: (digimonId: number) => void;
    priorFormsDigimons: {
        digimon: string;
        id: number;
        image: string;
        condition: string;
    }[];
    selectPage: (page: actualPageOptions) => void;

}) {


    return (

        <section className={styles.priorFormsSection}>

            <h3>PRIOR-FORMS</h3>
            <div className={styles.priorFormsBackground}>
                <Image
                    className={styles.priorEvolutionImgShape}
                    src={priorEvolutionImgShape}
                    width={100}
                    height={100}
                    alt="Digimon image"
                />
                <Image
                    className={styles.priorEvolutionImgComplete}
                    src={priorEvolutionImgComplete}
                    width={100}
                    height={100}
                    alt="Digimon image"
                />


            </div>

            <button className={styles.priorFormsCloseButton} onClick={() => selectPage(actualPageOptions.details)}>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    fill="none"
                    className={styles.closePriorFormsSvg}

                >
                    <path
                        d="M7.7822 0L0.00402492 7.77817L8.01597 15.7901L0 23.8061L7.77817 31.5843L15.7941 23.5683L23.8068 31.5809L31.585 23.8028L23.5723 15.7901L31.581 7.78149L23.8028 0.0033167L15.7941 8.01195L7.7822 0Z"
                        fill="#E7EDF4"
                    />
                </svg>
            </button>

            <ul className={styles.priorFormsGroup}>
                {priorFormsDigimons &&
                    priorFormsDigimons.map((priorevolution) => {
                        return (
                            <li className={styles.priorFormsList}
                                key={priorevolution.id}>
                                <button
                                    onClick={() => {
                                        selectDigimon(priorevolution.id); selectPage(actualPageOptions.details);
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
            </ul>
        </section>
    )



}
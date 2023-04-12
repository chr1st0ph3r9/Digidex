"use client";
import styles from "../page.module.css";
import useSWR from "swr";

type Digimon = {
  id: number;
  name: string;
  image: string;
  href: string;
};

type DigimonResponse = {
  content: Digimon[];
};

const amountOfDigimons = 1422;

export default function DigimonList() {
  const { data: digimons } = useSWR<DigimonResponse>(
    `https://www.digi-api.com/api/v1/digimon?pageSize=${amountOfDigimons}`,
    (url) => fetch(url).then((r) => r.json())
  );
  if (!digimons) return <div>loading</div>;
  return (
    <ul className={styles.lista}>
      {digimons?.content?.map((digimon) => (
        <li key={digimon.id}>{digimon.name}</li>
      ))}
    </ul>
  );
}

/*
export default function DigimonList() {

  const url = "https://www.digi-api.com/api/v1/digimon";
  const fetchDigimon = async () => {
    const getData = await fetch(url);
    const res = await getData.json;

    console.log(res);
    return (
    <ul className={styles.lista}>
      {res?.content?.map((digimon) => (
        <li key={digimon.id}>{digimon.name}</li>
      ))}
      </ul>
    )
  };
  fetchDigimon();
}
*/

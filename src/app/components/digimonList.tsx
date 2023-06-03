import { useEffect } from "react";
import styles from "../page.module.css";
import useSWR from "swr";
import { useState } from "react";
import DigimonDetails from "./digimonDetails";

type Digimon = {
  id: number;
  name: string;
  image: string;
  href: string;
};
type List = {
  totalElements: number;
};

type DigimonResponse = {
  content: Digimon[];
  pageable: List;
};

export default function DigimonList({
  selectDigimon,
}: {
  selectDigimon: (digimonId: number) => void;
}) {
  //sort icon
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: listSize } = useSWR<DigimonResponse>(
    `https://www.digi-api.com/api/v1/digimon`,
    (url) => fetch(url).then((r) => r.json())
  );

  //list of digimons

  let listSizeNumber = listSize?.pageable?.totalElements;

  const { data: digimons } = useSWR<DigimonResponse>(
    `https://www.digi-api.com/api/v1/digimon?pageSize=${listSizeNumber}`,
    (url) => fetch(url).then((r) => r.json())
  );

  const sortedDigimons = digimons?.content.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  if (!digimons) return <div>loading</div>;

  return (
    <>
      <div
        className={styles.extraList}
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        {/* Sorting button in the list */}

        <button
          className={`${styles.sortingIcon} ${
            sortOrder === "desc" ? styles.sorting : ""
          }`}
        >
          <div className={styles.firstLine}></div>

          <div className={styles.secondLine}></div>

          <div className={styles.thirdLine}></div>

          <div className={styles.forthLine}></div>
        </button>
      </div>
      <ul className={styles.lista}>
        {sortedDigimons?.map((digimon) => (
          <li key={digimon.id}>
            <button
              key={digimon.id}
              onClick={() => {
                selectDigimon(digimon.id);
              }}
            >
              <h4 className={styles.digimonInList}>{digimon.name}</h4>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

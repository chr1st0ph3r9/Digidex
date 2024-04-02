import { useEffect } from "react";
import styles from "../page.module.css";
import useSWR from "swr";
import { useState } from "react";
import DigimonDetails from "./digimonDetails";
import Image from "next/image";
import Textblock from "textblock";
import { useRef } from "react";

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
enum actualPageOptions {
  list = "list",
  details = "details",

}

const getDigimonFontSize = (nameLength: number): number => {
  if (nameLength > 25) {
    return 15;
  } else if (nameLength > 20) {
    return 17;
  } else if (nameLength >= 15) {
    return 18;
  } else if (nameLength >= 11) {
    return 25;
  } else if (nameLength > 7) {
    return 30;
  } else if (nameLength >= 5) {
    return 35;
  } else if (nameLength == 3) {
    return 80;
  } else if (nameLength == 4) {
    return 55;
  } else {
    return 30;
  }
};

export default function DigimonList({
  selectDigimon,
  selectSort,
  searchDigimon,
  filterValue,
  AttributeValue,
  selectPage

}: {
  selectDigimon: (digimonId: number) => void;
  selectSort: string;
  searchDigimon: string;
  filterValue: string;
  AttributeValue: string;
  selectPage: (page: actualPageOptions) => void;
}) {
  const [filterLevel, setFilterLevel] = useState<string | "">("");
  const [filterAttribute, setFilterAttribute] = useState<string | "">("");
  //sort icon

  const { data: listSize } = useSWR<DigimonResponse>(
    `https://www.digi-api.com/api/v1/digimon`,
    (url) => fetch(url).then((r) => r.json())
  );

  //list of digimons
  let listSizeNumber = listSize?.pageable?.totalElements;

  useEffect(() => {
    if (AttributeValue) {
      setFilterAttribute(`&attribute=${AttributeValue}`);
    } else {
      setFilterAttribute("");
    }
    if (filterValue) {
      setFilterLevel(`&level=${filterValue}`);
    } else {
      setFilterLevel("");
    }
  }, [AttributeValue, , filterValue]);

  const { data: digimons } = useSWR<DigimonResponse>(
    `https://www.digi-api.com/api/v1/digimon?pageSize=${listSizeNumber}${filterLevel}${filterAttribute}`,
    (url) => fetch(url).then((r) => r.json())
  );

  //ejemplo de link de filtro de nivel
  //https://www.digi-api.com/api/v1/digimon?level=perfect
  //ejemplo de link de atributo
  //https://www.digi-api.com/api/v1/digimon?attribute=Variable
  //
  let sortedDigimons;
  let filteredDigimons;

  if (digimons?.content) {
    sortedDigimons = digimons?.content.sort((a, b) => {
      if (selectSort === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    filteredDigimons = sortedDigimons?.filter(function (el) {
      return el.name
        .toLocaleLowerCase()
        .includes(searchDigimon.toLocaleLowerCase());
    });
  }

  if (!digimons) return <div>loading</div>;

  return (
    <>
      <div className={`${styles.listBackground}`}>
        <ul className={styles.lista}>
          {filteredDigimons?.map((digimon) => {
            const digimonFontSize = getDigimonFontSize(digimon.name.length);
            return (
              <li key={digimon.id}>
                <button
                  key={digimon.id}
                  onClick={() => {
                    selectDigimon(digimon.id);
                    selectPage(actualPageOptions.details);
                  }}
                >
                  <h4
                    id="digimonName"
                    className={`${styles["digimonInList"]} ${styles[digimon.id]
                      }`}
                    data-digimon-id={digimon.id}
                    style={{ fontSize: `${digimonFontSize}px` }}
                  >
                    {digimon.name}
                  </h4>

                  <Image
                    loader={() => digimon.image}
                    unoptimized={true}
                    className={styles.digimonImg}
                    src={digimon.image}
                    width={100}
                    height={100}
                    alt="Digimon image"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

"use client";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import digimonlogo from "/Materials/Logos/digimon.png";
import digidexLogo from "/Materials/Logos/DigidexLogoImage.png";
import githubIcon from "/Materials/Logos/github-mark.svg";
import linkedinIcon from "/Materials/Logos/LI-In-Bug.png";
import digidexLogoText from "/Materials/Logos/digidexLogoText.png";

// import backgroundDigimonIcon1 from "../../";

import filterLevelPerfectImg from "../../Materials/filters/Level-Perfect.svg";
import filterLevelUltimateImg from "../../Materials/filters/Level-Ultimate.svg";
import filterBackground1 from "../../Materials/filters/sortBackground.svg";
import filterBackground2 from "../../Materials/filters/sortBackground2.svg";
import checkedFilter from "../../Materials/Checked.svg";

import heartIcon from "/Materials/Logos/heartIcon.png";
import DigimonList from "./components/digimonList";
import DigimonDetails from "./components/digimonDetails";
import React from "react";

const inter = Inter({ subsets: ["latin"] });



enum actualPageOptions {
  list = "list",
  details = "details",

}

export default function Home() {



  const [actualPage, setActualPage] = useState<actualPageOptions>(actualPageOptions.list);


  const [digimonId, setDigimonId] = useState<number>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string | "">("");
  const [inputValue, setInputValue] = useState<string | "">("");




  const [filterPage, setFilterPage] = useState<true | false>(false);
  const [backgroundStyle, setBackgroundStyle] = useState<
    "notClosing" | "closing" | "opened"
  >("notClosing");
  const [filterValue, setFilterValue] = useState<string | "">("");
  const [attributeValue, setAttributeValue] = useState<string | "">("");
  const [tempFilterValue, setTempFilterValue] = useState<string | "">("");
  const [tempAttributeValue, setTempAttributeValue] = useState<string | "">("");




  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch(inputValue);
    }
  };

  const onChangeText = (event: {
    target: { value: SetStateAction<string | ""> };
  }) => {
    setInputValue(event.target.value);
  };

  const onClickSearch = () => {
    setSearch(inputValue);
    setTimeout(() => {
      window.blur();
    }, 1000);
  };


















  const onClickFilter = React.useCallback(() => {
    if (filterPage == true) {
      setAttributeValue(tempAttributeValue);
      setFilterValue(tempFilterValue);

      setBackgroundStyle("closing");

      setTimeout(() => {
        setFilterPage(false);
      }, 400);

      setBackgroundStyle("notClosing");
      ;
    } else {
      setFilterPage(true);

      setBackgroundStyle("opened");

    }
  }, [filterPage, tempAttributeValue, tempFilterValue]);


  const getBackgroundFilterImage = React.useCallback(() => {
    return (
      <div className={`${styles.filterBackgroundGroup} ${backgroundStyle === "closing"
        ? styles.filterBackgroundGroupEnding
        : ""
        }`}>
        <Image
          src={filterBackground1}
          alt="filter background image"
          className={`${styles.filterBackground1}  ${backgroundStyle === "closing"
            ? styles.filterBackgroundGroupEnding
            : ""
            } ${backgroundStyle === "notClosing"
              ? styles.imageBackgroundOpening
              : ""
            }`}
          width={2000}
          priority
        />
        <Image
          src={filterBackground2}
          alt="filter background image"
          className={`${styles.filterBackground2} ${backgroundStyle === "notClosing"
            ? styles.imageBackgroundOpening
            : ""
            } `}
          width={2000}
          priority
        />
      </div>
    );
  }, [backgroundStyle]);

  const onClickFilterAttributeButtom = React.useCallback((selectFilter: string) => {



    if (selectFilter == tempAttributeValue) {
      setTempAttributeValue("");


    }
    else {
      setTempAttributeValue(selectFilter);
    }

  }, [tempAttributeValue]);


  const onClickFilterButtom = React.useCallback((selectFilter: string) => {

    if (selectFilter == tempFilterValue) {
      setTempFilterValue("");

    }
    else {
      setTempFilterValue(selectFilter);
    }

  }, [tempFilterValue]);


  const FilterInfo = React.useCallback(() => {
    return (
      <div className={styles.filterinfoComponentGroup}>
        <h2 className={styles.sortTitle}>SORT BY</h2>
        <div className={styles.filterInfo}>
          <div className={styles.filterLevelGroup}>
            <h2 className={styles.filterLevelTitle}>LEVEL</h2>
            <div className={styles.filterLevelInfoGroup}>
              <button
                onClick={() => onClickFilterButtom("ultimate")}
                className={`${tempFilterValue === "ultimate" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <Image
                    src={filterLevelUltimateImg}
                    alt="filter level perfect"
                    className={styles.filterLevelUltimateImg}
                    width={20}
                    priority
                  />
                </div>
                <h3>ULTIMATE</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("armor")}
                className={`${tempFilterValue === "armor" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="41"
                    viewBox="0 0 26 41"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.24393 31.1885C5.16167 30.6976 5.1713 30.3584 5.2934 30.0309C5.38765 29.7818 5.6666 29.4231 5.91709 29.243C6.21195 29.02 6.57782 28.8763 6.9431 28.8327C7.27184 28.7935 7.65508 28.7979 7.80843 28.8422C7.97251 28.8728 8.31019 29.1204 8.55048 29.3797C8.87105 29.692 9.05769 30.0203 9.15271 30.4096C9.25642 30.8729 9.2474 31.1118 9.06817 31.5839C8.92751 31.9637 8.69438 32.2919 8.39807 32.5025C8.14902 32.695 7.74951 32.8678 7.51817 32.8954C7.28683 32.9229 6.83402 32.8517 6.52443 32.7384C6.20122 32.6142 5.81483 32.3723 5.65918 32.2031C5.46122 31.9888 5.32183 31.6424 5.24393 31.1885ZM7.94109 29.5525C7.7576 29.4617 7.36857 29.4079 7.07635 29.4428C6.77195 29.4791 6.43044 29.6199 6.22864 29.7942C6.03758 29.9547 5.84592 30.2154 5.7795 30.3861C5.71164 30.5444 5.68694 30.8603 5.69938 31.0716C5.73267 31.3556 5.88482 31.6003 6.16308 31.8676C6.55177 32.2344 6.61554 32.2518 7.33391 32.1662C7.76007 32.1154 8.17754 31.9905 8.26482 31.8925C8.35209 31.7944 8.49939 31.5766 8.58871 31.3907C8.66585 31.2062 8.72997 30.9106 8.71899 30.7116C8.70945 30.525 8.61383 30.236 8.49326 30.05C8.38632 29.875 8.1382 29.6542 7.94109 29.5525Z"
                      fill="#008CC7"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 23.2837C0 20.2645 1.04795 17.4163 2.79492 15.1274C2.37245 14.1326 1.99876 13.1172 1.7411 12.0901C-0.0335411 5.01616 -0.0941615 -1.69859 0.696131 0.385648C1.90327 3.56925 5.37768 6.78407 6.96399 7.99352H4.99078L6.8886 11.5375C8.75157 10.4772 10.8804 9.86623 13.13 9.86623C20.3097 9.86623 26 16.0893 26 23.2837C26 30.4781 20.1797 41 13 41C9.54622 41 6.40701 38.5652 4.07896 35.2372C4.22334 35.1764 4.31891 35.0927 4.31158 35.0302C4.3029 34.9562 4.20175 34.8305 4.09276 34.7434C3.98377 34.6562 3.87623 34.5814 3.85188 34.5843C3.84337 34.5853 3.8077 34.6628 3.76532 34.7761C3.19043 33.9069 2.66984 32.9841 2.21178 32.0334C2.25817 32.0319 2.28646 32.0263 2.2915 32.0162C2.32369 31.9748 2.32692 31.6865 2.28929 31.3655C2.26383 31.043 2.16965 30.7663 2.10298 30.7242C2.02559 30.6959 1.93108 30.7322 1.88962 30.7997C1.86875 30.8266 1.79996 30.868 1.70606 30.9127C0.62044 28.3363 2.03645e-07 25.6327 0 23.2837ZM6.9368 24.7774C6.707 24.2916 6.48298 23.8551 6.44066 23.81C6.39834 23.765 6.29539 23.94 6.21476 24.2C6.13558 24.4723 6.06073 24.7817 6.04941 24.8957C6.03953 25.0221 5.99253 25.253 5.92467 25.4114C5.85826 25.582 5.842 25.7592 5.88721 25.8289C5.93242 25.8987 6.25479 25.9103 6.60789 25.8682C6.97317 25.8247 7.28683 25.7622 7.30684 25.7223C7.32685 25.6823 7.16661 25.2633 6.9368 24.7774ZM12.3193 29.5229C12.2767 29.5138 12.2466 29.5073 12.2318 29.5042C12.1286 29.4664 12.1031 29.6698 12.1459 30.1404C12.209 30.7838 12.2392 30.8303 12.4827 30.8013C12.641 30.7824 13.0784 30.6176 13.4658 30.4462C13.8531 30.2749 14.1752 30.0737 14.1938 30.0214C14.1987 29.9582 13.801 29.8304 13.2951 29.728C12.8876 29.6454 12.4958 29.561 12.3193 29.5229ZM3.38112 27.3045C3.28721 27.2405 3.10515 27.1621 2.97905 27.1396C2.86513 27.1156 2.74482 27.1425 2.71553 27.2085C2.68769 27.287 2.73375 27.4693 2.82707 27.6334C2.90822 27.799 3.02154 27.9232 3.07024 27.9174C3.13257 27.9225 3.25494 27.8077 3.36222 27.6698C3.51242 27.4766 3.51591 27.4011 3.38112 27.3045ZM10.8197 26.305C10.8154 26.268 10.6907 26.2578 10.5339 26.289C10.3878 26.3064 10.1851 26.3681 10.092 26.4168C10.0097 26.4516 9.94824 26.5591 9.9691 26.6317C9.99141 26.7167 10.1198 26.8642 10.2789 26.9578C10.5349 27.1402 10.5471 27.1387 10.6877 26.7589C10.7605 26.5374 10.824 26.342 10.8197 26.305ZM8.34383 27.3012C7.92032 27.1639 7.52346 27.1486 6.85378 27.2285C6.35457 27.288 5.80028 27.4041 5.62343 27.4753C5.44803 27.5588 5.15811 27.7185 4.98705 27.8391C4.81744 27.972 4.60636 28.1724 4.53415 28.2937C4.4634 28.4273 4.46281 28.5275 4.5402 28.5559C4.60542 28.5856 4.75647 28.505 4.85447 28.3932C4.96465 28.2799 5.26241 28.0817 5.5187 27.951C5.77354 27.8079 6.34929 27.6642 6.79835 27.5981C7.39496 27.527 7.76893 27.5575 8.14229 27.6883C8.42608 27.7922 8.8748 28.0391 9.14292 28.22C9.41249 28.4132 9.77684 28.7828 9.94262 29.0385C10.1536 29.3639 10.2759 29.7749 10.3648 30.4278C10.456 31.2056 10.4362 31.4584 10.2291 32.0088C10.0978 32.3625 9.89766 32.7619 9.78893 32.8875C9.66802 33.0146 9.29516 33.3094 8.95305 33.5505C8.46133 33.8846 8.15344 33.9964 7.53248 34.0704C6.93586 34.1415 6.58625 34.1081 6.10969 33.9396C5.76068 33.8059 5.31485 33.5837 5.12413 33.4311C4.9334 33.2786 4.61922 32.9155 4.43837 32.6366C4.16855 32.2306 4.06858 31.9045 3.98463 31.1884C3.90791 30.5341 3.9303 30.0932 4.05445 29.6779C4.15219 29.3532 4.19052 29.0482 4.13602 29.0046C4.06791 28.9502 3.93482 29.0787 3.81187 29.2937C3.69965 29.4948 3.55549 29.9502 3.51079 30.306C3.46609 30.6619 3.48396 31.2356 3.56536 31.614C3.64531 31.98 3.84149 32.4949 3.99365 32.7397C4.14725 32.9968 4.52666 33.3897 4.82637 33.6294C5.12464 33.8567 5.65365 34.1567 6.01339 34.2765C6.50213 34.4436 6.86391 34.4756 7.53358 34.3958C8.11802 34.3261 8.63145 34.1772 9.02806 33.9797C9.44612 33.7546 9.8039 33.4366 10.1443 32.9704C10.4325 32.5855 10.7156 32.051 10.7947 31.7787C10.8968 31.4911 10.9062 30.9391 10.8518 30.3698C10.7678 29.6537 10.6801 29.3261 10.4224 28.9187C10.2401 28.6275 9.83057 28.1881 9.50506 27.9389C9.17954 27.6898 8.66415 27.4007 8.34383 27.3012ZM7.66939 28.1828C7.31688 28.1247 6.99019 28.076 6.95511 28.0927C6.92003 28.1094 6.6823 28.1878 6.41877 28.2568C6.15669 28.3381 5.725 28.5523 5.45015 28.7353C5.06223 29.0069 4.91493 29.2247 4.69508 29.8769C4.5402 30.346 4.44416 30.8958 4.47455 31.1551C4.50495 31.4143 4.68171 31.869 4.86545 32.1725C5.05992 32.4623 5.38629 32.824 5.61355 32.9722C5.8408 33.1204 6.20633 33.2896 6.42489 33.3637C6.65419 33.424 7.16209 33.4385 7.53954 33.3936C8.05092 33.3326 8.3939 33.2041 8.75891 32.9477C9.07957 32.7342 9.3936 32.3588 9.60442 31.9456C9.8831 31.3741 9.92371 31.194 9.83192 30.5164C9.77402 30.0225 9.63813 29.6006 9.45583 29.3093C9.30513 29.0769 8.99528 28.7508 8.75296 28.5794C8.52425 28.4189 8.03407 28.2395 7.66939 28.1828ZM11.6342 34.0947C11.5487 33.8921 11.431 33.7308 11.3551 33.7148C11.2928 33.7098 11.1446 33.815 11.0373 33.953C10.93 34.091 10.8471 34.2261 10.8636 34.2617C10.8787 34.2849 11.0622 34.3757 11.2808 34.4498C11.4872 34.5253 11.7014 34.5624 11.7336 34.521C11.7657 34.4796 11.7197 34.2973 11.6342 34.0947ZM8.49896 35.9957C8.46133 35.6747 8.44771 35.6638 7.72933 35.7495C7.23012 35.809 7.00457 35.886 7.01615 35.9847C7.02628 36.0711 7.07728 36.1903 7.13322 36.2462C7.20134 36.3007 7.39088 36.6536 7.57258 37.0451C7.75428 37.4365 7.9531 37.7634 8.01398 37.7561C8.0763 37.7612 8.18129 37.4983 8.25324 37.1642C8.32518 36.8302 8.41221 36.5193 8.46585 36.4504C8.50876 36.3952 8.52212 36.1933 8.49896 35.9957Z"
                      fill="#008CC7"
                    />
                  </svg>
                </div>
                <h3>ARMOR</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("baby II")}
                className={`${tempFilterValue === "baby II" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="29"
                    viewBox="0 0 40 29"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M29.8109 1.3141C29.7022 0.645056 28.9735 0.27565 28.3696 0.583503L22.3045 3.67549C20.1753 2.80769 17.8992 2.37365 15.9766 2.37365C13.9626 2.37365 11.4196 2.83195 9.12448 3.84712C9.06925 3.8227 9.0106 3.80274 8.94872 3.78787L1.39424 1.97299C0.76535 1.82191 0.160637 2.29856 0.160645 2.94534L0.16067 5.16562C0.160686 6.60157 0.418429 8.02585 0.921639 9.37074L1.75909 11.6089C1.85556 11.8667 2.03999 12.0536 2.2597 12.159C1.6987 14.2146 1.50011 16.3225 1.50011 18.091C1.50011 24.944 9.12364 28.0178 15.9766 28.0178C20.8103 28.0178 25.8216 26.077 28.3551 22.5285L28.3851 22.5341C42.9443 12.9383 40.7935 6.95439 37.8982 5.16193C36.2438 4.47257 33.0176 4.50015 33.3485 10.1253C33.5942 14.3037 31.7252 16.7629 30.013 17.9775C30.0306 17.7433 30.0395 17.5054 30.0395 17.2638C30.0395 15.0334 29.9187 12.2854 29.0125 9.9022C29.1864 9.77324 29.3211 9.58594 29.382 9.35365L29.5398 8.752C30.142 6.45545 30.2565 4.05821 29.8759 1.71471L29.8109 1.3141ZM23.323 11.9669C23.323 12.8806 22.5822 13.6214 21.6685 13.6214C20.7548 13.6214 20.014 12.8806 20.014 11.9669C20.014 11.0532 20.7548 10.3124 21.6685 10.3124C22.5822 10.3124 23.323 11.0532 23.323 11.9669ZM8.43283 14.4486C9.34656 14.4486 10.0873 13.7079 10.0873 12.7941C10.0873 11.8804 9.34656 11.1397 8.43283 11.1397C7.5191 11.1397 6.77837 11.8804 6.77837 12.7941C6.77837 13.7079 7.5191 14.4486 8.43283 14.4486Z"
                      fill="#008CC7"
                    />
                  </svg>
                </div>
                <h3>BABY II</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("digitama")}
                className={`${tempFilterValue === "digitama" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="43"
                    viewBox="0 0 35 43"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M34.0495 17.9735C33.27 17.5557 32.4434 17.3533 31.6196 17.4688C28.4607 17.9114 26.5375 22.8582 26.9735 25.9952C27.4094 29.1323 30.29 31.495 33.4489 31.0524C33.5422 31.0393 33.6347 31.0239 33.7264 31.0063C32.4136 34.3093 30.1601 37.1788 27.3159 39.2245C26.3264 38.2931 25.1657 37.7064 23.9624 37.7863C21.8693 37.9252 20.1684 40.0464 19.3085 42.3814C18.6567 42.4597 17.9948 42.5 17.325 42.5C7.66002 42.5 0 34.105 0 24.3996C0 19.9552 1.64301 14.5695 4.35237 10.0366C4.21941 10.4256 4.12658 10.8099 4.08074 11.175C3.76935 13.6545 5.47884 16.0499 7.97561 16.3661C10.4724 16.6822 12.811 14.7995 13.1224 12.3199C13.4337 9.84038 11.8651 5.95771 9.36834 5.64153C8.51658 5.53367 7.66683 5.85481 6.90449 6.42325C9.84549 2.91016 13.5174 0.5 17.5 0.5C19.9734 0.5 22.3269 1.42956 24.4599 2.97558C23.9072 4.69345 24.0886 6.92429 24.8051 8.35398C25.9222 10.5831 28.6651 11.614 30.9112 10.4861C32.2726 12.8527 33.3451 15.4307 34.0495 17.9735ZM18.8881 29.2531C18.4569 32.687 15.0667 35.2751 11.4261 34.8141C7.78544 34.353 5.27307 31.0174 5.7043 27.5835C6.13553 24.1497 9.71751 19.5014 13.3581 19.9624C16.9987 20.4234 19.3194 25.8192 18.8881 29.2531Z"
                      fill="#008CC7"
                    />
                  </svg>
                </div>
                <h3>DIGITAMA</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("adult")}
                className={`${tempFilterValue === "adult" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="40"
                    viewBox="0 0 46 40"
                    fill="none"
                  >
                    <path
                      d="M20 36.5C20 38.1569 21.3431 39.5 23 39.5C24.6569 39.5 26 38.1569 26 36.5L20 36.5ZM25.1213 1.37868C23.9497 0.207107 22.0503 0.207107 20.8787 1.37868L1.7868 20.4706C0.615223 21.6421 0.615223 23.5416 1.7868 24.7132C2.95837 25.8848 4.85786 25.8848 6.02944 24.7132L23 7.74264L39.9706 24.7132C41.1421 25.8848 43.0416 25.8848 44.2132 24.7132C45.3848 23.5416 45.3848 21.6421 44.2132 20.4706L25.1213 1.37868ZM26 36.5L26 3.5L20 3.5L20 36.5L26 36.5Z"
                      fill="#008CC7"
                    />
                  </svg>
                </div>
                <h3>ADULT</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("baby I")}
                className={`${tempFilterValue === "baby I" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="43"
                    height="35"
                    viewBox="0 0 43 35"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.5 4.91558C19.4977 4.91558 17.5594 5.10402 15.7203 5.45632C14.6763 2.54954 12.1567 0.5 9.21429 0.5C5.33708 0.5 2.19388 4.05834 2.19388 8.44805C2.19388 9.78911 2.48718 11.0521 3.00523 12.1603C1.0963 14.3699 0 16.9506 0 19.7078C0 27.8775 9.62585 34.5 21.5 34.5C33.3741 34.5 43 27.8775 43 19.7078C43 16.4582 41.4769 13.4531 38.8953 11.0125C39.2636 9.53427 39.2301 7.88964 38.7099 6.2726C37.3668 2.09634 33.2876 -0.314986 29.5987 0.886364C27.5773 1.54482 26.0926 3.15108 25.3843 5.1562C24.785 5.08074 24.1772 5.02252 23.5617 4.98242C22.8832 4.93801 22.1954 4.91558 21.5 4.91558ZM31.5918 15.9545C31.5918 17.174 30.6095 18.1623 29.398 18.1623C28.1864 18.1623 27.2041 17.174 27.2041 15.9545C27.2041 14.7351 28.1864 13.7468 29.398 13.7468C30.6095 13.7468 31.5918 14.7351 31.5918 15.9545ZM11.8469 18.1623C13.0585 18.1623 14.0408 17.174 14.0408 15.9545C14.0408 14.7351 13.0585 13.7468 11.8469 13.7468C10.6354 13.7468 9.65306 14.7351 9.65306 15.9545C9.65306 17.174 10.6354 18.1623 11.8469 18.1623Z"
                      fill="#008CC7"
                    />
                  </svg>
                </div>
                <h3>BABY I</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("hybrid")}
                className={`${tempFilterValue === "hybrid" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="39"
                    viewBox="0 0 30 39"
                    fill="none"
                  >
                    <path
                      d="M0.851301 32.5371C0.43825 33.076 0.670851 33.861 1.31079 34.0879L12.8422 38.1766C13.0089 38.2357 13.1883 38.2495 13.362 38.2167L27.2795 35.5878C27.6496 35.5179 27.949 35.2459 28.0541 34.8843L29.4016 30.2491C29.5376 29.7811 29.3165 29.2832 28.8781 29.0704L23.5786 26.497C23.4425 26.4309 23.2931 26.3965 23.1418 26.3965H12.4799C12.4234 26.3965 12.367 26.4013 12.3113 26.4108L4.91228 27.677C4.66384 27.7195 4.44062 27.8543 4.28728 28.0543L0.851301 32.5371Z"
                      fill="#0186BE"
                    />
                    <path
                      d="M17.3948 34C11.7383 33.7459 -0.225263 30.5746 3.81852 16.8729C6.65536 10.012 14.0208 6.13931 13.5669 0C15.9052 1.8296 20.4063 6.6272 19.7048 11.1809C19.0033 15.7345 20.4785 16.8729 21.3038 16.8729C22.6104 17.1609 25.0175 16.4257 24.1922 11.1809C28.628 15.8734 34.1477 26.519 19.458 33.5934L17.3948 34Z"
                      fill="#008CC7"
                    />
                    <path
                      d="M21.0001 25.5C21.0001 26.8807 19.8808 28 18.5001 28C17.1194 28 16.0001 26.8807 16.0001 25.5C16.0001 24.1193 17.1194 23 18.5001 23C19.8808 23 21.0001 24.1193 21.0001 25.5Z"
                      fill="#E7EDF4"
                    />
                    <path
                      d="M12.0001 24.5C12.0001 25.8807 10.8808 27 9.50013 27C8.11942 27 7.00013 25.8807 7.00013 24.5C7.00013 23.1193 8.11942 22 9.50013 22C10.8808 22 12.0001 23.1193 12.0001 24.5Z"
                      fill="#E7EDF4"
                    />
                  </svg>
                </div>
                <h3>HYBRID</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("perfect")}
                className={`${tempFilterValue === "perfect" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <Image
                    src={filterLevelPerfectImg}
                    alt="filter level perfect"
                    className={styles.filterLevelPerfectImg}
                    width={26}
                    priority
                  />
                </div>
                <h3>PERFECT</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("child")}
                className={`${tempFilterValue === "child" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="36"
                    viewBox="0 0 44 36"
                    fill="none"
                  >
                    <path
                      d="M15.0678 11.7559C15.0678 11.1345 15.5726 10.6309 16.1953 10.6309H27.8457C28.4684 10.6309 28.9731 11.1345 28.9731 11.7559V23.3809C28.9731 24.0022 28.4684 24.5059 27.8457 24.5059H16.1953C15.5726 24.5059 15.0678 24.0022 15.0678 23.3809V11.7559Z"
                      fill="#008CC7"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.7481 1.03711L8.67889 4.56836L2.63446 7.69336L0.536133 18.4121L2.63446 29.3809L9.05471 31.7246L11.2783 34.7871L22.3963 35.0684L32.5434 34.7871L36.6774 31.7246L41.7197 29.3809L43.5361 18.0371L41.4065 7.09961L35.4247 4.56836L32.5434 1.03711L22.0205 0.0683594L11.7481 1.03711ZM22.0518 27.4121C27.5175 27.4121 31.9484 22.9909 31.9484 17.5371C31.9484 12.0833 27.5175 7.66211 22.0518 7.66211C16.5861 7.66211 12.1552 12.0833 12.1552 17.5371C12.1552 22.9909 16.5861 27.4121 22.0518 27.4121ZM36.834 16.8809C39.0307 16.8809 40.8114 15.6077 40.8114 14.0371C40.8114 12.4665 39.0307 11.1934 36.834 11.1934C34.6374 11.1934 32.8566 12.4665 32.8566 14.0371C32.8566 15.6077 34.6374 16.8809 36.834 16.8809ZM40.4983 23.7871C40.4983 25.3577 38.7175 26.6309 36.5208 26.6309C34.3242 26.6309 32.5434 25.3577 32.5434 23.7871C32.5434 22.2165 34.3242 20.9434 36.5208 20.9434C38.7175 20.9434 40.4983 22.2165 40.4983 23.7871ZM6.36133 22.5059C8.43693 22.5059 10.1195 20.8269 10.1195 18.7559C10.1195 16.6848 8.43693 15.0059 6.36133 15.0059C4.28574 15.0059 2.60314 16.6848 2.60314 18.7559C2.60314 20.8269 4.28574 22.5059 6.36133 22.5059Z"
                      fill="#008CC7"
                    />
                  </svg>
                </div>
                <h3>CHILD</h3>
              </button>
              <button
                onClick={() => onClickFilterButtom("unknown")}
                className={`${tempFilterValue === "unknown" ? styles.filterActiveLevel : ""
                  }`}
              >
                <div className={styles.filterIconContainer}>
                  <p className={`${styles.filterLevelUnknown}`}>?</p>
                </div>
                <h3>UNKNOWN</h3>
              </button>
            </div>
          </div>
          {/* Filter Attributes list */}
          <div className={styles.filterAtributeGroup}>
            <h2 className={styles.filterAtributeTitle}>ATTRIBUTES</h2>
            <div className={styles.filterAtributeInfoGroup}>
              <button
                onClick={() => onClickFilterAttributeButtom("Variable")}
                className={`${tempAttributeValue === "Variable"
                  ? styles.filterActiveAttribute
                  : styles.filterOffAttribute
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="105"
                  height="105"
                  viewBox="0 0 105 105"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M52.5 105C81.4949 105 105 81.4949 105 52.5C105 23.5051 81.4949 0 52.5 0C23.5051 0 0 23.5051 0 52.5C0 81.4949 23.5051 105 52.5 105ZM52.5 86.4706C71.2614 86.4706 86.4706 71.2614 86.4706 52.5C86.4706 33.7386 71.2614 18.5294 52.5 18.5294C33.7386 18.5294 18.5294 33.7386 18.5294 52.5C18.5294 71.2614 33.7386 86.4706 52.5 86.4706Z"
                  />
                  <circle cx="52.5" cy="52.5" r="18.5" />
                </svg>
                <h3>VARIABLE</h3>
              </button>
              <button
                onClick={() => onClickFilterAttributeButtom("Free")}
                className={`${tempAttributeValue === "Free"
                  ? styles.filterActiveAttribute
                  : styles.filterOffAttribute
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M27.6946 94.7612C34.4095 98.1139 41.9845 100 50 100C77.6142 100 100 77.6142 100 50C100 41.9845 98.1139 34.4095 94.7612 27.6946L27.6946 94.7612ZM83.8237 13.1763C74.9213 4.99488 63.044 0 50 0C22.3858 0 0 22.3858 0 50C0 63.044 4.99488 74.9213 13.1763 83.8237L83.8237 13.1763Z"
                  />
                </svg>
                <h3>FREE</h3>
              </button>
              <button
                onClick={() => onClickFilterAttributeButtom("Vaccine")}
                className={`${tempAttributeValue === "Vaccine"
                  ? styles.filterActiveAttribute
                  : styles.filterOffAttribute
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="87"
                  height="107"
                  viewBox="0 0 87 107"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M86.0351 64C86.0351 87.7483 66.7834 107 43.0352 107C19.2869 107 0.0351562 87.7483 0.0351562 64C0.0351562 40.2518 31.4986 10.5122 78.6937 0.0244141C82.8888 13.6586 86.0351 40.2518 86.0351 64ZM77.6449 68.1951C77.6449 84.9927 60.7409 98.6098 39.8888 98.6098C19.0367 98.6098 2.13272 84.9927 2.13272 68.1951C2.13272 51.3976 19.0367 37.7805 39.8888 37.7805C60.7409 37.7805 77.6449 51.3976 77.6449 68.1951ZM47.2303 86.0244C51.2849 86.0244 54.5717 81.7984 54.5717 76.5854C54.5717 71.3724 51.2849 67.1464 47.2303 67.1464C43.1757 67.1464 39.8888 71.3724 39.8888 76.5854C39.8888 81.7984 43.1757 86.0244 47.2303 86.0244ZM21.0108 65.0488C21.0108 69.6826 18.1934 73.439 14.7181 73.439C11.2427 73.439 8.4254 69.6826 8.4254 65.0488C8.4254 60.415 11.2427 56.6586 14.7181 56.6586C18.1934 56.6586 21.0108 60.415 21.0108 65.0488ZM27.3034 94.4147C30.7788 94.4147 33.5961 91.1278 33.5961 87.0732C33.5961 83.0186 30.7788 79.7317 27.3034 79.7317C23.8281 79.7317 21.0108 83.0186 21.0108 87.0732C21.0108 91.1278 23.8281 94.4147 27.3034 94.4147Z"
                  />
                </svg>
                <h3>VACCINE</h3>
              </button>
              <button
                onClick={() => onClickFilterAttributeButtom("Virus")}
                className={`${tempAttributeValue === "Virus"
                  ? styles.filterActiveAttribute
                  : styles.filterOffAttribute
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="98"
                  height="96"
                  viewBox="0 0 98 96"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M63.9241 19.5074L48.7816 0.951172L33.639 19.5074L9.68998 19.7767L14.7566 43.1852L0.0351562 62.0772L21.4956 72.711L27.0874 95.9996L48.7816 85.8512L70.4757 95.9996L76.0675 72.711L97.528 62.0772L82.8065 43.1852L87.8731 19.7767L63.9241 19.5074ZM60.1809 68.9938L54.613 52.9934L42.693 65.032L60.1809 68.9938ZM27.691 52.4832L32.8209 64.4801L19.8664 62.9243L27.691 52.4832ZM49.4262 70.3489L31.6273 67.666L30.1368 77.5543L47.9357 80.2372L49.4262 70.3489Z"
                  />
                </svg>
                <h3>VIRUS</h3>
              </button>
              <button
                onClick={() => onClickFilterAttributeButtom("Data")}
                className={`${tempAttributeValue === "Data"
                  ? styles.filterActiveAttribute
                  : styles.filterOffAttribute
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="90"
                  height="103"
                  viewBox="0 0 90 103"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M44.5345 0.230469L89.0348 25.9227V77.3073L44.5345 103L0.0341797 77.3073V25.9227L44.5345 0.230469ZM45.542 51.157L83.8285 32.4717V74.2388L45.542 92.9241V51.157ZM40.5043 68.7432L29.4214 62.6979V72.7733L40.5043 78.8186V68.7432ZM3.22536 46.5773L14.3083 52.6225V62.6979L3.22536 56.6527V46.5773ZM23.3762 75.2922L15.3158 70.7582V78.3148L23.3762 82.8487V75.2922Z"
                  />
                </svg>
                <h3>DATA</h3>
              </button>
              <button
                onClick={() => onClickFilterAttributeButtom("No Data")}
                className={`${tempAttributeValue === "No Data"
                  ? styles.filterActiveAttribute
                  : styles.filterOffAttribute
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="88"
                  height="100"
                  viewBox="0 0 88 100"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.275 85.725L44 100L68.0911 86.0911L43.5 61.5L19.275 85.725ZM30.0649 48.0649L2.23999 75.8899L0.69873 75V25L4.6936 22.6936L30.0649 48.0649ZM56.9351 48.0649L85.126 76.2559L87.3013 75V25L82.6725 22.3276L56.9351 48.0649ZM65.6375 12.4924L43.5 34.6299L21.7285 12.8585L44 0L65.6375 12.4924Z"
                  />
                </svg>
                <h3>NO DATA</h3>
              </button>
              <button
                onClick={() => onClickFilterAttributeButtom("Unknown")}
                className={`${tempAttributeValue === "Unknown"
                  ? styles.filterActiveAttribute
                  : styles.filterOffAttribute
                  }`}
              >
                <div className={`${styles.filterPlatformUnknownIcon}`}>?</div>
                <h3>UNKNOWN</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [attributeValue, onClickFilterAttributeButtom, onClickFilterButtom, tempFilterValue])

  //to be implemented
  function FilterSectionBackgroundCircle() {
    return <div className={`${styles.filterSectionBackgroundCircle}${backgroundStyle === "closing" ? styles.filterSectionBackgroundCircleEnding : ""}`} />;
  }

  const filterSection = React.useCallback(() => {
    return (
      <div
        className={`${styles.filterSectionBackground} ${backgroundStyle === "closing" ? styles.filterSectionBackgroundEnding : ""
          }`}
      >
        <div
          className={`${styles.filterSection} 
          
          
          `}
        >
          <div
            className={`${styles.filterSectionFront} ${backgroundStyle === "closing"
              ? styles.filterSectionFrontBlank
              : ""
              }`}
          ></div>

          <Image
            src={checkedFilter}
            alt="checked"
            className={`${attributeValue || filterValue
              ? styles.checkedFilterOn
              : styles.checkedFilterOff
              }`}
            width={100}
            priority
          />

          <button
            onClick={() => {
              onClickFilter();
            }}
            className={styles.filterButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M7.7822 0L0.00402492 7.77817L8.01597 15.7901L0 23.8061L7.77817 31.5843L15.7941 23.5683L23.8068 31.5809L31.585 23.8028L23.5723 15.7901L31.581 7.78149L23.8028 0.0033167L15.7941 8.01195L7.7822 0Z"
                fill="#E7EDF4"
              />
            </svg>
          </button>

          <FilterInfo />
        </div>
      </div>
    );
  }, [backgroundStyle, attributeValue, filterValue, FilterInfo, onClickFilter]);























  // cambiar icono al clickear




  return (
    //entire page
    <main className={styles.main}>
      {/* Nav bar */}

      {digimonId && <button className={styles.closeDetailsButton} onClick={() => actualPage == actualPageOptions.details ? setActualPage(actualPageOptions.list) : setActualPage(actualPageOptions.details)}>

        {actualPage == actualPageOptions.list &&
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="none"
            className={styles.closeDetailsSvg}

          >
            <path
              d="M7.7822 0L0.00402492 7.77817L8.01597 15.7901L0 23.8061L7.77817 31.5843L15.7941 23.5683L23.8068 31.5809L31.585 23.8028L23.5723 15.7901L31.581 7.78149L23.8028 0.0033167L15.7941 8.01195L7.7822 0Z"
              fill="#E7EDF4"
            />
          </svg>}
        {actualPage == actualPageOptions.details &&
          <svg
            className={styles.closeDetailsSvg}
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="25"
            viewBox="0 0 29 25"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.6864 9.28001C15.6864 12.2697 13.099 14.6933 9.9072 14.6933C6.71544 14.6933 4.128 12.2697 4.128 9.28001C4.128 6.2903 6.71544 3.86667 9.9072 3.86667C13.099 3.86667 15.6864 6.2903 15.6864 9.28001ZM15.4503 16.9727C13.8684 17.9748 11.9607 18.56 9.9072 18.56C4.4356 18.56 0 14.4052 0 9.28001C0 4.1548 4.4356 0 9.9072 0C15.3788 0 19.8144 4.1548 19.8144 9.28001C19.8144 10.6483 19.4982 11.9475 18.9306 13.1169L27.9677 20.2198C29.1902 21.1807 29.3497 22.888 28.3239 24.0331C27.2981 25.1782 25.4755 25.3276 24.2529 24.3667L15.2004 17.2516L15.4503 16.9727Z"
              fill="#E7EDF4"
            />
          </svg>


        }


      </button>}
      <div className={styles.bar}>
        {/* left part of the navbar */}
        {/* Right part of the navbar */}

        <div className={styles.digidexGroup}>
          <Image
            src={digidexLogo}
            alt="Digidex logo"
            className={styles.digidexLogo}
            width={100}
            priority
          />
          <Image
            src={digidexLogoText}
            alt="Digidex logo"
            className={styles.digidexLogoText}
            width={100}
            priority
          />
        </div>

        {/* Search-bar */}
        {actualPage == actualPageOptions.list && (
          <div className={`${styles.navBarCentral}`}>
            <div className={styles.searchBarGroup}>
              <input
                onChange={onChangeText}
                onKeyUp={handleKeyPress}
                id="searchInput"
                className={styles.searchBar}
                type="search"
                placeholder="Agumon..."
                value={inputValue}
              ></input>
              <button className={styles.searchbutton} onClick={onClickSearch}>
                <svg
                  className={styles.searchIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="25"
                  viewBox="0 0 29 25"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.6864 9.28001C15.6864 12.2697 13.099 14.6933 9.9072 14.6933C6.71544 14.6933 4.128 12.2697 4.128 9.28001C4.128 6.2903 6.71544 3.86667 9.9072 3.86667C13.099 3.86667 15.6864 6.2903 15.6864 9.28001ZM15.4503 16.9727C13.8684 17.9748 11.9607 18.56 9.9072 18.56C4.4356 18.56 0 14.4052 0 9.28001C0 4.1548 4.4356 0 9.9072 0C15.3788 0 19.8144 4.1548 19.8144 9.28001C19.8144 10.6483 19.4982 11.9475 18.9306 13.1169L27.9677 20.2198C29.1902 21.1807 29.3497 22.888 28.3239 24.0331C27.2981 25.1782 25.4755 25.3276 24.2529 24.3667L15.2004 17.2516L15.4503 16.9727Z"
                    fill="#1B547B"
                  />
                </svg>
              </button>
            </div>
            <button
              className={`${styles.sortingbutton}`}
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <div
                className={`${styles.sortingIcon} ${sortOrder === "desc" ? styles.sorting : ""
                  }`}
              >
                <div className={styles.firstLine}></div>

                <div className={styles.secondLine}></div>

                <div className={styles.thirdLine}></div>

                <div className={styles.forthLine}></div>
              </div>
            </button>


            {filterPage && FilterSectionBackgroundCircle()}
            {filterPage && getBackgroundFilterImage()}
            {filterPage && filterSection()}
            <button
              onClick={onClickFilter}
              className={styles.filterButtonDefault}
            >
              <svg
                className={styles.filterIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="33"
                viewBox="0 0 29 33"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0792 17.6424V29.6533L16.9208 27.1038L16.9209 17.6423L25.3393 2.73775H3.6607L12.0792 17.6424ZM17.4234 26.8392L17.422 26.8399C17.4224 26.8397 17.4229 26.8395 17.4234 26.8392ZM27.6588 0C28.6897 0 29.334 1.14073 28.8186 2.05331L19.5992 18.3758L19.5992 27.6817C19.5992 28.3519 19.2329 28.966 18.6499 29.273L11.9541 32.7989C10.7886 33.4126 9.40088 32.5477 9.40088 31.2076V18.376L0.181414 2.05331C-0.334036 1.14073 0.310276 0 1.34117 0H27.6588Z"
                  fill="#1B547B"
                />
              </svg>
            </button>
          </div>
        )}

      </div>
      {digimonId && actualPage == actualPageOptions.details && (
        <DigimonDetails
          digimonId={digimonId}
          selectDigimon={setDigimonId}
        />
      )}
      {actualPage == actualPageOptions.list && (
        <div className={styles.listGroup}>

          {/* starting the list of digimons */}

          <div className={`${styles.backgroundDigimonIcons}`}>
            {/* <Image
            src={backgroundDigimonIcon1}
            alt="Digimon logo"
            className={styles.digimonLogo}
            width={100}
            priority
          /> */}
          </div>




          <DigimonList
            selectDigimon={setDigimonId}
            selectSort={sortOrder}
            searchDigimon={search}
            filterValue={filterValue}
            AttributeValue={attributeValue}
            selectPage={setActualPage}
          />



        </div>
      )}

      {/* footer */}

      {actualPage == actualPageOptions.list && (

        <footer className={styles.footerDiv}>
          {/* footer text */}
          <div className={styles.digimonLogoGroup}>
            <p>FROM THE</p>
            <Image
              src={digimonlogo}
              alt="Digimon logo"
              className={styles.digimonLogo}
              width={100}
              priority
            />
            <p>WORLD</p>
          </div>
          <div className={styles.footerCredits}>
            <p>
              made with{" "}
              <Image
                src={heartIcon}
                alt="Heart icon"
                className={styles.heartIcon}
                width={15}
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
                  width={25}
                  priority
                />
              </a>

              <a href="https://www.linkedin.com/in/christopher19/">
                <Image
                  src={linkedinIcon}
                  alt="Linkedin link"
                  className={styles.linkedinIcon}
                  width={25}
                  priority
                />
              </a>
            </div>
          </div>
        </footer>

      )}

    </main>
  );


}

import { SetStateAction, useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";

import digidexLogo from "/Materials/Logos/DigidexLogoImage.png";

import digidexLogoText from "/Materials/Logos/digidexLogoText.png";

function navBar() {
  return (
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
            className={`${styles.sortingIcon} ${
              sortOrder === "desc" ? styles.sorting : ""
            }`}
          >
            <div className={styles.firstLine}></div>

            <div className={styles.secondLine}></div>

            <div className={styles.thirdLine}></div>

            <div className={styles.forthLine}></div>
          </div>
        </button>
        <button className={styles.filterButton}>
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
    </div>
  );
}
"use client";

import Gift from "@/components/Lottie/Gift";
import styles from "./page.module.css";
import NavBottom from "@/components/NavBottom";
import Image from "next/image";
import Header from "@/components/Header";
import gacha from "/public/images/gacha.png";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import getFetch from "@/services/getFetch";
import patchFetch from "@/services/patchFetch";
import PrimaryButton from "@/components/button/PrimaryButton";

export default function Collection() {
  const [modal, setModal] = useState(false);
  const [desmodal, setDesModal] = useState(false);
  const [aftergacha, setAfterGacha] = useState(false);
  const [collection, setCollection] = useState([]);
  const [itembox, setItemBox] = useState([]);
  const [gachaitem, setGachaItem] = useState([]);
  const [gift, setGift] = useState(false);

  const countrys = ["한국", "일본", "태국", "중국"];
  const cnt = 8;

  useEffect(() => {
    getCollection();
    getItemBox();
  }, []);

  const getCollection = async () => {
    const data = await getFetch("collection");
    setCollection(data.response.items);
  };

  const getItemBox = async () => {
    const data = await getFetch("collection/item-boxes");
    setItemBox(data.response);
  };

  const getGacha = async (i) => {
    const data = await getFetch(`collection/random/${i}`);
    setGachaItem(data.response);

    // 컬렉션 업데이트
    const foundItem = collection.find(
      (item) => item.itemId === data.response.itemId
    );
    if (foundItem) {
      foundItem.own = true;
    }

    setGift(true);
    getItemBox();
    setTimeout(() => {
      setGift(false);
      setAfterGacha(true);
    }, 2800);
  };

  const selectItem = async () => {
    const data = await patchFetch(
      `collection/representative/${gachaitem.itemId}`
    );
    closeModal();
    closeDesModal();
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setAfterGacha(false);
    setGachaItem([]);
  };

  const openDesModal = (item) => {
    setGachaItem(item);
    setDesModal(true);
  };

  const closeDesModal = () => {
    setDesModal(false);
  };
  return (
    <div className={styles.container}>
      <Header>
        <div>컬렉션</div>
        <div className={styles.button} onClick={openModal}>
          <Image src={gacha} alt="버튼"></Image>
          <span>뽑기권</span>
        </div>
      </Header>
      <div className={styles.note_container}>
        <div className={styles.scroll_container}>
          {collection.length === 32 &&
            countrys.map((country, countryIdx) => (
              <div key={countryIdx}>
                <h3 className={styles.countryName}>{country}</h3>
                <div className={styles.item_container}>
                  {collection
                    .slice(countryIdx * cnt, (countryIdx + 1) * cnt)
                    .map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          if (item.own) {
                            openDesModal(item);
                          }
                        }}
                        className={`${styles.item_yes} ${
                          item.own ? "" : styles.item_no
                        }`}
                      >
                        <Image
                          src={item.itemImgUrl}
                          alt="스티커"
                          width={60}
                          height={60}
                        ></Image>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {desmodal ? (
        <div>
          <Modal onClick={closeDesModal}>
            <div className={styles.modal}>
              <div>
                <div className={styles.title}>{gachaitem.itemName}</div>
                <Image
                  src={gachaitem.itemImgUrl}
                  alt="뽑기"
                  width={120}
                  height={120}
                ></Image>
                <div className={styles.description}>
                  {gachaitem.itemDescription}
                </div>
                <PrimaryButton
                  onClick={() => {
                    selectItem(gachaitem);
                  }}
                >
                  가지고 다니기
                </PrimaryButton>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {modal ? (
        <div>
          <Modal onClick={closeModal}>
            <div className={styles.modal}>
              {aftergacha ? (
                <div>
                  <div className={styles.title}>{gachaitem.itemName}</div>
                  <Image
                    src={gachaitem.itemImgUrl}
                    alt="뽑기"
                    width={120}
                    height={120}
                  ></Image>
                  <div className={styles.description}>
                    {gachaitem.itemDescription}
                  </div>
                  <PrimaryButton
                    className={styles.btn_bring}
                    onClick={() => {
                      selectItem(gachaitem);
                    }}
                  >
                    가지고 다니기
                  </PrimaryButton>
                </div>
              ) : (
                <>
                  <div className={styles.title}>뽑기권</div>
                  {itembox.length == 0
                    ? "뽑기권이 없습니다."
                    : itembox.map((country, i) => (
                        <div key={i} className={styles.gacha_item}>
                          <span className={styles.item_country}>
                            {countrys[country.countryId - 1]} {country.cnt}개
                          </span>
                          <PrimaryButton
                            className={styles.btn_bring}
                            onClick={() => {
                              getGacha(country.countryId);
                            }}
                          >
                            뽑기
                          </PrimaryButton>
                        </div>
                      ))}

                  {gift && (
                    <div className={styles.gift}>
                      <Gift></Gift>
                    </div>
                  )}
                </>
              )}
            </div>
          </Modal>
        </div>
      ) : (
        ""
      )}

      <NavBottom />
    </div>
  );
}

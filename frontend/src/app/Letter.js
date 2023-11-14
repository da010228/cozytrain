"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PrimaryButton from "@/components/button/PrimaryButton";
import Modal from "@/components/Modal";
import letter from "#/images/letter.png";
import styles from "./Letter.module.css";
import getAccessToken from "@/utils/getAccessToken";

export default function Letter() {
  const [showLetter, setShowLetter] = useState(false);
  const [shakeLetter, setShakeLetter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    onLoginSuccess(accessToken);
    console.log(accessToken);

    setTimeout(() => {
      setShowLetter(true);

      setTimeout(() => {
        setShakeLetter(true);
      }, 1600);
    }, 1000);
  }, []);

  function onLoginSuccess(accessToken) {
    if (window.AndroidBridge) {
      window.AndroidBridge.onLoginSuccess(accessToken);
    }
  }

  return (
    <>
      <Image
        className={`${styles.letter} ${showLetter ? styles.arive : ""} ${shakeLetter ? styles.shake : ""
          }`}
        src={letter}
        alt="편지"
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <div>수면 리포트 샬라샬라</div>

          <Link href={"/train"}>
            <PrimaryButton>확인</PrimaryButton>
          </Link>
        </Modal>
      )}
    </>
  );
}

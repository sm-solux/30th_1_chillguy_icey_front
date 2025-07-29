import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ReceivedLetter from "../components/Letter/ReceivedLetter";
import CardList from "../components/Letter/CardList";
import Button from "../components/Button";
import LetterModal from "../components/Modal/LetterModal";
import Snackbar from "../components/Snackbar/Snackbar";

import st from "./Letter.module.css";

import {
  fetchReceivedLetters,
  fetchLetterContent,
} from "../util/LetterDataAPI";
import { fetchTeamCards, fetchCurrentTeamCard } from "../util/CardDataAPI";

const Letter = () => {
  const [searchParams] = useSearchParams();
  const currentTeamId = searchParams.get("teamId");

  const [openedId, setOpenedId] = useState(null);
  const [letters, setLetters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [myNickname, setMyNickname] = useState("");
  const [myCardId, setMyCardId] = useState(null);

  const letterListRef = useRef(null);
  const letterBodyRef = useRef(null);
  const selectedSectionRef = useRef(null);

  useEffect(() => {
    if (!currentTeamId) return;
    const fetchData = async () => {
      try {
        const fetchedLetters = await fetchReceivedLetters(currentTeamId);
        setLetters(fetchedLetters);

        const fetchedCards = await fetchTeamCards(currentTeamId);
        setCards(fetchedCards);

        await fetchMyCardNickname();
      } catch (err) {
        console.error("데이터 불러오기 실패", err);
      }
    };
    fetchData();
  }, [currentTeamId]);

  const handleClick = async (letterId) => {
    if (!currentTeamId) return;
    if (openedId === letterId) {
      setOpenedId(null);
      return;
    }
    try {
      const content = await fetchLetterContent(currentTeamId, letterId);
      setLetters((prev) =>
        prev.map((l) =>
          l.id === letterId ? { ...l, content, isRead: true } : l,
        ),
      );
      setOpenedId(letterId);
    } catch (err) {
      console.error("쪽지 내용 불러오기 실패", err);
    }
  };

  const fetchMyCardNickname = async () => {
    if (!currentTeamId) return;
    try {
      const myCard = await fetchCurrentTeamCard(currentTeamId);
      if (myCard && myCard.nickname) {
        setMyNickname(myCard.nickname);
        setMyCardId(myCard.cardId);
      } else {
        console.warn(
          "현재 팀에서 사용 중인 내 명함 정보를 불러올 수 없습니다.",
        );
        setMyNickname("");
        setMyCardId(null);
      }
    } catch (err) {
      console.error("내 명함 불러오기 실패", err);
      setMyNickname("");
    }
  };

  const handleCloseContent = () => {
    handleClick(openedId);
  };

  const openModal = (cardData) => {
    setSelectedCard(cardData);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    if (
      openedId === null ||
      !letterListRef.current ||
      !letterBodyRef.current ||
      !selectedSectionRef.current
    )
      return;

    const container = letterListRef.current;
    const viewport = letterBodyRef.current;
    const target = selectedSectionRef.current;

    const targetCenter = target.offsetLeft + target.clientWidth / 2;
    const viewportCenter = viewport.clientWidth / 2;
    const scrollLeft = targetCenter - viewportCenter;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [openedId]);

  const selectedLetter = letters.find((l) => l.id === openedId);

  return (
    <>
      <div className={st.Letter_wrapper}>
        <div ref={letterBodyRef} className={st.Letter_body}>
          <div
            ref={letterListRef}
            className={`${st.Letter_list} ${
              openedId !== null ? st.Letter_list_expanded : ""
            }`}
          >
            {openedId !== null && selectedLetter && (
              <div ref={selectedSectionRef} className={st.Selected_section}>
                <ReceivedLetter
                  isOpen={true}
                  isRead={selectedLetter.isRead}
                  onClick={() => handleClick(openedId)}
                  isSelected={true}
                  name={selectedLetter.senderName}
                />
                <div className={st.Letter_contentBox}>
                  <div className={st.Letter_message}>
                    <div className={st.Letter_message_text}>
                      {selectedLetter.content}
                    </div>
                  </div>
                  <Button
                    text={"확인"}
                    type={"mid"}
                    onClick={handleCloseContent}
                  />
                </div>
              </div>
            )}
            {letters.map((letter) => {
              if (letter.id === openedId) return null;
              return (
                <ReceivedLetter
                  key={letter.id}
                  isOpen={letter.id === openedId}
                  isRead={letter.isRead}
                  onClick={() => handleClick(letter.id)}
                  name={letter.senderName}
                />
              );
            })}
          </div>

          <CardList
            cards={cards.filter((card) => card.cardId !== myCardId)}
            onSendClick={openModal}
            showSendButton={true}
          />
        </div>
      </div>
      {modalOpen && selectedCard && (
        <div onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <LetterModal
              card={selectedCard}
              teamId={currentTeamId}
              onClose={closeModal}
              sender={myNickname}
              onSendSuccess={() => {
                setModalOpen(false);
                setSelectedCard(null);
                setSnackbarOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {snackbarOpen && (
        <Snackbar
          text={"쪽지 보내기를 완료했습니다!"}
          buttontext={"확인"}
          buttonOnclick={handleSnackbarClose}
        />
      )}
    </>
  );
};

export default Letter;

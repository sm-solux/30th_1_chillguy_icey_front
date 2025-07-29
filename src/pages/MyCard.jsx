import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CardList from "../components/Letter/CardList";
import CardModal from "../components/Modal/CardModal";
import Button from "../components/Button";
import AlertDialog from "../components/Dialog/AlertDialog";
import Snackbar from "../components/Snackbar/Snackbar";

import st from "./MyCard.module.css";

import {
  fetchMyCards,
  fetchCurrentTeamCard,
  createCard,
  updateCard,
  deleteCard,
  selectCardForTeam,
} from "../util/CardDataAPI";

const MyCard = () => {
  const [searchParams] = useSearchParams();
  const currentTeamId = searchParams.get("teamId");
  const currentTeamName = searchParams.get("teamName");

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertDialogConfig, setAlertDialogConfig] = useState({
    mainText: "",
    subText: "",
    confirmText: "",
    confirmType: "",
  });

  const [cardList, setCardList] = useState([]);
  const [currentCardIdInTeam, setCurrentCardIdInTeam] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 카드 목록 및 현재 팀 내 카드 조회
  const loadCards = async () => {
    try {
      const cards = await fetchMyCards();
      setCardList(cards);
      const currentCard = await fetchCurrentTeamCard(currentTeamId);
      setCurrentCardIdInTeam(currentCard?.cardId || null);
    } catch (error) {
      console.error("카드 불러오기 실패", error);
    }
  };

  useEffect(() => {
    loadCards();
  }, [currentTeamId]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openAddModal = () => {
    setIsEditMode(false);
    setSelectedCardId(null);
    setModalOpen(true);
  };

  const openEditModal = (cardId) => {
    setSelectedCardId(cardId);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // 명함 저장 (생성 or 수정)
  const handleSaveCard = async (newCardData) => {
    try {
      if (isEditMode && selectedCardId !== null) {
        await updateCard(selectedCardId, newCardData);
      } else {
        await createCard(newCardData);
      }
      await loadCards();
      closeModal();
    } catch (error) {
      console.error("명함 저장 실패", error);
    }
  };

  // 삭제 경고 다이얼로그 열기
  const openAlert = () => {
    if (selectedCardId === null) return;

    if (selectedCard.teams.length > 0) {
      setAlertDialogConfig({
        mainText: "현재 사용 중인 명함입니다.",
        subText: "명함 교체 후 삭제 가능합니다.",
        confirmText: "확인",
        confirmType: "midBlue",
      });
    } else {
      setAlertDialogConfig({
        mainText: "명함을 삭제하시겠습니까?",
        subText: "삭제하면 다시 복구할 수 없습니다.",
        confirmText: "삭제",
        confirmType: "midRed",
      });
    }
    setAlertOpen(true);
  };

  const closeAlert = () => setAlertOpen(false);

  // 명함 삭제
  const handleDeleteCard = async () => {
    try {
      await deleteCard(selectedCardId);
      setCardList((prev) => prev.filter((c) => c.cardId !== selectedCardId));
      setSelectedCardId(null);
      setAlertOpen(false);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("명함 삭제 실패", error);
    }
  };

  // 팀 내 명함 선택
  const handleSelectTeam = useCallback(
    async (cardIdToUse) => {
      const selectedCard = cardList.find((card) => card.cardId === cardIdToUse);
      if (!selectedCard) return;

      try {
        await selectCardForTeam(currentTeamId, selectedCard.templateId);
        await loadCards();
      } catch (error) {
        console.error("팀에 명함 설정 실패", error);
      }
    },
    [cardList, currentTeamId],
  );

  const selectedCard =
    cardList.find((card) => card.cardId === selectedCardId) || null;

  return (
    <>
      <div className={st.Card_body}>
        <div className={st.TitleSection}>
          <div className={st.Title}>나의 명함 보기</div>
          <div className={st.SubTitle}>Card Category</div>
        </div>

        <CardList
          cards={cardList}
          teams
          onSendClick={openModal}
          onAddClick={openAddModal}
          showSendButton={false}
          showAddButton={true}
          selectable={true}
          selectedCardId={selectedCardId}
          onCardClick={(id) =>
            setSelectedCardId((prev) => (prev === id ? null : id))
          }
          currentTeamName={currentTeamName}
          onSelectTeam={handleSelectTeam}
          currentCardId={currentCardIdInTeam}
        />
      </div>

      <div className={st.Fix_buttons_body}>
        {selectedCard && (
          <div className={st.Fix_buttons}>
            <Button
              text={"수정하기"}
              type={"mid"}
              onClick={() => openEditModal(selectedCardId)}
            />
            <Button text={"삭제하기"} type={"mid"} onClick={openAlert} />
          </div>
        )}
      </div>

      {modalOpen && (
        <div onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <CardModal
              onClose={closeModal}
              onSave={handleSaveCard}
              mainTitle={isEditMode ? "명함 수정하기" : "명함 추가하기"}
              subTitle={isEditMode ? "Edit card" : "Add card"}
              defaultValue={selectedCard}
            />
          </div>
        </div>
      )}

      {alertOpen && (
        <div onClick={closeAlert}>
          <div onClick={(e) => e.stopPropagation()}>
            <AlertDialog
              mainText={alertDialogConfig.mainText}
              subText={alertDialogConfig.subText}
              confirmText={alertDialogConfig.confirmText}
              confirmType={alertDialogConfig.confirmType}
              onConfirm={handleDeleteCard}
              onCancel={closeAlert}
            />
          </div>
        </div>
      )}

      {snackbarOpen && (
        <Snackbar
          text={"삭제가 완료되었습니다!"}
          buttontext={"확인"}
          buttonOnclick={handleSnackbarClose}
        />
      )}
    </>
  );
};

export default MyCard;

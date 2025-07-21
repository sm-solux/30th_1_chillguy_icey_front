import { useCallback, useState } from "react";

import CardList from "../components/Letter/CardList";
import CardModal from "../components/Modal/CardModal";
import Button from "../components/Button";
import AlertDialog from "../components/Dialog/AlertDialog";

import st from "./MyCard.module.css";
import { cards, teamsData } from "../util/card-info";

const MyCard = () => {
  // state: 명함 추가 모달 열림 상태
  const [modalOpen, setModalOpen] = useState(false);
  // state: 명함 수정 모달 열림 상태
  const [isEditMode, setIsEditMode] = useState(false);
  // state: 수정할 카드 선택
  const [selectedCardId, setSelectedCardId] = useState(null);

  // state: 삭제 경고 알림
  const [alertOpen, setAlertOpen] = useState(false);
  // state: 경고 알림 dialog 설정
  const [alertDialogConfig, setAlertDialogConfig] = useState({
    mainText: "",
    subText: "",
    confirmText: "",
    confirmType: "",
  });

  // state: cards, teamsData 상태 업데이트용
  const [cardList, setCardList] = useState([...cards]);
  const [teamList, setTeamList] = useState([...teamsData]);

  // 모달 열기/닫기 함수
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // "명함 추가하기" 모달
  const openAddModal = () => {
    setIsEditMode(false);
    setSelectedCardId(null);
    setModalOpen(true);
  };

  // "명함 수정하기" 모달
  const openEditModal = (cardId) => {
    setSelectedCardId(cardId);
    setIsEditMode(true);
    setModalOpen(true);
  };

  // 명함 저장 함수
  const handleSaveCard = (newCardData) => {
    if (isEditMode && selectedCardId !== null) {
      // 수정 모드: 기존 카드 수정
      const updated = [...cardList];
      updated[selectedCardId] = {
        ...updated[selectedCardId], // 기존 카드 유지
        ...newCardData, // 입력값 덮어쓰기 (cardId는 유지됨)
      };
      setCardList(updated);
    } else {
      // 추가 모드: 새 카드 추가
      const newCard = {
        ...newCardData,
        cardId: Date.now(), // 고유한 ID 부여
        profileColor: 1, // 우선 1로 부여
        templateId: 0,
        userId: 0,
        accessory: "",
      };
      setCardList([...cardList, newCard]);
      setTeamList([...teamList, []]); // teamList도 같이 추가 (빈 팀)
    }
    setSelectedCardId(null);
    closeModal();
  };

  // 삭제 경고 dialog
  const openAlert = () => {
    if (selectedCardId === null) return;

    const cardIndex = cardList.findIndex(
      (card) => card.cardId === selectedCardId,
    );
    const selectedTeams = teamList[cardIndex] || [];

    if (selectedTeams.length > 0) {
      // 사용 중인 명함인 경우
      setAlertDialogConfig({
        mainText: "현재 사용 중인 명함입니다.",
        subText: "명함 교체 후 삭제 가능합니다.",
        confirmText: "확인",
        confirmType: "midBlue",
      });
    } else {
      // 일반 삭제
      setAlertDialogConfig({
        mainText: "명함을 삭제하시겠습니까?",
        subText: "삭제하면 다시 복구할 수 없습니다.",
        confirmText: "삭제",
        confirmType: "midRed",
      });
    }

    // AlertDialog 열기
    setAlertOpen(true);
  };

  // AlertDialog 닫는 함수
  const closeAlert = () => {
    setAlertOpen(false);
  };

  // 명함 삭제 함수
  const handleDeleteCard = () => {
    if (selectedCardId === null) return;

    const newCards = cardList.filter((card) => card.cardId !== selectedCardId);
    const cardIndexToDelete = cardList.findIndex(
      (card) => card.cardId === selectedCardId,
    );

    const newTeams = [...teamList];
    if (cardIndexToDelete !== -1) {
      newTeams.splice(cardIndexToDelete, 1);
    }

    // 명함 data 업데이트
    setCardList(newCards);
    setTeamList(newTeams);
    // 선택 명함 초기화
    setSelectedCardId(null);
    // dialog 닫기
    setAlertOpen(false);
  };

  // 현재 선택된 명함 정보를 가져온다.
  const selectedCard =
    cardList.find((card) => card.cardId === selectedCardId) || null;

  // 현재 팀 이름
  const currentTeamName = "칠가이";

  // 팀 선택 핸들러를 useCallback으로 메모이제이션 처리
  const handleSelectTeam = useCallback(
    (selectedCardId, teamName) => {
      const cardIndex = cardList.findIndex(
        (card) => card.cardId === selectedCardId,
      );
      if (cardIndex === -1) return;

      const newTeamList = [...teamList];

      // 1. 현재 팀이 사용 중인 명함 인덱스를 찾는다
      const prevCardIndex = newTeamList.findIndex((teams) =>
        teams.includes(teamName),
      );

      // 2. 기존 명함에서 팀 이름 제거
      if (prevCardIndex !== -1) {
        newTeamList[prevCardIndex] = newTeamList[prevCardIndex].filter(
          (team) => team !== teamName,
        );
      }

      // 3. 새로 선택한 명함에 팀 이름 추가
      if (!newTeamList[cardIndex].includes(teamName)) {
        newTeamList[cardIndex].push(teamName);
      }

      // 4. 상태 업데이트
      setTeamList(newTeamList);
    },
    [teamList, cardList, setTeamList], // teamList 상태가 바뀔 때마다 새로 생성됨
  );

  // 현재 팀이 사용 중인 명함 index 찾기
  const usedCardIndex = teamList.findIndex((teamArr) =>
    teamArr.includes(currentTeamName),
  );

  // 실제 사용 중인 명함
  const usedCard = usedCardIndex !== -1 ? cardList[usedCardIndex] : null;

  return (
    <>
      <div className={st.Card_body}>
        {/* 타이틀 */}
        <div className={st.TitleSection}>
          <div className={st.Title}>나의 명함 보기</div>
          <div className={st.SubTitle}>Card Category</div>
        </div>

        {/* 명함 리스트 */}
        <CardList
          cards={cardList}
          teamsData={teamList}
          onSendClick={openModal}
          onAddClick={openAddModal}
          showSendButton={false}
          showAddButton={true}
          selectable={true}
          selectedCardId={selectedCardId}
          onCardClick={(id) => {
            if (selectedCardId === id) {
              setSelectedCardId(null); // 이미 선택된 카드면 해제
            } else {
              setSelectedCardId(id); // 아니면 선택
            }
          }}
          currentTeamName={currentTeamName}
          onSelectTeam={handleSelectTeam}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className={st.Fix_buttons_body}>
        {selectedCardId !== null && (
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

      {/* 카드 추가/수정 CardModal */}
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

      {/* 삭제 경고 AlertDialog */}
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
    </>
  );
};

export default MyCard;

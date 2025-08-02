import api from "./api";

// 스몰톡 리스트 가져오기
export const getSmallTalkList = async () => {
  return api.get(`/api/smalltalk/list`);
};

// 스몰톡 상세 조회
export const getSmallTalkDetail = async (id) => {
  return api.get(`/api/smalltalk/list/${id}`);
};

// 스몰톡 삭제 (리스트 전체 삭제)
export const deleteSmallTalkList = async (listId) => {
  return api.delete(`/api/smalltalk/list/${listId}`);
};

// 특정 스몰톡 질문 항목 삭제 (예: talkId는 smallTalks 배열 내의 개별 질문 ID)
export const deleteSmallTalkTalkItem = async (talkId) => {
  return api.delete(`/api/smalltalk/talk/${talkId}`);
};

// 스몰톡 제목 업데이트
export const updateSmallTalkTitle = async (listId, newTitle) => {
  return api.put(`/api/smalltalk/list/${listId}/title`, { newTitle });
};

// 스몰톡 질문 내용 편집 (개별 질문 수정)
// API 스키마에 따라 { "edits": [...] } 형태의 객체를 본문으로 받도록 수정
export const editSmallTalkQuestions = async (listId, data) => {
  return api.put(
    `/api/smalltalk/list/${listId}/edit`,
    data, // data는 { edits: [...] } 형태의 객체여야 함
  );
};

// 새로운 스몰톡 저장
export const saveSmallTalk = async (data) => {
  return api.post(`/api/smalltalk/save`, data);
};

// 스몰톡 미리보기 생성 (AI를 통한 질문 생성)
export const previewSmallTalk = async (target, purpose) => {
  return api.post(`/api/smalltalk/preview`, { target, purpose });
};

// 사용자 정보 가져오기
export const getUserInfo = async () => {
  return api.get("/api/user-info");
};

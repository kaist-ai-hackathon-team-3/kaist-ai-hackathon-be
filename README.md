# 정책을 말랑하게, 정말

![KakaoTalk_20240808_222418461](https://github.com/user-attachments/assets/674b88d8-1213-4087-a23d-ef06e9414770)

## Overview

**정말**은 사용자 맞춤 정책 추천 ai 챗봇입니다. 

`이런 분들께 추천드려요`

😢 내 주변 지원 정책에는 무엇이 있는지 알고 싶어요

😀 내 상황에 딱 맞는 정책을 검색해서 찾아보는 게 너무 어려워요

😢 많은 지원 정책들, 다 비슷해 보여요

😀 나를 위한 정책을 추천받고 싶어요



## Implement

1. 정성적인 상황설명을 찰떡같이 알아듣는 챗봇
   
    [1.mp4](https://github.com/user-attachments/assets/4d167ef9-b3b0-405f-918b-b1d5798aff13)
    
    - 사용자 정보를 상세히 받아 이를 기반으로 정책 추천
    - 계정을 추가해 가족, 친구의 정책 추천 가능
    
    [2.mp4](https://github.com/user-attachments/assets/8a0d8d8a-2ff5-4203-a51e-2f42c9ad0647)
    
    - 사용자 맞춤형 UX
        - 장애인을 위한 Speech-to-Text 기능
        - 고령층을 위한 반응형 UX
        - 다문화, 외국인 지원을 위한 번역 기능
    - 자신이 어떤 상황인지 잘 모른다면?
        - 정성적 질문에도 정확한 답변이 나오도록, 유도 질문

1. 다양한 정책을 카테고리 별로 한 눈에 확인
   
    [3.mp4](https://github.com/user-attachments/assets/d2981c06-39ea-4adb-b48b-20aebd330fc4)
    
    - 12개의 정책 카테고리
    
    - 선택한 카테고리마다 간편한 정책 정보 로드
    
      

## Methodology

![image 2](https://github.com/user-attachments/assets/7fb9a00c-168e-4da3-86b5-a3a80c2fda51)

- `naver cloud platform`을 이용한 서버 배포

- 유저의 정성적 질문에서 정량적 지표(성별, 나이, 거주지 등)를 추출하고, 이에 기반해 정책을 추천하도록 `CLOVA X` 프롬프팅

- 정부24 공공 api를 사용해 최근 정책 정보 로드

  

## Contributors

| 이름 | 포지션 | github |
| --- | --- | --- |
| 이재희 | FrontEnd | [@jaehee831](https://github.com/jaehee831/) |
| 주서현 | FrontEnd | [@seohyj](https://github.com/seohyj) |
| 이신혁 | BackEnd | [@dawnfire05](https://github.com/dawnfire05) |
| 김민경 | BackEnd | [@kim-minkyoung](https://github.com/kim-minkyoung) |
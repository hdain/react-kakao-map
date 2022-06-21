# 🗺 react-kakao-map

- 카카오맵 api 를 이용한 지도 구현

## Stacks

- <img src="https://img.shields.io/badge/React-61DAFB?style=flatgit&logo=React&logoColor=white"/>

## Features

- useContext 를 사용하여 지도 상태 전역 관리
- 키워드를 통해 장소 검색 구현
- 검색 결과 지도에 마커로 표시
- 마커 클릭 시
  - 지도 화면 중심좌표로 이동
  - 오버레이를 통해 해당 장소 기본 정보 표시
- 지도 줌 인/아웃 버튼 구현
- 지도 타입 변경 (자전거 도로, 교통정보, 지형도) 구현
- mkcert 를 이용해 https 설정

  - Localhost ‘http -> https’ 로 변경하는 방법
    1. 설치<br/>
    ```
    brew install mkcert
    brew install css (only needed firefox)
    ```
    2. 프로젝트 최상단에서
    ```
    mkcert -install
    ```
    3. 인증서 폴더 및 파일 생성 (.gitignore 추가할 것)
    ```
    mkdir -p .cert
    Mkcert -key-file ./.cert/key.pem -cert-file ./.cert-cert.pem ‘localhost’
    ```
    5. package.json -> ‘scripts’ 수정
    ```
    "start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",
    ```

- 현재위치 기반 지도 설정 (구현중 ..!)

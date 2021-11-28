---
sidebar_position: 1
# id: code-contribution
# title: Code Contributions
---

# 단축 URL 생성하기

## 설명

원본 URL을 `https://YOUR_DOMAIN.COM/url`과 같은 형태로 변환한 단축 URL 정보를 JSON 형식으로 반환합니다.

## 요청 URL

```
{
   "originalURL": "www.google.com"
}
```

### HTTP 메서드

- POST

### POST body

| body | 타입 | 설명 |
| --- | --- | --- |
| originalURL | String | 단축할 원본 URL |

### 요청 예 (SAMPLE REQUEST)

```bash

curl https://YOUR_DOMAIN.COM/url \
-d originalURL = "www.google.com"
```

## 응답

응답에 성공하면 결괏값을 JSON 형식으로 반환합니다.

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| message | string | 응답에 성공하면 ok
또는 오류 메시지를 반환 |
| status | string | HTTP 상태 코드 |
| data.id | string | 단축 URL의 해시 정보 |
| data.url | string | 단축된 URL |
| data.originalUrl | string | 원본 URL |
| data.createdTime | string | 단축 URL이 생성된 시간 |

### 응답 예

```
{
	"message":"ok",
	"status":"200",
  "result": {
		"id":"61a33012b2cf8248701fc65c",
		"url":"https://YOUR_DOMAIN.COM/my-cat",
		"originalUrl":"https://www.google.com/search?q=cat&newwindow=1&sxsrf=AOaemvIqIxvEfN6ZNsv7283UL2p36HTlZg:1638087698316&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjGifma0Lr0AhUur1YBHfoCAqAQ_AUoAXoECAIQAw&biw=1113&bih=796&dpr=2",
		"createdTime":"2021-11-28T07:30:26.424Z"
  }
}
```

---

## 오류 코드

단축 URL API의 주요 오류 코드는 다음과 같습니다.

| HTTP 상태 코드 | 오류 메시지 | 설명 |
| --- | --- | --- |
| 400 | Original url is invalid | 요청 originalURL 에 오류가 있습니다. POST body 값형식을 확인해 주십시오. |
| 400 | Failed to save database | 서버 내부에 오류로 데이터베이스에 저장을 실패하였습니다. (IN Developing) |
| 404 | 404 Not Found | 요청 URL을 서버에서 찾을 수 없습니다. |
| 500 | Internal Server Error | 서버 내부에 오류가 발생했습니다. "개발자 포럼"에 오류를 신고해 주십시오. |

---
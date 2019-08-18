export GO111MODULE := on

UID := demo
PORT := 1991
HOST := localhost
TOKEN_FILE := .idToken

ARTICLE_ID:=1
ARTICLE_TITLE:=title
ARTICLE_BODY:=body

HOMEWORK_NAME := 地球について
HOMEWORK_SUBJECT := science
HOMEWORK_DETAILS := testtest
HOMEWORK_SCHOOL_ID := 1
HOMEWORK_CLASS := 2

STUDENT_NAME := あっくん
STUDENT_GRADE := 3
STUDENT_SCHOOL_ID := 2

create-token:
	go run ./cmd/customtoken/main.go $(UID) $(TOKEN_FILE)

req-homeworks:
	curl -v $(HOST):$(PORT)/homeworks

req-homeworks-post:
	curl -v -XPOST -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/homeworks -d '{"name": "$(HOMEWORK_NAME)", "subject": "$(HOMEWORK_SUBJECT)","details": "$(HOMEWORK_DETAILS)", "school_id": $(HOMEWORK_SCHOOL_ID),"class": $(HOMEWORK_CLASS)}'

req-students:
	curl -v $(HOST):$(PORT)/students

req-students-post:
	curl -v -XPOST -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/students -d '{"name": "$(STUDENT_NAME)", "grade": $(STUDENT_GRADE), "school_id": $(STUDENT_SCHOOL_ID)}'

req-articles:
	curl -v $(HOST):$(PORT)/articles

req-img-pei:
	curl -v $(HOST):$(PORT)/img/pei.png

req-articles-get:
	curl -v $(HOST):$(PORT)/articles/$(ARTICLE_ID)

req-articles-post:
	curl -v -XPOST -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/articles -d '{"title": "$(ARTICLE_TITLE)", "body": "$(ARTICLE_BODY)"}'

req-articles-update:
	curl -v -XPUT -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/articles/$(ARTICLE_ID) -d '{"title": "$(ARTICLE_TITLE)", "body": "$(ARTICLE_BODY)"}'

req-articles-delete:
	curl -v -XDELETE -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/articles/$(ARTICLE_ID)

req-public:
	curl -v $(HOST):$(PORT)/public

req-private:
	curl -v -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/private

database-init:
	make -C ../database init

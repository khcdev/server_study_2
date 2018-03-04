# RESTful Architecture

-	간단하게 설명하면, url을 설계 하는 방법
-	잘 설계된 rest api는 url만 보고 어떤 요청이 어떤 작업을 할지 어느정도 유추할 수 있다.
-	정형화된 설계방법은 없지만, 개발자들에게서 통용되는 가이드가 있다.

## REST의 기본 구성 요소
*	리소스
*	메서드
*	메세지

ex) HTTP GET 요청 예시
HTTP GET , http://localhost/dogs
{
		“dogs: {
			“name”: “terry”,
			“like”: “running
		}
}
예제:
	1. 이름이 “kckc”이고 성별이 남자인 게임 캐릭터를 생성한다.
	2. 이름이 “kckc”인 게임캐릭터가 장착하고 있는 아이템 리스트를 
조회한다.


## HTTP 메서드
*	REST에서는 HTTP메서드를 그대로 사용하여 어떤 요청에 대한 행위를 결정한다 (GET, POST, PUT, DELETE)
*	그리고 메서드들은 각각 CRUD에 대응된다.
 

## REST 디자인 가이드

* URI에는 동사보다는 명사 형태를 사용한다.

ex) movies/{id}
ex) movies
* URI에는 get/set등의 행위를 붙이지 않는다.

ex) setMovies/
ex) getMovies/

* 소비자-구매목록, 사용자-강아지등과 같은 리소스간의 관계 표현

ex) /consumers/{id}/items
ex) /users/{id}/dogs

* 페이징

보통 게시판 형태 혹은 페이스북/트위터같은 형태의 구성을 가지고 있을때, 사용하는 처리이다.
예를들어 영화의 리스트가 만개 이상의 엄청 많은 수의 레코드를 가지고 있다면, 이것을 사용자한테 모두 보여줄수도 없을것이며, 서버와 클라이언트 모두 부담이 되는 작업이다.
이것을 페이징을 통하여 해결 하는데, 다음과 같은 예시들이 있다.
ex ) /movies?board_index=1&article_num=20
ex ) /feed?offset=100&limit=25


## REST의 특성
* 유니폼 인터페이스

REST는 HTTP 표준에만 따른 ß다면, 어떠한 기술이라던지 사용이 가능한 인터페이스 스타일이다. 예를 들어 HTTP + JSON으로 REST API를 정의했다면, 안드로이드 플랫폼이건, iOS 플랫폼이건, 또는 C나 Java/Python이건 특정 언어나 기술에 종속 받지 않고 HTTP와 JSON을 사용할 수 있는 모든 플랫폼에 사용이 가능한 느슨한 결함(Loosely coupling) 형태의 구조이다.
※ 흔히들 근래에 REST를 이야기 하면, HTTP + JSON을 쉽게 떠올리는데, JSON은 하나의 옵션일뿐, 메시지 포맷을 꼭 JSON으로 적용해야할 필요는 없다. 자바스크립트가 유행하기전에만 해도 XML 형태를 많이 사용했으며, 근래에 들어서 사용의 편리성 때문에 JSON을 많이 사용하고 있지만, XML을 사용할 경우, XPath,XSL등 다양한 XML 프레임웍을 사용할 수 있을뿐만 아니라 메시지 구조를 명시적으로 정의할 수 있는 XML Scheme나 DTD등을 사용할 수 있기 때문에, 복잡도는 올라가더라도, 메시지 정의의 명확성을 더할 수 있다. 

* 무상태성/스테이트리스

REST는 REpresentational State Transfer 의 약어로 Stateless (상태 유지하지 않음)이 특징 중의 하나이다.
상태가 있다 없다는 의미는 사용자나 클라이언트의 컨택스트를 서버쪽에 유지 하지 않는다는 의미로,쉽게 표현하면 HTTP Session과 같은 컨텍스트 저장소에 상태 정보를 저장하지 않는 형태를 의미한다.
상태 정보를 저장하지 않으면 각 API 서버는 들어오는 요청만을 들어오는 메시지로만 처리하면 되며, 세션과 같은 컨텍스트 정보를 신경쓸 필요가 없기 때문에 구현이 단순해진다.

* 캐싱

REST의 큰 특징 중의 하나는 HTTP라는 기존의 웹 표준을 그대로 사용하기 때문에, 웹에서 사용하는 기존의 인프라를 그대로 활용이 가능하다. 
HTTP 프로토콜 기반의 로드 밸런서나 SSL은 물론이고, HTTP가 가진 가장 강력한 특징중의 하나인 캐슁 기능을 적용할 수 있다.일반적인 서비스 시스템에서 60%에서 많게는 80%가량의 트렌젝션이 Select와 같은 조회성 트렌젝션인 것을 감안하면, HTTP의 리소스들을 웹캐쉬 서버등에 캐슁하는 것은 용량이나 성능 면에서 많은 장점을 가지고 올 수 있다.구현은 HTTP 프로토콜 표준에서 사용하는 “Last-Modified” 태그나 E-Tag를 이용하면 캐슁을 구현할 수 있다.
아래와 같이 Client가 HTTP GET을 “Last-Modified” 값과 함께 보냈을 때, 컨텐츠가 변화가 없으면 REST 컴포넌트는 “304 Not Modified”를 리턴하면 Client는 자체 캐쉬에 저장된 값을 사용하게 된다.

 ![img_1](http://cfile5.uf.tistory.com/image/267E914554241E65129927)

이렇게 캐시를 사용하게 되면 네트웤 응답시간뿐만 아니라, REST컴포넌트가 위치한 서버에 트랜잭션을 발생시키지 않아 응답시간과 성능 그리고 서버의 자원 사용률을 비약적으로 향상시킬 수 있다.
* 자체표현

API 메세지, url만 보고도 API를 이해할수 있는 구조를 가지고 있다는 것이다.
* 클라이언트 서버 구조

근래에 들면서 재 정립되고 있는 특징 중의 하나는 REST가 클라이언트 서버 구조라는 것이다. (당연한 것이겠지만).
REST 서버는 API를 제공하고, 제공된 API를 이용해서 비즈니스 로직 처리 및 저장을 책임진다.
클라이언트의 경우 사용자 인증이나 컨택스트(세션,로그인 정보)등을 직접 관리하고 책임 지는 구조로 역할이 나뉘어 지고 있다.  이렇게 역할이 각각 확실하게 구분되면서, 개발 관점에서 클라이언트와 서버에서 개발해야 할 내용들이 명확하게 되고 서로의 개발에 있어서 의존성이 줄어들게 된다.
계층형 구조 (Layered System)
계층형 아키텍쳐 구조 역시 근래에 들어서 주목받기 시작하는 구조인데, 클라이언트 입장에서는 REST API 서버만 호출한다.
그러나 서버는 다중 계층으로 구성될 수 있다. 순수 비즈니스 로직을 수행하는 API 서버와 그 앞단에 사용자 인증 (Authentication), 암호화 (SSL), 로드밸런싱등을 하는 계층을 추가해서 구조상의 유연성을 둘 수 있는데, 이는 근래에 들어서 앞에서 언급한 마이크로 서비스 아키텍쳐의 api gateway나, 간단한 기능의 경우에는 HA Proxy나 Apache와 같은 Reverse Proxy를 이용해서 구현하는 경우가 많다.

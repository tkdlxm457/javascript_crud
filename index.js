//토픽 객체
let topicId = null;

window.addEventListener('DOMContentLoaded', function () {
  getTopicList();
});



const xhr = new XMLHttpRequest();

function getTopicList () {
  function callFn(e) {

    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      let topiclist = JSON.parse(xhr.responseText);
      let t_list = document.getElementById("t_list");
      let title = document.getElementById("title");
      let description = document.getElementById("description");

      for (var i = 0; i < topiclist.length; i++) {
        let tempTopic = topiclist[i];

        let tr = t_list.insertRow(t_list.rows.length);
        tr.id = "tr_" + i;
        tr.insertCell(0).innerHTML = tempTopic.id;
        tr.insertCell(1).innerHTML = tempTopic.title;
        tr.insertCell(2).innerHTML = tempTopic.description;
        tr.insertCell(3).innerHTML = tempTopic.created;

        let tr_id = document.getElementById("tr_" + i);
        tr_id.addEventListener('click', function () {
          topicId = this.cells[0].innerText;
          console.log(`id [${this.cells[0].innerText}]의 번호가 선택 되었습니다.`);
          title.value = `${this.cells[1].innerText}`;
          description.value = `${this.cells[2].innerText}`;
        })

      }
    } else {
      console.log("Error!");
    }
  };

  httpService('GET', 'http://localhost:3000/board', undefined, callFn);
}




/**
 * 
 * @param {event} event 이벤트
 * @param {string} methodType SAVE, UPDATE, DELETE만 들어온다.
 */
let godata = (event, methodType) => {
  // 이벤트 버블링을 방지한다.
  event.preventDefault();

  // form DOM
  const form = document.getElementById('myForm');

  // httpRequestOption
  const httpReqOption = {
    methodType: null,
    URL: null,
    body: null
  }

  switch (methodType) {
    case 'SAVE':
      httpReqOption.methodType = "POST";
      httpReqOption.URL = 'http://localhost:3000/board';
      httpReqOption.body = JSON.stringify({ title: form.querySelector("#title").value, description: form.querySelector("#description").value });

      break;
    case 'UPDATE':
      httpReqOption.methodType = "PUT";
      httpReqOption.URL = 'http://localhost:3000/board/' + topicId;
      httpReqOption.body = JSON.stringify({ title: form.querySelector("#title").value, description: form.querySelector("#description").value });

      break;
    case 'DELETE':
      httpReqOption.methodType = "DELETE";
      httpReqOption.URL = 'http://localhost:3000/board/' + topicId;

      break;
    default:
      alert('용청가능한 http거래가 없습니다.');
      break;
  }

    httpService(httpReqOption.methodType, httpReqOption.URL, httpReqOption.body);
}


/**
 * 
 * @param {String} httpMethod http메소드
 * @param {String}} URL URL
 * @param {Function} callFn http응답리스너
 * @param {Optional(Object)} body request body
 */
function httpService (httpMethod, URL, body = null, callFn = undefined) {
  xhr.open(httpMethod, URL);
  xhr.setRequestHeader('Content-type', 'application/json');
  body === null ? xhr.send() : xhr.send(body);

  let defaultCallFn = (e) => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 201) {
      console.log(xhr.responseText);
    } else {
      console.log("error!");
    }
  }

  xhr.onreadystatechange = callFn === undefined ? defaultCallFn : callFn;
}



// const $result = document.querySelector('.result');
//     const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

//     const promiseAjax = (method, url, payload) => {
//       return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send(JSON.stringify(payload));

//         xhr.onreadystatechange = function () {
//           if (xhr.readyState !== XMLHttpRequest.DONE) return;

//           if (xhr.status >= 200 && xhr.status < 400) {
//             resolve(xhr.response); // Success!
//           } else {
//             reject(new Error(xhr.status)); // Failed...
//           }
//         };
//       });
//     };

//     /*
//       비동기 함수 promiseAjax은 Promise 객체를 반환한다.
//       Promise 객체의 후속 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행한다.
//     */
//     promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
//       .then(JSON.parse)
//       .then(
//         // 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출된다.
//         render,
//         // 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
//         console.error
//       );

// https://poiemaweb.com/es6-promise

// const $result = document.querySelector('.result');
//     const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

//     const promiseAjax = (method, url, payload) => {
//       return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send(JSON.stringify(payload));

//         xhr.onreadystatechange = function () {
//           if (xhr.readyState !== XMLHttpRequest.DONE) return;

//           if (xhr.status >= 200 && xhr.status < 400) {
//             resolve(xhr.response); // Success!
//           } else {
//             reject(new Error(xhr.status)); // Failed...
//           }
//         };
//       });
//     };

//     const url = 'http://jsonplaceholder.typicode.com/posts';

//     // 포스트 id가 1인 포스트를 검색하고 프로미스를 반환한다.
//     promiseAjax('GET', `${url}/1`)
//       // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환한다.
//       .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
//       .then(JSON.parse)
//       .then(render)
//       .catch(console.error);
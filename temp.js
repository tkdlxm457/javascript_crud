/*
    1. get > 토픽목록 조회.o 
    2. post > 작성 = 인풋박스에 쓰여진 데이터를 작성 클릭 이벤트로 값을 보낸다.
*/

//토픽 객체
let topicId = null;

window.addEventListener('DOMContentLoaded', function () {
  getTopicList();
});



const xhr = new XMLHttpRequest();

let getTopicList = () => {
  xhr.open('GET', 'http://localhost:3000/board');
  xhr.send();

  xhr.onreadystatechange = function (e) {

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
}

function godata(event, methodType) {
  event.preventDefault();
  const form = document.getElementById('myForm');


  if (methodType === 'SAVE') {
    xhr.open('POST', 'http://localhost:3000/board');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({title: form.querySelector("#title").value, description: form.querySelector("#description").value}));
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status === 201) {
        console.log(xhr.responseText);
      } else {
        console.log("error!");
      }
    }
  } else if (methodType === 'UPDATE') {
    console.log(methodType)
    
    xhr.open('PUT', 'http://localhost:3000/board/' + topicId);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({title: form.querySelector("#title").value, description: form.querySelector("#description").value}));

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status === 201) {
        console.log(xhr.responseText);
      } else {
        console.log("error!");
      }
    }
  } else if (methodType === 'DELETE') {
    console.log(topicId)
    xhr.open('DELETE', 'http://localhost:3000/board/' + topicId);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status === 201) {
        console.log(xhr.responseText);
      } else {
        console.log("error!");
      }
    }
  }

  return false;
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
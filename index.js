/*
    1. get > 토픽목록 조회.o 
    2. post > 작성 = 인풋박스에 쓰여진 데이터를 작성 클릭 이벤트로 값을 보낸다.
*/

//토픽 객체
let topic = null;

window.addEventListener('DOMContentLoaded', function()
{
  getTopicList();
  // initEventListener();
});



const xhr = new XMLHttpRequest();

let getTopicList = ()=>{
xhr.open('GET', 'http://localhost:3000/board');
xhr.send();

xhr.onreadystatechange = function (e) {
    
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) { 
    let topiclist = JSON.parse(xhr.responseText);
    let t_list = document.getElementById("t_list");
    let title = document.getElementById("title");
    let description = document.getElementById("description");

    for(var i=0; i<topiclist.length; i++){
        

        let tr = t_list.insertRow( t_list.rows.length );
        tr.id="tr_"+i;
        tr.insertCell(0).innerHTML = topiclist[i].id;
        tr.insertCell(1).innerHTML = topiclist[i].title;
        tr.insertCell(2).innerHTML = topiclist[i].description;
        tr.insertCell(3).innerHTML = topiclist[i].created;

         let tr_id = document.getElementById("tr_"+i);
         topic = topiclist;
         document.getElementById("tr_"+i).addEventListener('click', function(){
            console.log(`id [${topic.id}]의 행이 선택 되었습니다.`);
            title.value = `${topic.id}`;
            description.value = `${topic.description}`;
        })
        
    }
  } else {
    console.log("Error!");
  }

};
}

function godata(){
  const form = document.getElementById('myForm');
  form.submit(function(event){
    event.preventDefault();
    var data = $(this).serialize();
    const methodType = event.originalEvent.submitter.id;
    if (methodType === 'SAVE'){
      xhr.open('POST', 'http://localhost:3000/board');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(data);

      xhr.onreadystatechange = function(e){
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
    
        if(xhr.status === 201){
            console.log(xhr.responseText);
        } else {
            console.log("error!");
        }
    }
    } else if (methodType === 'UPDATE'){
      console.log(methodType)
      xhr.open('PUT', 'http://localhost:3000/board');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(data);

      xhr.onreadystatechange = function(e){
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
    
        if(xhr.status === 201){
            console.log(xhr.responseText);
        } else {
            console.log("error!");
        }
    }
    } else if (methodType === 'DELETE'){
      console.log(topic)
      xhr.open('DELETE', 'http://localhost:3000/board');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(data);

      xhr.onreadystatechange = function(e){
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
    
        if(xhr.status === 201){
            console.log(xhr.responseText);
        } else {
            console.log("error!");
        }
    }
    }
  });
}

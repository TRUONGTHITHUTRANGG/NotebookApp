  //add note  

  let button = document.getElementById('addNote');
  let notesClass = document.querySelector('div.notes ol');
  /*
    document.getElementById("id") nó sẽ lấy ra phần tử ở bên phía html 
    có id ta truyền vô để thêm phần tử con hoặc gán sự kiện cho chúng
    document.getElementById('addNote') sẽ lấy ra phần tử này 
    dòng 27 file index.html : <button type="button" id="addNote">Add</button>
  */ 
// document.querySelector là hàm sẽ lấy ra phần tử đầu tiên nó kiếm được ở trong file HTML của ta
// document.querySelector('[ tên gì đó ]') nếu ta truyền vào trong nó với dấu ngoặc vuông thì ta đang tìm phần tử có
// atribute match với nó
// document.querySelector('div.notes ol') 
// lấy ra thằng order list ở trong thằng div có tên class là notes
// dòng 20 file html : 
/*
  <ol id="ol">

  </ol>
*/ 
  let allNotes = []; // biến này dùng để lưu cái list của ta
  let idEdit = 0; // biến này dùng để 
 //search note
 let li = document.getElementById('ol').children;
 // thằng này sẽ lấy ra thằng có id là ol
 // sau đó nó sẽ gọi children để lấy ra tất cả thằng phần tử con đang có trong nó
// local storage
  function saveListToLocal(list) {
    localStorage.setItem("list",JSON.stringify(list))
}
function getListToLocal(list) {
   return JSON.parse(localStorage.getItem("list"))
}
// JSON là một dạng cấu trúc dữ liệu người ta hay gọi là cây json
// nó sẽ có dạng [key:value]
// hai thằng này khi nào cũng đi đôi với nhau như một cặp key and value 
/*
    "data":{
      name : "Trang"
      location: "Quảng Nôm"
    }
*/ 
// ví dụ như cái data ở trên chính là một cái cây json
// giờ ta muốn lấy ra giá trị của cái name
// thì ta phải truy cập vào key data có value là một đối tượng có hai th là name và location 
// rồi sau đó ta chỉ cần truy cập key là name thì sẽ lấy ra được name
// let result = json["data"]["name"]
// ở trong javascript thì ta có một class tên là JSON 
// class này có hai hàm chính thông dụng nhất là : JSON.parse và JSON.stringify
// à JSON nãy quên nói là thường những cái gì trả về dạng cây json
// chính là dữ liệu từ trang web nên cái cây json trả về thực chất là một chuỗi string
// vì vậy để chuyển cái chuỗi string đó thành một object ( đối tượng ) thì ta sẽ dùng JSON.parse(string)
/*
    function parse(json) {
      return object
    }
*/
// ta chỉ cần truyền cái chuỗi cây JSON đó vào th JSON.parse(string) thì nó sẽ trả về cho em một cái object 
/*
    rồi ở cái project này của ta phần dữ liệu nó sẽ được lưu ở trong một cái người ta gọi là LocalStorage
    nó là một cái chỗ chứa dữ liệu của bên phía trang web
    ở bên phía trang web có 3 cái chứa dữ liệu là : Cookie,Session,LocalStorage
    hồi ở PHP a có nói cho e về cái Session thì Cookie và Session thì nó lưu dữ liệu trong một phiên đăng nhập
    hoặc sử dụng của người dùng nghĩa là nó chỉ tồn tại trong một khoảng thời gian nhất định sau đó nó sẽ bị xoá đi.
    Còn cái LocalStorage thì nó sẽ tồn tại vĩnh viễn trừ khi người dùng xoá nó đi thì nó mới bị mất đi thôi nên nó rất
    thích hợp để lưu dữ liệu cho những dự án nhỏ như này ...
    trong JavaScript để có thể tương tác với cái LocalStorage này thì nó cung cấp cho ta một cái class đó là
    localStorage th này cũng sẽ có hai th chính đó là setItem và getItem
    * localStorage.setItem(key,value)
    hàm này dùng để lưu (add) hoặc ghi đè (update) một giá trị vào trong local của ta nó sẽ có hai tham số truyền vào
    đó là key (tên khoá của dữ liệu sau này ta muốn truy cập hay sửa đổi dữ liệu sẽ thông qua cái key này )
    value (còn đây chính là giá trị của cái khoá đó)
    localStorage.setItem("Trang","Quảng Nôm") lưu một biến vào local có key là Trang và có giá trị là Quảng Nôm
    * localStorage.getItem(key)
    lấy ra giá trị được lưu trong local với cái key ta truyền vào ( trả về giá trị được lưu tương ứng với cái key )
    localStorage.getItem("Trang") thì nó sẽ trả về giá trị được lưu trong local của ta với cái key là "Trang"
    thì ở trên a đã  setItem cho cái key "Trang" này rồi 
    Nên giờ khi a getItem("Trang") thì nó sẽ trả về là "Quảng Nôm"
    còn nếu ta truyền vào một cái key chưa được set giá trị thì nó sẽ trả về giá trị là null

    Đó sau khi xem qua hai thằng là JSON và localStorage thì ta phân tích lại cái code trên
    let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []

    ở đây trong dấu ngoặc ta thấy có th getItem của th localStorage thì khi lấy th này ra thì nó sẽ 
    trả về cho ta một cái cây JSON nên để chuyển dữ liệu đó về object thì ta sẽ sài đến JSON.parse
    để chuyển. Flow nó sẽ đi theo dạng này :
    JSON.parse(localStorage.getItem("list"))
    (1) localStorage.getItem("list") return về một cái data cây JSON theo thằng key mình truyền vào
    (2) JSON.parse sẽ lấy luôn cái kết qủa trả về từ cái cái getItem ấy và chuyển nó thành dạng object
    */
 function loadPage() {
    allNotes = getListToLocal() || [];
    /*
        còn cái || [] là sao thì nói đơn giản nghĩa là nếu cái key LOCAL_STORAGE_LIST_KEY này chưa được set giá trị thì 
    nó sẽ null mà nếu nó null thì cái cây json sẽ null và sẽ ko chuyển thành object đc nên lúc đó thì nó sẽ lấy một giá trị
    mặc định đó chính là [] một cái mảng rỗng
    */
    for (index in allNotes) {
        displayNotes(index+1);
    }
 }
/*
    Hàm loadPage() trên sẽ chạy đầu tiên trong chương trình của ta
    bởi vì ta đã gọi nó ở trong sự kiện onload ở trong thẻ body bên phía html
    <body onload="loadPage()"> nên khi html đc chạy thì hàm này sẽ chạy luôn
    trong hàm đó ban đầu sẽ gọi thằng getListToLocal() để lấy ra tất cả thằng list
    đang có trong cái local Storage của ta
    sau đó chạy vòng for duyệt qua từng phần tử của mảng
    for in sẽ duyệt và trả về index của mảng 
    nên nó chỉ trả về index là 0,1,2,..n-1
    chứ không phải giá trị từng phần tử trong mảng
    chạy hàm displayNotes() để show ra mấy cái th list li 
*/
 document.getElementById('search-input').addEventListener('keyup', function (e) {
     let search_input = e.target.value.toUpperCase();
     let liArray = Array.from(li);  
     liArray.forEach(function (liarray) {

         let listValue = liarray.firstChild.value.toUpperCase();
         if (listValue.indexOf(search_input) != -1) {
             liarray.style.display = "block";
             console.log("value matched");

         } else {
             liarray.style.display = "none";
             console.log("not found");
         }
     });

 });
/*
    cái đoạn ở trên là ta đang lấy ra th element có id là search-input
    chính là cái ô input search trên cái header của ta dưới cái chữ Note App
    sau đó gọi addEventListener để thêm sự kiện cho th element đó
    addEventListener('tên sự kiện',hàm sẽ chạy khi sự kiện được gọi đến)
    ở trên nó truyền vào 'keyup' chính là sự kiện khi người dùng gõ một chữ vào 
    trong ô input kia.

    let search_input = e.target.value.toUpperCase();
    (1) cái function được truyền vào ở trong cái addEventListener nó có nhận một cái 
    tham số truyền vào đó chính là cái event ( function (e) )
    e sẽ đại diện cho th element gọi đến sự kiện th keyup 
    (2) e.target sẽ trả về cho ta th element đó chính là th input search của ta
    (3) e.target.value bởi vì th element của ta lấy ra là th input nên nó có
    thằng phần tử con là value sẽ lấy ra nội dung trong thẻ input đó
    (4) e.target.value.toUpperCase() sau đó bởi vì th value trả về một string là nội dung
    của ô input nên ta có thể gọi
    hàm toUpperCase để biến string từ chữ thường thành chữ hoa hết.
    
    let li = document.getElementById('ol').children;
    ở trên đầu chương trình nó có th này là tất cả các list con đang có ở trong html của em
    mà li bây giờ là element trong html ko thể sử dụng để truy xuất được nên
    ta dùng cái này Array.from(li); để biến tất cả các element đó về dạng một cái mảng
    liArray bây giờ là một cái mảng nên ta có thể dùng for-each một advance function trong array
    để duyệt qua từng phần tử trong mảng
    
    đây là cấu trúc th LI của ta : <li> input sau đó đến hai cái button chức năng  </li>
    nên liarray.firstChild.value.toUpperCase();
    sẽ lấy th con đầu tiên trong cái LI của ta chính là cái ô input 
    mà nãy a có nói rồi input có cái value sẽ lấy ra nội dung trong ô input đó
    **listValue.indexOf(search_input)
        - listValue là nội dung của một cái LI chính là một cái th con trong cái list mà em lưu
        - search_input là nội dung từ input search trong html của ta
        - bởi vì giờ listValue là một string nên ta có thể gọi đến hàm indexOf
        - StringA.indexOf(StringB) nó sẽ tìm vị trí đầu tiên xuất hiện của th StringB
        trong th StringA nó sẽ trả về một số nguyên là vị trí xuất hiện .
        vd : "Trang".indexOf("a") thì nó sẽ trả về là 2 vì String cũng như mảng bắt đầu
        từ vị trí số 0 đến vị trí n-1   0 1 *2* 3 4 
                                        t r  a  n g 
        "Trang".indexOf("huy") vì trong từ trang nó đéo có chữ huy nên lúc này hàm index of 
        sẽ trã về là -1 nghĩa là ko tìm thấy vị trí xuất hiện của từ truyền vào.

        if (listValue.indexOf(search_input) != -1) 
        ta đã biết nếu ko tìm thấy được từ B trong từ A thì nó sẽ trả về -1 
        nên nếu tìm đc chắc chắn là nó khác -1 rồi 
        if (listValue.indexOf(search_input) != -1) {
            liarray.style.display = "block";
        } else {
            liarray.style.display = "none";
        }

        do ta đã biến đống child trong th ol thành array nên khi duyệt qua các element
        của th array nó sẽ trả về cái li 
        là một element html nên ta có thể chỉnh style cho nó 
        trong css em có học qua hai cách để làm biến mất một th element bằng css
        (1) sài display = "none" sẽ làm ẩn đi th element đó đi và cả vị trí nó chiếm
        trong html của ta. 
        (2) sài visibility = "hidden" nó cũng làm ẩn đi th element nhưng vị trí của
        nó trong html của ta vẫn còn 
        visibility sài trong những khi ta cần làm một cái câu hỏi trắc nghiệm có thể bật
        tắt câu trả lời :  Trang [gầy] chứ ko có múp
        khi ta css cho từ gầy là visibility = "hidden" thì html hiển thị thế này
        Trang      chứ ko có múp
        khi ta css cho từ gầy là display = "none" thì html hiển thị thế này
        Trang chứ ko có múp

        nên cái for each hoạt động như thế đó
        (1) duyệt qua từng phần từ trong thằng order list (ol)
        (2) so sánh nội dung trong th input của list vs th input seach
        (3) nếu có th input của list trong th input seach
            thì ta display để cho nó hiện ra
        (4) nếu có th input của list trong th input seach
            thì ta display để cho nó mất đi
*/ 

 function displayNotes(pushValue) {
     for (let i = pushValue - 1; i < allNotes.length; i++) {
         let li = document.createElement('li');
         let liId = li.setAttribute('id', i);
         li.innerHTML = `<input type='text' class="p-0"  value='${allNotes[i]}' disabled > 
         <button type='button' onclick='deleteNote(${i})' class='fa-trash-alt'>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
            </svg>
        </button> 
        <button type='button' onclick='editNote(${i})' class='fa-edit' data-toggle="modal" data-target="#exampleModal">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
            </svg>
        </button> `;
         notesClass.appendChild(li);
     }

     /*
        chạy vòng for từ i = pushValue - 1 
        cái pushValue này là từ th index của cái hàm thêm list
        nói dễ hiểu nghĩa là cái vòng for này mục đích chạy để thêm một th element mới
        vào cuối của cái ol (order list) bên phía html

        let li = document.createElement('li');
        tạo ra một phần tử html với tag name ta truyền vô ở đây ta truyền vô tag name là li
        nên nó sẽ tạo ra một cái list rổng : <li></li>

        let liId = li.setAttribute('id', i); 
        thêm một attribute mới vào trong cái li vừa mới tạo của ta là id với value là i (index)
        <li id='i'></li>
        li.innerHTML thêm một cái string định nghĩa những phần tử con ở trong một cái element html
        vd như <p></p> >> p.innerHTML = "thu trang" >> html >> <p>thu trang</p>
        notesClass.appendChild(li);
        appendChild chèn một thằng element html vào cuối sau các th con của th cha
        <ol>
            <li>1</li>
        </ol>
        ol.appendChild(li)
         <ol>
            <li>1</li>
            <li>2</li>
        </ol>
        ol.appendChild(li)
          <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ol>
     */
 }
 // như đã nói ở trên addEventListener thêm sự kiện vào một cái element html
 // 'click' là event khi ta click chuột vào cái element đó
 button.addEventListener('click', function () {

     let maximumNotesLimit = 10;
     let newNote = document.getElementById('newNote').value;
     document.getElementById('newNote').value = "";
     if (!newNote) {
         document.getElementsByClassName('show-message')[0].innerHTML = "<span style='color:red;margin-left:30px'>Note Could't Empty</span>";
     } else {
         if (allNotes.length < maximumNotesLimit) {
             document.getElementsByClassName('show-message')[0].innerHTML = "";
             let pushValue = allNotes.push(newNote);
             saveListToLocal(allNotes);
             displayNotes(pushValue);
         } 
         else {
             document.getElementsByClassName('show-message')[0].innerHTML = "<span style='color:red;margin-left:30px'>Maximum Notes Limit exceded</span>";
         }
     }

     /*
        maximumNotesLimit chỉnh số lượng list tối đa có trong cái noteApp của ta
        document.getElementById('newNote').value chính là nội dung của cái ô input
        để thêm một phần tử mới vào trong  order list
        dòng 27 html : <input type="text" placeholder="Note" id="newNote">
         if (!newNote) kiểm tra nếu người dùng ko nhập gì vào ô input nhưng mà vẫn bấm add
         thì ta sẽ hiển thị một cái lỗi cho người dùng thấy 
         <span style='color:red;margin-left:30px'>Note Could't Empty</span>
         còn nếu không thì tiếp tục chạy xuống dưới
        kiểm tra tiếp  
        allNotes.length < maximumNotesLimit nếu số lượng phần tử lớn hơn cái độ dài quy định
        thì không cho người dùng thêm nữa
        thì ta sẽ hiển thị một cái lỗi cho người dùng thấy 
        <span style='color:red;margin-left:30px'>Maximum Notes Limit exceded</span>

        let pushValue = allNotes.push(newNote);
        saveListToLocal(allNotes);
        displayNotes(pushValue);

        push là một hàm ở trong array nó sẽ thêm một phần tử vào cuối một cái mảng 
        và trả về vị trí của phần tử mới thêm vào
        vd: arr = ["t","r","a"] mảng đang có độ dài là 3 và index lần lượt là 0 1 2
            arr.push("n") thì index nó sẽ trả về cho ta là 3
            vì arr lúc này là ["t","r","a","n"] có độ dài là 4 và cái index cuối cùng là 3
            arr.push("g") thì index nó sẽ trả về cho ta là 4
            arr = ["t","r","a","n","g"]
        saveListToLocal(allNotes); 
        lưu cái list vừa mới thêm phần tử mới vào trong local storage
        displayNotes(pushValue);
        như đã kêu ở trên displayNotes sẽ thêm một phần tử element mới vào trong cái orderlist
        bằng cách truyền vào th index cuối cùng ở trong cái array
        */
 });

 //delete note

 function deleteNote(id) {
     allNotes.splice(id, 1)
     // xoá vị trí một element trong cái array của ta
     // arr.splice(vị trí muốn xoá,số kí tự muốn xoá)
     // arr = ["t","r","a","n","g"]
     // arr.splice(1,2) xoá từ vị trí số 1 hai kí tự
     // arr = ["t","n","g"] 
     document.getElementById(id).style = "display:none;";
     // chỉnh display thành note để element đó bị ẩn đi làm người dùng
     // tưởng chúng ta đã xoá th element đó đi :v
     saveListToLocal(allNotes)
     // sau đó lưu cái list đã xoá th element đó vào trong local storage
 }

 //edit note

 function editNote(id) {
    idEdit = id;
    // gán th idEdit bằng cái id element ta muốn sửa
    document.getElementById("txEdit").value = allNotes[id];
    // sau đó gán value của th txEdit bằng cái element thứ i trong cái array
    // txEdit này ở trong cái modal khi ta bấm nó hiện ra bảng thông báo đó
 }

function saveEditModal() {
    // đây là hàm lưu sự thay đổi khi ta update list xong
    let edit = document.getElementById("txEdit").value;
    // lấy ra nội dung của cái input trong cái modal của ta 
    // để ta có thể chỉnh sửa th list của ta
    allNotes[idEdit] = edit;
    // gán giá trị mới cho thằng element trong cái chuỗi bằng nội dung từ th input 
    notesClass.innerHTML = '';
    // sau đó remove tất cả th con có trong cái orde list
    for (index in allNotes) {
        displayNotes(index+1);
    }
    // và thêm lại tất cả element list vào trong order list
    // để người dùng thấy đc sự cập nhật ngay tức thì :))
    saveListToLocal(allNotes);
     // sau đó lưu cái list đã update th element đó vào trong local storage
} 
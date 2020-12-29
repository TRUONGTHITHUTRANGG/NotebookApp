

  let button = document.getElementById('addNote');
  let notesClass = document.querySelector('div.notes ol');
 
  let allNotes = []; 
  let idEdit = 0; 

 let li = document.getElementById('ol').children;

  function saveListToLocal(list) {
    localStorage.setItem("list",JSON.stringify(list))
}
function getListToLocal(list) {
   return JSON.parse(localStorage.getItem("list"))
}

 function loadPage() {
    allNotes = getListToLocal() || [];
  
    for (index in allNotes) {
        displayNotes(index+1);
    }
 }

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

    
 }

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

 });


 function deleteNote(id) {
     allNotes.splice(id, 1)
     document.getElementById(id).style = "display:none;";
     saveListToLocal(allNotes)
 }



 function editNote(id) {
    idEdit = id;
    document.getElementById("txEdit").value = allNotes[id];
 }

function saveEditModal() {
    let edit = document.getElementById("txEdit").value;
    allNotes[idEdit] = edit;
    notesClass.innerHTML = '';
    for (index in allNotes) {
        displayNotes(index+1);
    }
    saveListToLocal(allNotes);
} 
const popup = () => {
  console.log("anyaaaad");
  const popupC = document.createElement("div");
  popupC.innerHTML=`<div id="popupC">
        <h1>New Entry</h1>
        <div id="entry">
          <div id="moodC">
            <label><input type="radio" name="mood" value="Happy"> Happy</label><br>
            <label><input type="radio" name="mood" value="Sad"> Sad</label><br>
            <label><input type="radio" name="mood" value="Excited"> Excited</label><br>
            <label><input type="radio" name="mood" value="Tired"> Tired</label><br>
            <label><input type="radio" name="mood" value="Angry"> Angry</label><br>
          </div>
          <textarea id="entry-text" placeholder="Enter your note..." maxlength="200"></textarea>
        </div>
        <div id="btn-container">
            <button id="submitButton" onclick="submit()">Add</button>
            <button id="closeButton" onclick="closePopup()">Close</button>
        </div>
    </div>`;
    document.body.appendChild(popupC);
}
const closePopup = () =>{
  const popupContainer = document.getElementById("popupC");
  if(popupContainer) {
      popupContainer.remove();
  }
}

const submit = async () => {
  const selected = document.querySelector('input[name="mood"]:checked');
  const text = document.getElementById('entry-text').value;
  const data = {
    "note":text,
    "mood":selected.value
  }
  await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
       "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
  
.then(json => console.log(json));
showEntries();
}

const displayEntries = (mood, note)=>
{
  var color="red";
  switch(mood)
  {
    case "Happy": color="#F27A7D";break;
    case "Sad": color="#5A7C85";break;
    case "Excited": color="#E15A2B";break;
    case "Tired": color="#8E6D7B";break;
    case "Angry": color="#8B2E36";break;
  }
  const entrylist = document.getElementById("entrylist");
  const entry = document.createElement("div");
  entry.innerHTML=`
  <div class="card" style="background-color:${color};">
    <h1>${mood}</h1>
    <div class="prevText">${note}</div>
  </div>
  `;
  entrylist.appendChild(entry);
}

const showEntries = async () =>
{
  let data = [];
  const res = await fetch('http://localhost:3000');
  data = await res.json();
  data.map(x => displayEntries(x.mood,x.note))
}

showEntries();
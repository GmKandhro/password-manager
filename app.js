let saveBtn = document.querySelector('#saveBtn')
 let card = document.querySelector('#card')

 function togglePasswordVisibility(index) {
  const passwordElement = document.getElementById(`password-${index}`);
  const eyeIcon = document.querySelector(`.toggle-eye:nth-child(${index + 1})`);

  let toggleEye = document.querySelector(`.toggle-eye${index}`)
  if (passwordElement.classList.contains("visible")) {
    passwordElement.textContent = "*".repeat(passwordElement.textContent.length);
    passwordElement.classList.remove("visible");
    toggleEye.classList.remove("fa-eye-slash");
    toggleEye.classList.add("fa-eye");
    
  } else {
    passwordElement.textContent = passwordElement.dataset.originalPassword;
    passwordElement.classList.add("visible");
    toggleEye.classList.remove("fa-eye");
    toggleEye.classList.add("fa-eye-slash")
  }
}

const deleteCard = (index) => {
  let data = localStorage.getItem('storedData');
  let newData = JSON.parse(data);

  if (index >= 0 ) {
    newData.splice(index, 1); // Remove one element at the specified index
    localStorage.setItem('storedData', JSON.stringify(newData)); // Update localStorage
    displayData();
  } else {
    console.error('Invalid index to remove');
  }
};

const copyPassword = (index)=>{
  const passwordElement = document.getElementById(`password-${index}`);
  let password = passwordElement.textContent = passwordElement.dataset.originalPassword;
  console.log(password)
  navigator.clipboard.writeText(password).then(()=>{
    alert('password has been copied')
  }).catch((err)=>{
    alert('password has not been copied bue to this' , err)
  })
}



saveBtn.addEventListener('click', () => {
    let webName = document.querySelector('#website-name').value;
    let userName = document.querySelector('#userName').value;
    let password = document.querySelector('#password').value;

  let existingDataJSON  = localStorage.getItem('storedData')

  let existingData  = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  let newObj = {
    webName : webName,
    userName:userName,
    password:password
  }

  newObj.originalPassword = password;

  existingData.push(newObj)

  let updatedDataJSON  = JSON.stringify(existingData)

  localStorage.setItem('storedData' , updatedDataJSON)

      document.querySelector('#website-name').value = '';
      document.querySelector('#userName').value = '';
      document.querySelector('#password').value = '';

      displayData()
    //   console.log(data)
    
});

let displayData = () => {
  let data = localStorage.getItem('storedData');
  if (data) {
    let dataArray = JSON.parse(data); // Parse the data string into an array
    console.log(dataArray);

    // Clear the existing cards
    card.innerHTML = '';

    dataArray.forEach((obj, index) => {
      let el = `<div class="mt-2 w-[300px] h-auto rounded-2xl bg-[#d7d9df] mx-auto px-3 py-1">    
      <h3>Website name is ${obj.webName}</h3>
      <h3>User name is username ${obj.userName}</h3>
      <h3>Password: 
        <span id="password-${index}" class="password" data-original-password="${obj.password}">${"*".repeat(obj.password.length)}</span>
        <i class="fa fa-eye toggle-eye${index}" onclick="togglePasswordVisibility(${index})"></i>
        <i class="fas fa-copy copy-icon" onclick="copyPassword(${index})"></i> 
      </h3>
      <button class="bg-red p-2 mt-2" onclick="deleteCard(${index})">Delete</button>
    </div>`;

      card.insertAdjacentHTML("beforeend", el);
    });
  }
};
if (card.innerHTML == '\n         \n        ') {
  card.innerHTML = `<p>Save your pass here...</p>`
}
console.log(card.innerHTML)

displayData();




// Get DOM elements
const saveBtn = document.querySelector('#saveBtn');
const card = document.querySelector('#card');
const websiteNameInput = document.querySelector('#website-name');
const userNameInput = document.querySelector('#userName');
const passwordInput = document.querySelector('#password');

// Toggle password visibility
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
    toggleEye.classList.add("fa-eye-slash");
  }
}

// Delete a card
const deleteCard = (index) => {
  let storedData = JSON.parse(localStorage.getItem('storedData'));

  if (index >= 0 && storedData) {
    storedData.splice(index, 1); // Remove one element at the specified index
    localStorage.setItem('storedData', JSON.stringify(storedData)); // Update localStorage
    displayData();
  } else {
    console.error('Invalid index to remove');
  }
};

// Copy password to clipboard
const copyPassword = (index) => {
  const passwordElement = document.getElementById(`password-${index}`);
  const password = passwordElement.textContent;

  navigator.clipboard.writeText(password)
    .then(() => {
      alert('Password has been copied');
    })
    .catch((err) => {
      alert('Password has not been copied due to an error: ' + err);
    });
};

// Add event listener for the save button
saveBtn.addEventListener('click', () => {
  const webName = websiteNameInput.value;
  const userName = userNameInput.value;
  const password = passwordInput.value;

  let storedData = JSON.parse(localStorage.getItem('storedData')) || [];

  const newObj = {
    webName: webName,
    userName: userName,
    password: password,
    originalPassword: password,
  };

  storedData.push(newObj);

  localStorage.setItem('storedData', JSON.stringify(storedData));

  // Clear input fields
  websiteNameInput.value = '';
  userNameInput.value = '';
  passwordInput.value = '';

  displayData();
});

// Display stored data
const displayData = () => {
  let storedData = JSON.parse(localStorage.getItem('storedData')) || [];
  card.innerHTML = '';

  if (storedData.length === 0) {
    card.innerHTML = '<p>Save your passwords here...</p>';
    return;
  }

  storedData.forEach((obj, index) => {
    const el = `
      <div class="mt-2 w-[300px] h-auto rounded-2xl bg-[#d7d9df] mx-auto px-3 py-1">    
        <h3>Website name is ${obj.webName}</h3>
        <h3>User name is username ${obj.userName}</h3>
        <h3>Password: 
          <span id="password-${index}" class="password" data-original-password="${obj.password}">
            ${"*".repeat(obj.password.length)}
          </span>
          <i class="fa fa-eye toggle-eye${index}" onclick="togglePasswordVisibility(${index})"></i>
          <i class="fas fa-copy copy-icon" onclick="copyPassword(${index})"></i> 
        </h3>
        <button class="bg-red p-2 mt-2" onclick="deleteCard(${index})">Delete</button>
      </div>
    `;

    card.insertAdjacentHTML("beforeend", el);
  });
};

displayData();

FinalField = document.getElementById("Age");
FirstName = document.getElementById("FirstName");
Address = document.getElementById("Address");
Btn = document.getElementById("Btn");
resultText = document.getElementById("resultText");
Resultlist = document.getElementById("Resultlist");
function tocheck() {
  if (
    FinalField.value !== "" &&
    FirstName.value !== "" &&
    Address.value !== "" &&
    FinalField.value == parseInt(FinalField.value)
  ) {
    return true;
  } else {
    alert("All Fields Required & Age should be number");
  }
}
tosendData = async () => {
  let data = {
    FirstName: FirstName.value,
    Address: Address.value,
    Age: parseInt(FinalField.value),
  };
  await fetch("http://localhost:8000/sendData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => toshow(responseData));
};

function toshow(responseData) {
  responseData = responseData[0];
  resultText.textContent = "Successfully Added";
  let li = document.createElement("li");
  li.textContent = `\b  Name:   ${responseData["name"]} \b  Address:  ${responseData["address"]}  \b  Age:   ${responseData["age"]} `;
  Resultlist.appendChild(li);
  resultText.textContent = "";
}
Btn.addEventListener("click", function () {
  if (tocheck()) {
    tosendData();
    FinalField.value = "";
    FirstName.value = "";
    Address.value = "";
  }
});

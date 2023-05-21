'use strict';
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const submitBtn = document.getElementById('submit-btn');
const tableBodyEl = document.getElementById('tbody');
const colorInput = document.getElementById('input-color-1');
const healthyBtn = document.getElementById('healthy-btn');
const petArr = [];


// Bắt sự kiện Click vào nút "Submit"

submitBtn.addEventListener('click', function () {
    //  Lấy được dữ liệu từ các Input Form
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
    };
    // Validate dữ liệu hợp lệ
    const validate = validateData(data)
    console.log(validate);

    if (validate) {
        petArr.push(data);
        clearInput();
        renderTableData(petArr);
    };






});
renderTableData(petArr);
function renderTableData(petArr){
    tableBodyEl.innerHTML = "";
    for(let i = 0;i < petArr.length;i++){
        const row = document.createElement('tr');
        row.innerHTML = ` 

                            <th scope="row">${petArr[i].id}</th>
							<td>${petArr[i].name}</td>
							<td>${petArr[i].age}</td>
							<td>${petArr[i].type}</td>
							<td>${petArr[i].weight}</td>
							<td>${petArr[i].length}</td>
							<td>${petArr[i].breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
							</td>
							<td><i class="bi ${petArr[i].vaccinated ? "bi-check-circle-fill":"bi-x-circle-fill"}"></i></td>
                            <td><i class="bi ${petArr[i].dewormed ? "bi-check-circle-fill":"bi-x-circle-fill"}"></i></td>
                            <td><i class="bi ${petArr[i].sterilized ? "bi-check-circle-fill":"bi-x-circle-fill"}"></i></td>
							<td>${petArr[i].date.getDate()}/${petArr[i].date.getMonth() + 1}/${petArr[i].date.getFullYear()}</td>
							<td>
	<button class="btn btn-danger" onclick="deletePet('${ petArr[i].id }')">Delete</button>
</td>
							</td>
                             `;
        tableBodyEl.appendChild(row);
    }

}
function deletePet(petId){
    const isDeleted = confirm("Are you sure?");
    if(isDeleted){
        // thuc hien buoc xoa
        for(let i = 0; i < petArr.length;i++) {
            if(petId === petArr[i].id){
                petArr.splice(i,1);
                renderTableData(petArr);
            }
        } 
    }

}




function clearInput(){
    idInput.value ="";
    nameInput.value="";
    ageInput.value="";
    typeInput.value ="Select Type";
    weightInput.value="";
    lengthInput.value="";
    colorInput.value="#000000";
    breedInput.value="Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;    
    sterilizedInput.checked = false;    
}




function validateData(data) {
    console.log(1)
    // khong nhập thiếu dữ liệu
    let isValidate = true;
    if (data.id.trim() === "") {
        alert("Không được bỏ trống !");
        isValidate = false;

    }

    if (data.name.trim() === "") {
        alert("Không được bỏ trống !");
        isValidate = false;

    }
    if (isNaN(data.age)) {
        alert("Không được bỏ trống !");
        isValidate = false;

    }
    if (isNaN(data.weight)) {
        alert("Không được bỏ trống !");
        isValidate = false;

    }
    if (isNaN(data.length)) {
        alert("Không được bỏ trống !");
        isValidate = false;

    }
    for(let i = 0; i< petArr.length;i++){
        if(data.id === petArr[i].id){
            alert("ID must unique!");
            isValidate = false;
        }
       
    }
    if(data.id === data1.id){
        alert("ID must unique!");
        isValidate = false;
    }
    if(data.age<1 || data.age>15){
        alert("Age must be between 1 and 15!");
        isValidate = false;
    }
    if(data.weight<1|| data.weight>15){
        alert("Weight must be between 1 and 15!");
        isValidate = false;
    }
    if(data.length<1|| data.length>100){
        alert("Length must be between 1 and 100!");
        isValidate = false;
    }
    if(data.type === "Select Type"){
        alert( "Please select Type!");
        isValidate = false;
    }
    if(data.breed === "Select Breed"){
        alert( "Please select Breed!");
        isValidate = false;
    }
    return isValidate;
   

}
let healthyCheck = true;
healthyBtn.addEventListener("click",function(){
    if(healthyCheck === true){
        const healthyPet = [];
        for(let i = 0 ;i  < petArr.length;i++){
            if(petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized){
                healthyPet.push(petArr[i]);
            }
        }
        renderTableData(healthyPet);
        healthyBtn.textContent = "Show All Pet";
        healthyCheck = false;

    }else{
        renderTableData(petArr);
        healthyBtn.textContent = "Show Healthy Pet";
        healthyCheck = true;
    }
})
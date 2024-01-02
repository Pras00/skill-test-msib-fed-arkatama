// Add Data
const popupAddData = document.querySelector(".addData");
const addData = document.querySelector(".add");
const cancelAdd = document.querySelector(".cancelForm");

// Edit Data
const popupEditData = document.querySelector(".editData");
const cancelEdit = document.querySelector('.cancelEdit');

// Pop Up Add Data
function popupOpenForm() {
    popupAddData.style.display = "block";
}
function popupCloseForm() {
    popupAddData.style.display = "none";
}

// Pop Up Edit Data
function popupCloseEdit() {
    popupEditData.style.display = "none";
}

// Show Popup Add Data
addData.addEventListener('click', popupOpenForm);
// Close Popup Add Data
cancelAdd.addEventListener('click', popupCloseForm);
// Close Popup Edit Data
cancelEdit.addEventListener('click', popupCloseEdit);



// POST - CREATE Method
const username = document.getElementById('Username');
const email = document.getElementById('Email');
const instansi = document.getElementById('Instansi');
const testimoni = document.getElementById('Testimoni');
const foto = document.getElementById('Foto');
const submitForm = document.querySelector('.sendForm');

submitForm.addEventListener('click', popupCloseForm);

submitForm.addEventListener('click', () => {
    // Validasi formulir
    if (!username.checkValidity() || !email.checkValidity() || !instansi.checkValidity() || !testimoni.checkValidity() || !foto.checkValidity()){
        // Validasi gagal, tampilkan pesan atau lakukan sesuatu
        alert('Silakan isi semua field dengan benar.');
        return; // Hentikan proses submit formulir
    }
    
    const data = {
        nama: username.value,
        email: email.value,
        asal_instansi: instansi.value,
        testimoni: testimoni.value,
        foto: foto.value,
    }


    fetch('https://65938d5d1493b0116068af1a.mockapi.io/testimoni', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
})



// READ - GET Method
const tBody = document.querySelector('.userTable');

fetch('https://65938d5d1493b0116068af1a.mockapi.io/testimoni')
.then(response => response.json()) 
.then(data => {
    
    const Data = data;
    for (let i = 0; i < Data.length; i++) {
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('class', 'userData');
        tBody.appendChild(tableRow);
        const userData = document.getElementsByClassName('userData');
        userData[i].innerHTML = `
            <td>${[i + 1]}</td>
            <td>${Data[i].nama}</td>
            <td>${Data[i].email}</td>
            <td>${Data[i].testimoni}</td>
            <td>
                <div class="table-btn">
                    <button data-id="${Data[i].id}" class="fa fa-pen edit"></button>
                    <button data-id="${Data[i].id}" class="fa fa-trash delete"></button>
                </div>
            </td>
        `
        // Update
        updateButton()
        // Delete
        deleteButton()
    };
})
.catch(error => {
    console.error('Error:', error);
})



// PATCH - UPDATE Method
function updateButton() {
    const updateData = document.querySelectorAll('.edit');
    updateData.forEach((e) => {
        e.addEventListener('click', function() {
            popupEditData.style.display = "block";
            // GET ID
            const dataId = this.getAttribute('data-id')

            // Element Data
            const username = document.getElementById('editUsername');
            const email = document.getElementById('editEmail');
            const instansi = document.getElementById('editInstansi');
            const testimoni = document.getElementById('editTestimoni');
            const foto = document.getElementById('editFoto');
            const submitForm = document.querySelector('.sendEdit');

            submitForm.addEventListener('click', popupCloseEdit);

            submitForm.addEventListener('click', function() {
                const data = {
                    nama: username.value,
                    email: email.value,
                    asal_instansi: instansi.value,
                    testimoni: testimoni.value,
                    foto: foto.value,
                }

                // Validasi formulir
                if (!username.checkValidity() || !email.checkValidity() || !instansi.checkValidity() || !testimoni.checkValidity() || !foto.checkValidity()){
                    // Validasi gagal, tampilkan pesan atau lakukan sesuatu
                    alert('Silakan isi semua field dengan benar.');
                    return; // Hentikan proses submit formulir
                }
            
                fetch(`https://65938d5d1493b0116068af1a.mockapi.io/testimoni/${dataId}`, {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
        })
    })
}



// DELETE Method
function deleteButton() {
    const deleteData = document.querySelectorAll('.delete');
    deleteData.forEach((e) => {
        e.addEventListener('click', function() {
            // GET ID 
            const dataId = this.getAttribute('data-id');

            fetch(`https://65938d5d1493b0116068af1a.mockapi.io/testimoni/${dataId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
    })
}

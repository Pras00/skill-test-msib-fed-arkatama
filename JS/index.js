// Slide Home Alumni

let slideIndex = 1;
  showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("testimonials");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }

  x[slideIndex-1].style.display = "block";
}

// Hamburger Button
function openNav() {
  document.getElementById("sideNav").style.width = "360px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}


// Pop Up Dashboard
function popupOpenForm() {
  document.getElementById("addForm").style.display = "block";
}

function popupCloseForm() {
  document.getElementById("addForm").style.display = "none";
}



// READ - GET Method
const tBody = document.querySelector('.profileInformation');

fetch('https://65938d5d1493b0116068af1a.mockapi.io/testimoni')
.then(response => response.json())
.then(data => {
    
    const Data = data;
    for (let i = 0; i < Data.length; i++) {
        const testimonials = document.createElement('div');
        testimonials.setAttribute('class', 'testimonials');
        tBody.appendChild(testimonials);
        const userData = document.getElementsByClassName('testimonials');
        userData[i].innerHTML = `
          <div class="alumniProfile">
            <img src="${Data[i].foto}" alt="Avatar">
            <div class="alumniProfile-title">
                <h3>${Data[i].nama}</h3>
                <p>Freelance</p>
            </div>
          </div>
          <div class="alumniExperience">
            <p>
              ${Data[i].testimoni}
            </p>
          </div>
        `
    };
})
.catch(error => {
    console.error('Error:', error);
})


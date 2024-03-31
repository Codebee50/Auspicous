const navBar = document.getElementById("nav-bar");
const mobile = document.querySelector(".mobile");
const contactForm = document.getElementById("contact-form");
let selectedInterest= ''

// transitionModal('contact-modal')


function enterContactModalLoadingState(){
  document.querySelector('.loading-container').classList.add('visible')
  document.querySelector('.submit-contact-modal-form').disabled = true
}

function resetContactModalLoadingState(){
  document.querySelector('.loading-container').classList.remove('visible')
  document.querySelector('.submit-contact-modal-form').disabled = false
}


function generateRandomString() {
  return Math.random().toString(36).slice(2);
}

function sendEmail({
  toEmail,
  toName,
  senderName = "Auspicious website",
  senderEmail = "onuhudoudo@gmail.com",
  subject = "Test",
  htmlContent,
  onSuccess = ()=>{}, 
  onError = ()=>{},
  onFinished = ()=>{}
}) {
  if (!toEmail || !toName || !htmlContent) return;

  fetch("https://api.sendinblue.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": "",
      "content-type": "application/json",
      "X-Sib-Sandbox": "drop",
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: toEmail,
          name: toName,
        },
      ],
      subject: subject,
      htmlContent: htmlContent,
      headers: {
        "X-Mailin-custom":
          "custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3",
        charset: "iso-8859-1",
      },
    }),
  })
    .then((response) =>{
      if(response.ok){
        onSuccess()
      }
      else{
        onError()
      }
      return response.json()
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error))
    .finally(onFinished)
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if(selectedInterest === '') return

  enterContactModalLoadingState()

  const formData = new FormData(e.target)
  const name = formData.get('name')
  const contact = formData.get('contact')


  const htmlContent = `
  <html>
  <head></head>
  <body style="padding: 30px;">
      <br>
      <h1>New Solar installation request</h1>
      <br><br>

      <p><b>Name: </b> ${name}</p> <br>
      <p><b>Contact info: </b> ${contact}</p> <br>
      <p><b>Reqeusted Item:</b> ${selectedInterest}</p> <br>
      <br>
  </body>
  </html>
  `
  
  sendEmail({
   toEmail: "onuhudoudo@gmail.com",
   toName: "Sulaiman Popoola Olasunkianmi",
   subject: `Solar Installation request from Auspicious website ~id:${generateRandomString()}`,
   htmlContent: htmlContent,
   onFinished: ()=>{
    resetContactModalLoadingState()
    transitionModal('None')
   },
   onSuccess: ()=> {
    showToast({
      message: 'Thank you for your inquiry. We have received your request and will be in touch within 1-3 days to discuss it further.',
      style: 'success',
      duration: 10000
    })
   },
   onError: ()=> {
    showToast({
      message: 'An error occured while sending email, please try again later.',
      style: 'success',
      duration: 5000
    })
   }
  })
});



document.querySelectorAll(".btn-get-started").forEach(function (btn) {
  btn.addEventListener("click", function (clicked) {
   
    const targetBtn = clicked.target;
    const planName = targetBtn.getAttribute("data-planname");
    showContactModal(planName);
    selectedInterest = planName
  });
});

mobile.addEventListener("click", openNav);

document.querySelector(".close-nav").addEventListener("click", closeNav);

function openNav() {
  navBar.classList.add("visible");
}

function closeNav() {
  navBar.classList.remove("visible");
}

// var home = document.querySelector("#home");
// var app = document.querySelector("#app");
// var pat = document.querySelector("#pat");
// var pr = document.querySelector("#pr");
// var slide = document.querySelector(".slide");
// var icons = document.querySelector(".icons");
// var entries = document.querySelector(".icons");

// home.addEventListener("click", ()=>{
//     slide.style.top = "23%";
//     slide.style.opacity = "1";
//     icons.style.color = "#866ad0";
//     entries.style.color = "#866ad0";
// })
// app.addEventListener("click", ()=>{
//     slide.style.top = "45%";
//     slide.style.opacity = "1"
//       icons.style.color = "#866ad0";
//       entries.style.color = "#866ad0";
// })
// pat.addEventListener("click", ()=>{
//     slide.style.top = "67%";
//     slide.style.opacity = "1"
//       icons.style.color = "#866ad0";
//       entries.style.color = "#866ad0";
// })
// pr.addEventListener("click", ()=>{
//     slide.style.top = "89%";
//     slide.style.opacity = "1"
//       icons.style.color = "#866ad0";
//       entries.style.color = "#866ad0";
// })

function toggle() {
  var maindiv = document.querySelector("#maindiv");
  maindiv.classList.toggle("active");
  var container = document.querySelector(".container");
  container.classList.toggle("active");
}

/* Form Validation Code */
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;
nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
submitBtn.addEventListener("click", function () {
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function () {
    alert("Your Form Successfully Signed up");
    location.reload();
  }, 800);
});
prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

/* Input Type Currency */

$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  },
});

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

// submit.addEventListener("click", function () {
//   var div = document.createElement("div");
//   div.classList.add("claimdet");
//   div.innerHTML = `<div id="profilediv">
//               <div id="profile">
//                 <img
//                   src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
//                   alt=""
//                 />
//                 <div id="name">
//                   <h3>_Sahil Saxena</h3>
//                   <p class="grey">_21 Years Old, _Male</p>
//                 </div>
//               </div>
//               <div id="details">
//                 <div id="company">
//                   <p class="grey">Insurance Provider</p>
//                   <h4>_Birla Insurance</h4>
//                 </div>
//                 <div id="credit">
//                   <p class="grey">Credit Left</p>
//                   <h4>_2.3 Lacs</h4>
//                 </div>
//               </div>
//               <div id="initiate">
//                 <button id="claim" onclick="toggle()">new claim</button>
//                 <button id="calluser"><i class="ri-phone-line"></i></button>
//               </div>
//             </div>`;
//   detailsection.appendChild(div);
// });

// var arr = [];

// form
var claimform = document.querySelector("#claimform");

// imput fields
var claimname = document.querySelector("#claimname");
var claimdes = document.querySelector("#claimdes");
var currencyfield = document.querySelector("#currency-field");

claimform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");

  var ip1 = claimname.value;
  var ip2 = claimdes.value;
  var ip3 = currencyfield.value.slice(1).replaceAll(",", "") * 1;
  console.log(ip3);
  console.log(typeof (ip3));
  var obj = {
    title: ip1,
    details: ip2,
    amount: ip3,
    hospitalName: "Bansal Hospital Bhopal",
    insuranceCompanyName: "Birla Inc.",
    status: "pending"
  };
  console.log(obj);
  // arr.push(obj);
  let arr;
  let claimData = localStorage.getItem("claimData");
  if (!claimData) {
    arr = [];
  } else {
    arr = JSON.parse(claimData);
  }
  arr.push(obj);
  localStorage.setItem("claimData", JSON.stringify(arr));
  // let stored = JSON.parse(localStorage.getItem(`data${i}`));
});
// console.log(i);

var submit = document.querySelector(".submit");
var detailsection = document.querySelector("#detailsection");

function StartGame() {
  // console.log("first")
  let claimData = localStorage.getItem("claimData");
  if (claimData) {
    claimData = JSON.parse(claimData);
    claimData.forEach((data) => {
      var div = document.createElement("div");
      div.classList.add("claimdet");
      div.innerHTML = `<div class="claimdiv">
                <div class="claim">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/002/641/198/original/invoice-icon-vector.jpg"
                    alt=""
                  />
                  <div class="claimhead">
                    <h3>${data.title}</h3>
                    <p class="grey towrap">${data.details}</p>
                  </div>
                </div>
                <div class="claimdetails">
                  <div class="amount">
                    <p class="grey">Sum</p>
                    <h4>Rs. ${data.amount}</h4>
                  </div>
                  <div class="docs">
                    <p class="grey">Doc.</p>
                    <h4><i class="ri-download-line"></i></h4>
                  </div>
                </div>
              </div>`;
      detailsection.appendChild(div);
    });
  }
  // var i = localStorage.length;
  // for (var x = 0; x < count; x++) {
  // //   var temp = x + 1;
  // //   var ip1 = JSON.parse(localStorage.getItem(`${temp}`)).ip1;
  // //   var ip2 = JSON.parse(localStorage.getItem(`${temp}`)).ip2;
  // //   var ip3 = JSON.parse(localStorage.getItem(`${temp}`)).ip3;
  //   var div = document.createElement("div");
  //   div.classList.add("claimdet");
  //   div.innerHTML = `<div class="claimdiv">
  //           <div class="claim">
  //             <img
  //               src="https://static.vecteezy.com/system/resources/previews/002/641/198/original/invoice-icon-vector.jpg"
  //               alt=""
  //             />
  //             <div class="claimhead">
  //               <h3>${count}</h3>
  //               <p class="grey towrap">${count}</p>
  //             </div>
  //           </div>
  //           <div class="claimdetails">
  //             <div class="amount">
  //               <p class="grey">Sum</p>
  //               <h4>Rs. ${count}</h4>
  //             </div>
  //             <div class="docs">
  //               <p class="grey">Doc.</p>
  //               <h4><i class="ri-download-line"></i></h4>
  //             </div>
  //           </div>
  //         </div>`;
  //   detailsection.appendChild(div);
  // }
}

if (localStorage.length > 0) {
  document.querySelector("#sendreq").style.display = "initial";
  document.querySelector(".newshowdiv").style.display = "flex";
}

function sendReq() {
  let claimData = localStorage.getItem("claimData");
  if (claimData) {
    fetch("/createClaim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: claimData,
    })
      .then((d) => {
        return d.json();
      })
      .then((result) => {
        console.log(result);
        document.querySelector("#detailsection").innerHTML = "";
        localStorage.removeItem("claimData");
      });
  }
}

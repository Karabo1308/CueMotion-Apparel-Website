// this is for accordion
// when you click it shows and hides the panel
// i got codes from w3schools
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // this adds active class when clicked
    this.classList.toggle("active");
    // this gets the next element which is panel
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      // if it is showing hide it
      panel.style.display = "none";
    } else {
      // if it is hidden show it
      panel.style.display = "block";
    }
  });
}

// this is for tabs
// it hides all tabs and shows only clicked one
function openTab(evt, tabName) {
  // get all tab content
  var tabcontent = document.getElementsByClassName("tabcontent");
  // loop through all and hide them
  for (var j = 0; j < tabcontent.length; j++) {
    tabcontent[j].style.display = "none";
  }
  // get all tab buttons
  var tablinks = document.getElementsByClassName("tablinks");
  // remove active class from all buttons
  for (var j = 0; j < tablinks.length; j++) {
    tablinks[j].className = tablinks[j].className.replace(" active", "");
  }
  // show the clicked tab
  document.getElementById(tabName).style.display = "block";
  // add active class to button that was clicked
  evt.currentTarget.className += " active";
}

// this filters products by category
// like tees, hoodies etc
function filterProducts(category) {
  // get all product cards
  var cards = document.getElementsByClassName("product-card");
  // fix for Show All - show all tabcontent sections first
  var allTabs = document.getElementsByClassName("tabcontent");
  for (var t = 0; t < allTabs.length; t++) {
    allTabs[t].style.display = "block";
  }
  for (var k = 0; k < cards.length; k++) {
    // if category is all show all
    if (category == "all") {
      cards[k].style.display = "block";
    } else {
      // check if card category matches clicked category
      if (cards[k].getAttribute("data-category") == category) {
        cards[k].style.display = "block";
      } else {
        // if not same category hide it
        cards[k].style.display = "none";
      }
    }
  }
}

// this is for image popup when you click product image
// i made it a function so it works again after loading products
function bindGalleryModal() {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg) return;
  // get all gallery images
  var galleryImgs = document.getElementsByClassName("gallery-img");
  for (var m = 0; m < galleryImgs.length; m++) {
    galleryImgs[m].onclick = function() {
      // show modal when image clicked
      modal.style.display = "block";
      // set modal image to same as clicked image
      modalImg.src = this.src;
    }
  }
  // close button
  var span = document.getElementsByClassName("close")[0];
  if (span) {
    span.onclick = function() { 
      modal.style.display = "none"; 
    };
  }
  // close when clicking outside image
  modal.onclick = function(event) { 
    if (event.target == modal) {
      modal.style.display = "none"; 
    }
  };
}
bindGalleryModal();

// this shows product details in a popup
function openProductModal(text) {
  // put text inside modal - fake number for school project
  document.getElementById("productModalText").innerHTML = text + "<br><br>Order via WhatsApp: 078 912 3456 or Instagram @thereal_cuemotion or Email: hello@cuemotion.co.za";
  // show modal
  document.getElementById("productModal").style.display = "block";
}
function closeProductModal() {
  // hide modal
  document.getElementById("productModal").style.display = "none";
}

// this is for enquiry page
// checks inputs and shows cost and availability
// from w3schools form validation
function handleEnquiry(event) {
  event.preventDefault();
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
  var type = document.getElementById("enqType").value;
  var msg = document.getElementById("message").value.trim();

  document.getElementById("nameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  if(document.getElementById("phoneError")) {
    document.getElementById("phoneError").innerHTML = "";
  }
  document.getElementById("typeError").innerHTML = "";
  document.getElementById("messageError").innerHTML = "";

  var ok = true;

  if (name == "") {
    document.getElementById("nameError").innerHTML = "Please enter your name";
    ok = false;
  } else if (name.length < 3) {
    document.getElementById("nameError").innerHTML = "Name too short";
    ok = false;
  }

  if (email == "" || email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    document.getElementById("emailError").innerHTML = "Please enter valid email";
    ok = false;
  }

  if (phone != "" && phone.length < 10) {
    document.getElementById("phoneError").innerHTML = "Enter valid WhatsApp number";
    ok = false;
  }

  if (type == "") {
    document.getElementById("typeError").innerHTML = "Please select enquiry type";
    ok = false;
  }

  if (msg == "") {
    document.getElementById("messageError").innerHTML = "Please enter your enquiry";
    ok = false;
  } else if (msg.length < 10) {
    document.getElementById("messageError").innerHTML = "Message too short";
    ok = false;
  }

  if (!ok) {
    return false;
  }

  var costText = "";
  var availText = "";
  if (type == "products") {
    costText = "Tees R250 - R350, Hoodies R550 - R750, Tracksuits R650 - R900";
    availText = "In Stock - Bloemfontein, ships in 2-3 days";
  } else if (type == "services") {
    costText = "Custom Design from R400, depends on design";
    availText = "Available - 5-7 days turnaround";
  } else if (type == "volunteer") {
    costText = "No cost - Brand Ambassador is free";
    availText = "Open - we need ambassadors in Free State";
  } else if (type == "sponsor") {
    costText = "Sponsorship packages from R1000";
    availText = "Limited slots - contact us to discuss";
  }

  var box = document.getElementById("responseBox");
  box.style.display = "block";
  box.innerHTML = "<b>Thanks " + name + "!</b><br><br>Enquiry Type: " + type + "<br>Cost: " + costText + "<br>Availability: " + availText + "<br><br>We will reply to: " + email + " or WhatsApp " + phone + "<br><br><i>Your message:</i> " + msg;

  document.getElementById("enquiryForm").reset();
  return false;
}

// this is for contact page
// compiles message into email
// recipient stated in code as per brief
function handleContact(event) {
  event.preventDefault();
  var cName = document.getElementById("cName").value.trim();
  var cEmail = document.getElementById("cEmail").value.trim();
  var cPhone = document.getElementById("cPhone").value.trim();
  var cType = document.getElementById("cType").value;
  var cMsg = document.getElementById("cMessage").value.trim();

  document.getElementById("cNameError").innerHTML = "";
  document.getElementById("cEmailError").innerHTML = "";
  document.getElementById("cPhoneError").innerHTML = "";
  document.getElementById("cTypeError").innerHTML = "";
  document.getElementById("cMessageError").innerHTML = "";

  var valid = true;

  if (cName == "") {
    document.getElementById("cNameError").innerHTML = "Please enter name";
    valid = false;
  }
  if (cEmail == "" || cEmail.indexOf("@") == -1) {
    document.getElementById("cEmailError").innerHTML = "Enter valid email";
    valid = false;
  }
  if (cPhone == "" || cPhone.length < 10) {
    document.getElementById("cPhoneError").innerHTML = "Enter phone number";
    valid = false;
  }
  if (cType == "") {
    document.getElementById("cTypeError").innerHTML = "Select message type";
    valid = false;
  }
  if (cMsg == "") {
    document.getElementById("cMessageError").innerHTML = "Please write message";
    valid = false;
  }

  if (!valid) {
    return false;
  }

  var recipient = "hello@cuemotion.co.za"; 
  var subject = "CueMotion Contact: " + cType + " from " + cName;
  var body = "Name: " + cName + "%0D%0A";
  body += "Email: " + cEmail + "%0D%0A";
  body += "Phone: " + cPhone + "%0D%0A";
  body += "Type: " + cType + "%0D%0A%0D%0A";
  body += "Message:%0D%0A" + cMsg;

  var mailtoLink = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + body;

  var preview = document.getElementById("emailPreview");
  preview.style.display = "block";
  preview.innerHTML = "<b>Email compiled to:</b> " + recipient + "<br><br><b>Subject:</b> " + subject + "<br><br><b>Message:</b><br>" + cName + "<br>" + cEmail + "<br>" + cPhone + "<br>" + cType + "<br><br>" + cMsg + "<br><br><a href='" + mailtoLink + "'><button>Open in Email App</button></a>";

  document.getElementById("contactForm").reset();
  return false;
}

// this makes page fade in
$(document).ready(function() {
  $(".animate-section").hide().fadeIn(1000);
  $(".product-card").hover(function(){ 
    $(this).css("border","2px solid black"); 
  }, function(){ 
    $(this).css("border","none"); 
  });
});

// when you click map it shows our info - fake details for school
var mapDiv = document.getElementById("map");
if (mapDiv) {
  mapDiv.addEventListener("click", function() {
    alert("CueMotion Apparel - Bloemfontein, Free State, SA\nWhatsApp: 078 912 3456\nInstagram: @thereal_cuemotion\nTikTok: @official_cuemotion\nEmail: hello@cuemotion.co.za");
  });
}

//  PRODUCTS
var productsData = [
  { name: "White Tee", price: 350, category: "tees", image: "images/WhiteShirt.jpg", alt: "White Tee streetwear Bloemfontein - CueMotion Apparel" },
  { name: "Cream Tee", price: 350, category: "tees", image: "images/CreamWhiteShirt.jpg", alt: "Cream Tee South African streetwear - CueMotion" },
  { name: "Black Tee", price: 350, category: "tees", image: "images/BlackShirt.jpg", alt: "Black Tee streetwear Free State - CueMotion" },
  { name: "Grey Tee", price: 350, category: "tees", image: "images/GreyShirt.jpg", alt: "Grey Tee streetwear Bloemfontein - CueMotion" },
  { name: "White Hoodie", price: 750, category: "hoodies", image: "images/WhiteHoodie.jpg", alt: "White Hoodie oversized streetwear Bloemfontein - CueMotion" },
  { name: "Black Hoodie", price: 750, category: "hoodies", image: "images/BlackHoodie.jpg", alt: "Black Hoodie oversized streetwear South Africa - CueMotion" },
  { name: "Grey Hoodie", price: 750, category: "hoodies", image: "images/GreyHoodie.jpg", alt: "Grey Hoodie streetwear Free State - CueMotion" },
  { name: "Cream Hoodie", price: 750, category: "hoodies", image: "images/CreamWhiteHoodie.jpg", alt: "Cream Hoodie oversized streetwear Bloemfontein - CueMotion" },
  { name: "White Pants", price: 650, category: "bottoms", image: "images/WhitePants.jpg", alt: "White Track Pants streetwear Bloemfontein - CueMotion" },
  { name: "Black Pants", price: 650, category: "bottoms", image: "images/BlackPants.jpg", alt: "Black Track Pants streetwear South Africa - CueMotion" },
  { name: "Cream Pants", price: 650, category: "bottoms", image: "images/CreamWhitePants.jpg", alt: "Cream Track Pants streetwear Free State - CueMotion" },
  { name: "Grey Pants", price: 650, category: "bottoms", image: "images/GreyPants.jpg", alt: "Grey Track Pants streetwear Bloemfontein - CueMotion" },
  { name: "Motion Jacket", price: 900, category: "jackets", image: "images/Jacket1.jpg", alt: "Motion Jacket streetwear Bloemfontein - CueMotion" },
  { name: "Black Beanie", price: 200, category: "beanies", image: "images/BlackBeanie.jpg", alt: "Black Beanie streetwear South Africa - CueMotion" },
  { name: "Cue Caps", price: 250, category: "caps", image: "images/CueCaps.jpg", alt: "Cue Caps streetwear Bloemfontein - CueMotion" },
  { name: "Bucket Hat", price: 250, category: "caps", image: "images/MotionBucketHats.jpg", alt: "Bucket Hat streetwear Bloemfontein - CueMotion" },
  { name: "Cue Socks", price: 120, category: "socks", image: "images/Socks.jpg", alt: "Cue Socks streetwear South Africa - CueMotion" }
];

function loadProducts() {
  var container = document.getElementById("productList");
  if (!container) return;
  container.innerHTML = "";
  for (var p = 0; p < productsData.length; p++) {
    var product = productsData[p];
    var card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-category", product.category);
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-name", product.name);
    var img = document.createElement("img");
    img.className = "gallery-img";
    img.src = product.image;
    img.alt = product.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 300;
    img.height = 300;
    var info = document.createElement("div");
    info.className = "product-info";
    var brand = document.createElement("p"); 
    brand.className = "brand"; 
    brand.innerHTML = "CueMotion Apparel";
    var name = document.createElement("p"); 
    name.className = "name"; 
    name.innerHTML = product.name;
    var price = document.createElement("p"); 
    price.className = "price"; 
    price.innerHTML = "R" + product.price;
    var btn = document.createElement("button"); 
    btn.className = "view-btn"; 
    btn.innerHTML = "View Details";
    btn.setAttribute("onclick", "openProductModal('" + product.name + " - R" + product.price + "')");
    info.appendChild(brand); 
    info.appendChild(name); 
    info.appendChild(price); 
    info.appendChild(btn);
    card.appendChild(img); 
    card.appendChild(info);
    container.appendChild(card);
  }
  bindGalleryModal();
}
window.addEventListener("load", loadProducts);

// SEARCH
function searchProducts() {
  var filter = document.getElementById("myInput").value.toLowerCase();
  var cards = document.getElementsByClassName("product-card");
  for (var s = 0; s < cards.length; s++) {
    var name = cards[s].getAttribute("data-name");
    if (name) {
      if (name.toLowerCase().indexOf(filter) > -1) {
        cards[s].style.display = "";
      } else {
        cards[s].style.display = "none";
      }
    }
  }
}

// SORT
function sortProducts() {
  var value = document.getElementById("sortSelect").value;
  var container = document.getElementById("productList") || document.querySelector(".products-grid");
  var cardsArray = Array.from(document.getElementsByClassName("product-card"));
  if (value == "low") {
    cardsArray.sort(function(a,b){ 
      return parseInt(a.getAttribute("data-price"))-parseInt(b.getAttribute("data-price"));
    });
  }
  else if (value == "high") {
    cardsArray.sort(function(a,b){ 
      return parseInt(b.getAttribute("data-price"))-parseInt(a.getAttribute("data-price"));
    });
  }
  else if (value == "az") {
    cardsArray.sort(function(a,b){ 
      return a.getAttribute("data-name").toLowerCase().localeCompare(b.getAttribute("data-name").toLowerCase());
    });
  }
  cardsArray.forEach(function(c){ 
    container.appendChild(c);
  });
}
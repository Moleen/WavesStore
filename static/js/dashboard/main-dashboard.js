// DOCUMENT READY
$(document).ready(function () {
  opened_modal();
  opened_collapse();
});

// ACTIVATED NAVBAR ---------------------------------------------
const currentLocation = location.href;
$(".navigation li .sidebar_item").each(function () {
  if (currentLocation.includes($(this).attr("href"))) {
    $(this).addClass("active");
  }else if(currentLocation.includes($(this).data("navbar"))){
    $(this).addClass("active");
  }
});

$('.collapse_item a').each(function () {
  if (currentLocation.includes($(this).attr("href"))){
    $(this).children("i").removeClass('fa-reguler');
    $(this).children("i").addClass('fa-solid');
  }
})
// END ACTIVATED NAVBAR

// ITEM ONCLICK ---------------------------------------------
$(".sidebar_item.link").on("click", function () {
  $(this).toggleClass("showing_collapse");
  $("#icon_right").toggleClass("rotated_down");

  if(localStorage.getItem("collapse_open")){
    localStorage.removeItem("collapse_open");
  }else{
    localStorage.setItem("collapse_open", true);
  }
});

// OPEN MODAL ---------------------------------------------
$('[data-open="modal"]').on("click", function () {
  var target = $(this).data("open-target");
  $('#modal').load(`modal/${$(this).data("dir")}.html`)
  $(target).css("display", "flex");

  setTimeout(function () {
    $(target).addClass("modal_active");
  }, 100);
  add_json_local_storage("modal_open",`open${target}`)
});

// CLOSE MODAL ---------------------------------------------
$('[data-action="close"]').on("click", function () {
  var target = $(this).data("close");
  $(target).removeClass("modal_active");
  setTimeout(function () {
    $(target).css("display", "none");
  }, 500);
  delete_json_local_storage("modal_open", "open" + target);
});

// PREVIEW IMAGE ---------------------------------------------
$('[data-info="input_image"]').on('change', function(){
  let reader = new FileReader();
  reader.onload = function (event) {
    $("#image_input_preview").attr("src", event.target.result);
    $("#image_input_preview").removeAttr("hidden");
  };
  reader.readAsDataURL($(this).get(0).files[0])
})

// FUNCTION --------------------------
function opened_modal() {
  var val = JSON.parse(localStorage.getItem("modal_open"));
  if (val) {
    // perulangan json
    for(let i in val) {
      console.log(val[i]);
      value = val[i].split("#");
      modal_status = value[0];
      target = `#${value[1]}`;
      
      if (modal_status == "open") {
        $(target).css("display", "flex");
        $(target).addClass("modal_active");
      }

    };
  
  }

}


function opened_collapse(){
  if(localStorage.getItem("collapse_open")){
    $(".collapse").addClass("show");
    $(".sidebar_item.link").addClass("showing_collapse");
    $("#icon_right").toggleClass("rotated_down");
  };

}

function add_json_local_storage(key,inserted){
  var data = localStorage.getItem(key);
  var storage_array = data ? JSON.parse(data) : [];
  storage_array.push(inserted)
  localStorage.setItem(key,JSON.stringify(storage_array))
}

function delete_json_local_storage(key,item_deleted){
  var data = localStorage.getItem(key);
  myArray = JSON.parse(data)
  myArray = myArray.filter(item => item !== item_deleted);
  localStorage.setItem(key,JSON.stringify(myArray))
}

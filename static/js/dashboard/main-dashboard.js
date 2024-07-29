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
  $(target).css("display", "flex");

  setTimeout(function () {
    $(target).addClass("modal_active");
  }, 100);

  localStorage.setItem("modal_open", "open" + target);
});

// CLOSE MODAL ---------------------------------------------
$('[data-action="close"]').on("click", function () {
  var target = $(this).data("close");
  $(target).removeClass("modal_active");
  setTimeout(function () {
    $(target).css("display", "none");
  }, 500);
  localStorage.setItem("modal_open", "close" + target);
});

// FUNCTION --------------------------
function opened_modal() {
  val = localStorage.getItem("modal_open");
  if (val) {
    value = val.split("#");
    modal_status = value[0];
    target = `#${value[1]}`;
  
    if (modal_status == "open") {
      $(target).css("display", "flex");
      $(target).addClass("modal_active");
    } else {
      localStorage.removeItem("modal_open");
    }
  }

}


function opened_collapse(){
  if(localStorage.getItem("collapse_open")){
    $(".collapse").addClass("show");
    $(".sidebar_item.link").addClass("showing_collapse");
    $("#icon_right").toggleClass("rotated_down");
  };

}

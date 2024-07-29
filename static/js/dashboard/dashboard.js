// PREVIEW INPUT IMAGE
$("#input_image").on("change", function () {
  var files = this.files[0];
  // Mengecek apakah ada file yang dipilih
  if (files) {
    let reader = new FileReader();
    reader.onload = function (event) {
      $("#image_input_preview").attr("src", event.target.result);
      $("#image_input_preview").removeAttr("hidden");
    };
    reader.readAsDataURL(files);
    $(".image_input_container").addClass("showing");
    $(".help_text_input").attr("hidden", true);
    $("#action_input").show();
  } else {
    image_not_showing();
  }
});

// REMOVE IMAGE PREVIEW
$("#remove_input_image").on("click", function () {
  image_not_showing();
});

// ADD IMAG TO DATABASE
$("#add_input_image").on("click", function () {
  file = $("#input_image")[0].files[0];
  if (file) {
    var formData = new FormData();
    formData.append("image", file);
    $.ajax({
      url: "/api/dashboard/add_image_slideshow",
      type: "POST",
      data: formData,
      processData: false, // Jangan proses data
      contentType: false,
      success: function (response) {
        if (response.status == "success") {
          console.log("success");
          window.location.reload();
        } else {
          console.log(response.msg);
        }
      },
    });
  }
});

// DELETE IMAGE FROM DATABASE
$(".delete_image").on("click", function () {
  target = $(this).data("info-image");

  $.ajax({
    url: "/api/dashboard/delete_image_slideshow",
    type: "POST",
    data: {
      target: target,
    },
    success: function (response) {
      if (response.status == "success") {
        console.log("success");
        window.location.reload();
      } else {
        console.log(response.msg);
      }
    },
  });
});

// ------------------------- FUNCTION
function image_not_showing() {
  $("#input_image").val("");
  $("#action_input").hide();
  $(".image_input_container").removeClass("showing");
  $(".help_text_input").removeAttr("hidden");
  $("#image_input_preview").attr("src", "");
  $("#image_input_preview").attr("hidden", true);
}



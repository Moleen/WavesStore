$("#form_add_new_game").on("submit", function (e) {
  e.preventDefault();
  var data_game = new FormData(this);
  data_game.append("categories", $(this).data("cate"));
  $.ajax({
    type: "POST",
    url: "/api/items/add_new_game",
    data: data_game,
    processData: false,
    contentType: false,
    success: function (data) {
      alert(data["msg"]);
    },
  });
});

$(".game_card").on("click", function () {
  $(".game_card").removeClass("selected");
  $(".game_card").removeAttr("data-info", "selected");
  $(this).addClass("selected");
  $('#button_edit').attr("data-cancel", "true");
  $(this).attr("data-info", "selected");
  $("#button_delete_game").attr("disabled", false);
  var selected_card_id = $(this).attr("id");
  get_data_game(selected_card_id);
  edit()
});

$("#button_delete_game").on("click", function () {
  if ($(this).attr("data-id-delete")) {
    let confirmation = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );

    if (confirmation) {
      $.ajax({
        type: "POST",
        url: "/api/items/delete_game",
        data: { id_game: $(this).attr("data-id-delete") },
        success: function (data) {
          alert("Item berhasil dihapus!");
          window.location.reload();
        },
      });
    } else {
      // Jika pengguna menekan Cancel
      alert("Penghapusan dibatalkan.");
    }
  }
});

$('[data-close="#new_game"]').on("click", function () {
  $("#input_image_new_game").val("");
  $("#input_name_new_game").val("");
  $("#new_game_desc_input").val("");
  $("#image_input_preview").attr("hidden", true);
});

$("#button_edit").on("click", function () {
  edit()
});

$("#input_image_edit, #input_name_game_desc, #game_desc_input_desc").on(
  "change",
  function () {
    $("#buton_save_edit_game").attr("disabled", false);
  }
);

$("#buton_save_edit_game").on("click", function () {

  $.ajax({
    type: "POST",
    url: "/api/items/update_game",
    data: {
      id_game: $("#button_edit").attr("data-id"),
      name_game: $("#input_name_game_desc").val(),
      deskripsi_name: $("#game_desc_input_desc").val(),
      image_game: $("#input_image_edit")[0].files[0],
    },
    processData: false,
    contentType: false,
    success: function (data) {
      console.log(data);
    },
  });

});


function get_data_game(id_game_) {
  $.ajax({
    type: "POST",
    url: "/api/items/get_game_data",
    data: { id_game: id_game_ },
    success: function (data) {
      $("#input_name_game_desc").val(data[0]["game_name"]);
      $("#game_desc_input_desc").html(data[0]["deskripsi_name"]);
      $("#button_delete_game").attr("data-id", data[0]["id_game"]);
      $("#button_edit").attr("data-id", data[0]["id_game"]);
    },
  });
}

function edit(){
  if ($('#button_edit').attr("data-cancel") == "true") {
    $('#button_edit').attr("data-cancel", "false");
    $('#button_edit').text("Edit");
    $("#input_image_edit").attr("disabled", true);

    $("#image_input_preview").removeAttr("src");
    $("#image_input_preview").attr("hidden", true);
    $("#buton_save_edit_game").attr("disabled", true);
    $.ajax({
      type: "POST",
      url: "/api/items/get_game_data",
      data: { id_game: $('#button_edit').attr("data-id") },
      success: function (data) {
        $("#input_name_game_desc").val(data[0]["game_name"]);
        $("#game_desc_input_desc").val(data[0]["deskripsi_name"]);
        $("#edit_game").attr("data-id-edit", data[0]["id_game"]);
        $("#input_name_game_desc").attr("disabled", true);
        $("#game_desc_input_desc").attr("disabled", true);
      },
    });
  } else if ($('#button_edit').attr("data-cancel") == "false") {
    if ($(".game_card").hasClass("selected")) {
      $("#input_image_edit").attr("disabled", false);
      $("#input_name_game_desc").attr("disabled", false);
      $("#game_desc_input_desc").attr("disabled", false);
      // $("#input_image_edit").removeAttr('hidden');
      $('#button_edit').text("Cancel");
      $('#button_edit').attr("data-cancel", "true");
    }
  }
}

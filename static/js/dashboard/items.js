$("#form_add_new_game").on("submit", function (e) {
  e.preventDefault();
  var data_game = new FormData(this);
  data_game.append("categories", $(this).data('cate'));
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

$('[data-card="selected_card"]').each(function () {
  $(this).on("click", function () {
    $('[data-card="selected_card"]').removeClass("selected");
    $(this).addClass("selected");
    $(".button_game").attr("disabled", false);
    $.ajax({
      type: "POST",
      url: "/api/items/get_game_data",
      data: { id_game: $(this).attr("id") },
      success: function (data) {
        $("#input_name_game_desc").val(data[0]["game_name"]);
        $("#game_desc_input_desc").html(data[0]["deskripsi_name"]);
        $("#button_delete_game").attr("data-id-delete", data[0]["id_game"]);
      },
    });
  });
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
          window.location.reload()
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

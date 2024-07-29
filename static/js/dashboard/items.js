$(document).ready(function(){
    $('#input_name_game , #game_desc_input , #input_image_game').on('change', check_input_addgame)
})


function check_input_addgame(){
    image = $('#input_image_game')
    name_game = $('#input_name_game')
    desc = $('#game_desc_input')

    if(image.get(0).files.length > 0){
        let reader = new FileReader();
        reader.onload = function (event) {
          $("#image_input_preview").attr("src", event.target.result);
          $("#image_input_preview").removeAttr("hidden");
        };
        reader.readAsDataURL(image.get(0).files[0]);

        if (desc.val() != '' && name_game.val() != ''){
            $('#save_game_edit').attr('disabled',false)
        }

    }else{
        $("#image_input_preview").attr("hidden", true);
    }
}

$('#save_game_edit').on('click', function(){
    var data_game = new FormData();
    data_game.append('name_game', $('#input_name_game').val());
    data_game.append('desc_game', $('#game_desc_input').val());
    data_game.append('categories', $(this).data('categories'))
    var fileInput = $('#input_image_game').get(0).files[0];
    if (fileInput) {
        data_game.append('image_game', fileInput);
    }
    $.ajax({
        type: 'POST',
        url: '/api/items/save_game_edit',
        data: data_game,
        processData: false,
        contentType: false,
        success: function(data){
            console.log(data)
        }
    })

})
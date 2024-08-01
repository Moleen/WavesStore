
$('#form_add_new_game').on('submit', function(e){
    e.preventDefault();
    var data_game = new FormData(this);
    data_game.append('categories', 'joki')
    $.ajax({
        type: 'POST',
        url: '/api/items/add_new_game',
        data: data_game,
        processData: false,
        contentType: false,
        success: function(data){
            alert(data['msg'])
        }
    })

})
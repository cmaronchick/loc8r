$('#addReview').submit(function (e) {
    $('.alert.alert-danger').hide();
<<<<<<< HEAD
    if (!$('input#author').val() || !$('select#rating').val() || !$('textarea#reviewText').val()) {
=======
    if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
>>>>>>> 629151f3ab8f2d207f45078b904e18555c9cfd89
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>')
        }
        console.log("$('input#name').val() = ",$('input#name').val());
        console.log("$('select#rating').val() = ",$('select#rating').val());
        console.log("$('textarea#review').val() = ",$('textarea#review').val());
        return false;
    }
});
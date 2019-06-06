var imgArr = ['img1', 'img1', 'img2', 'img2', 'img3', 'img3', 'img4', 'img4', 'img5', 'img5', 'img6', 'img6',]
var soundWhenWin = new Audio('.sound/win.mp3')

$(document).ready(newGame);

$('#goPlay').on('click', () => {
    $('a').attr('style', 'display:none;')
})

$('#new-game').on('click', () => {
    $('#modal-wrapper').attr('style', 'display:none;')
    $('.card').removeClass('upside');
    newGame();
});
$('#exit').on('click', () => {
    $('#new-game').attr('style', 'display:none;')
    $('#exit').attr('style', 'display:none;')
    var exitMsg = $('<div/>');
    exitMsg.text("see you later winer");
    $('.myModal').append(exitMsg);
    setTimeout(() => { window.location = document.referrer; }, 2000);
});

function newGame() {
    var previousCardFliped = null; // restart couple search
    var flipedMatches = 0; //how many couples allready flipped
    var couplesInTheGame = 6;
    // cardFliped = 0;
    var flipedCards = 0;

    shuffleArray(imgArr);
    for (var i = 0; i < imgArr.length; i++) {
        $('.card').eq(i).attr('name', imgArr[i]);
        $('.card .frontImg').eq(i).attr('src', "./img/" + imgArr[i] + ".jpg");
    }

    // clicking cards
    $('.card').on('click', function (evenObj) {
        flipedCards = flipedCards + 1; 
        if (flipedCards <= 2){
        var cardToFlip = $(this);
            if (cardToFlip.hasClass('upside')) return; // check if you press allready flipped card
            cardToFlip.addClass('upside'); // flip
            if (previousCardFliped === null) { // first card in a couple search
                previousCardFliped = cardToFlip;

            } else {
                var card1 = previousCardFliped.attr('name');
                var card2 = cardToFlip.attr('name');

                console.log(flipedCards);

                if (card1 === card2) { // match
                    flipedMatches++;
                    if (flipedMatches === couplesInTheGame) { // game win
                        // !add sound
                        $('#modal-wrapper').attr('style', '');
                    }
                    previousCardFliped = null;
                    flipedCards = 0;

                } else {
                    setTimeout(() => { // flippe back couple
                        previousCardFliped.removeClass('upside');
                        cardToFlip.removeClass('upside');
                        previousCardFliped = null;// restart couple search
                        flipedCards = 0;
                    }, 1000);
                }
            }
        }
    });

    function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}

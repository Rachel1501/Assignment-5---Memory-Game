$(document).ready(newGame);

$('#new-game').on('click', () => {
    window.location = document.referrer;
});

$('#exit').on('click', () => {
    $('#new-game').attr('style', 'display:none;')
    $('#exit').attr('style', 'display:none;')
    var exitMsg = $('<div/>');
    exitMsg.text("see you later winer");
    $('.my-modal').append(exitMsg);
    setTimeout(() => { window.location.assign('file:///C:/ITC/dev/Assignments/Assignment5-memorygame/index.html', 2000) });
});

$('#fresh').on('click', () => {
    $('.card').removeClass('upside');
    newGame();
});

function newGame() {
    var imgArr = ['img1', 'img1', 'img2', 'img2', 'img3', 'img3', 'img4', 'img4', 'img5', 'img5', 'img6', 'img6',]
    var mySound = new sound('./sound/backsound.mp3');
    var victorySound = new sound('./sound/win.mp3');
    var previousCardFliped = null;
    var flipedMatches = 0;
    var couplesInTheGame = 6;
    var flipedCards = 0;
    var numberOfMistake = 0;

    shuffleArray(imgArr);
    for (var i = 0; i < imgArr.length; i++) {
        $('.card').eq(i).attr('name', imgArr[i]);
        $('.card .front-img').eq(i).attr('src', "./img/" + imgArr[i] + ".png");
    }

    $('.card').on('click', function () {
        mySound.play();
        flipedCards = flipedCards + 1;
        if (flipedCards <= 2) {
            var cardToFlip = $(this);
            if (cardToFlip.hasClass('upside')) return;
            cardToFlip.addClass('upside');
            if (previousCardFliped === null) {
                previousCardFliped = cardToFlip;

            } else {
                var card1 = previousCardFliped.attr('name');
                var card2 = cardToFlip.attr('name');

                if (card1 === card2) {
                    flipedMatches++;
                    if (flipedMatches === couplesInTheGame) {
                        mySound.stop();
                        victorySound.play();
                        $('#modal-wrapper').attr('style', '');
                        $('#our-user').text(localStorage.userName)
                        $('#mistakes').text(numberOfMistake);

                        // for champion
                        var key = localStorage.userName;
                        localStorage.setItem(key, numberOfMistake);
                        var champScore = 100;
                        var champName = '';
                        for (var i = 0; i < localStorage.length; i++) {
                            for (var j = 0; j < localStorage.length; j++) {
                                if (i !== j) {
                                    var player1 = localStorage.key(i);
                                    var player2 = localStorage.key(j);
                                    var player1Score = localStorage.getItem(player1);
                                    var player2Score = localStorage.getItem(player2);
                                    var player1ScoreNum = parseInt(player1Score);
                                    var player2ScoreNum = parseInt(player2Score);
                                    if (player1ScoreNum < player2ScoreNum) {
                                        roundChamp = player1;
                                        if (player1ScoreNum < champScore) {
                                            champScore = player1ScoreNum;
                                            champName = player1;
                                        }
                                    } else {
                                        roundChamp = player2;
                                        if (player2ScoreNum < champScore) {
                                            champScore = player2ScoreNum;
                                            champName = player2;
                                        }
                                    }
                                }
                            }
                        }
                        if (champName == localStorage.userName) {
                            $('#champ').text('YOU');
                            $('#campScore').text(champScore);
                        } else {
                            $('#champ').text(champName);
                            $('#campScore').text(champScore);
                        }
                    }
                    previousCardFliped = null;
                    flipedCards = 0;

                } else {
                    numberOfMistake++;
                    setTimeout(() => {
                        previousCardFliped.removeClass('upside');
                        cardToFlip.removeClass('upside');
                        previousCardFliped = null;
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

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


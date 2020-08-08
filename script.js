(function () {
    var Memory = {
        init: function (cards) {
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },
        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },
        setup: function () {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.paused = false;
            this.guess = null;
            this.binding();
        },
        binding: function () {
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },
        cardClicked: function () {
            var _ = Memory;
            var $card = $(this);
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function () {
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 500);
                }
                if ($(".matched").length == $(".card").length) {
                    _.win();
                }
            }
        },
        win: function () {
            this.paused = true;
            setTimeout(function () {
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1500);
        },
        showModal: function () {
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },
        hideModal: function () {
            this.$overlay.hide();
            this.$modal.hide();
        },
        reset: function () {
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");
        },

        // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
        shuffle: function (array) {
            var counter = array.length, temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },
        buildHTML: function () {
            var frag = '';
            this.$cards.each(function (k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
                            <div class="front"><img src="'+ v.img + '" alt="'+ v.name + '" /></div>\
                            <div class="back"><img src="assets/Avengers.jpg" alt="Codepen" /></div></div>\
                        </div>';
            });
            return frag;
        }
    };

    var cards = [
        {
            name: "IronMan",
            img: "assets/IronMan.png",
            id: 1,
        },
        {
            name: "CaptainAmerica",
            img: "assets/CaptainAmerica.png",
            id: 2
        },
        {
            name: "Thor",
            img: "assets/Thor.png",
            id: 3
        },
        {
            name: "Hulk",
            img: "assets/Hulk.png",
            id: 4
        },
        {
            name: "BlackWidow",
            img: "assets/BlackWidow.png",
            id: 5
        },
        {
            name: "DoctorStrange",
            img: "assets/DoctorStrange.png",
            id: 6
        },
        {
            name: "Vision",
            img: "assets/Vision.png",
            id: 7
        },
        {
            name: "ScarletWitch",
            img: "assets/ScarletWitch.png",
            id: 8
        },
        {
            name: "WarMachine",
            img: "assets/WarMachine.png",
            id: 9
        },
        {
            name: "SpiderMan",
            img: "assets/SpiderMan.png",
            id: 10
        },
        {
            name: "Rocket",
            img: "assets/Rocket.png",
            id: 11
        },
        {
            name: "StarLord",
            img: "assets/StarLord.png",
            id: 12
        },
    ];
    Memory.init(cards);

    document.querySelector(".closeBtn").onclick = function(e) {
        e.preventDefault()
        console.log(this.parentElement.parentElement.remove())
    }

})();

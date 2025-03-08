$(document).on(':passagerender', function (ev) {
    if (passage() == "Character Creation") {
            $(ev.content).find("#checkbox-playersmarty").on('propertychange change', function() { Engine.play(passage()); } );
    }
});
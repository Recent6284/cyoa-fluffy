// Function to apply Fluffspeak rules to a given text
function applyFluffspeak(text) {
    text = text.replace(/r/gi, 'w'); // Replace r and R with w
    text = text.replace(/l/gi, 'w'); // Replace l and L with w

    // Additional Fluffspeak transformations
    text = text.replace(/th/gi, 'd'); // Replace th with d
    text = text.replace(/the/gi, 'da'); // Replace 'the' with 'da'
    text = text.replace(/this/gi, 'dis'); // Replace 'this' with 'dis'
    text = text.replace(/that/gi, 'dat'); // Replace 'that' with 'dat'
    text = text.replace(/they/gi, 'dey'); // Replace 'they' with 'dey'
    text = text.replace(/there/gi, 'dewe'); // Replace 'there' with 'dewe'
    text = text.replace(/those/gi, 'dose'); // Replace 'those' with 'dose'
    text = text.replace(/these/gi, 'dese'); // Replace 'these' with 'dese'
    text = text.replace(/to/gi, 'tu'); // Replace 'to' with 'tu'
    text = text.replace(/no/gi, 'nu'); // Replace 'no' with 'nu'
    text = text.replace(/so/gi, 'su'); // Replace 'so' with 'su'
    text = text.replace(/go/gi, 'gu'); // Replace 'go' with 'gu'
    text = text.replace(/do/gi, 'du'); // Replace 'do' with 'du'
    text = text.replace(/you/gi, 'yu'); // Replace 'you' with 'yu'
    text = text.replace(/new/gi, 'nyu'); // Replace 'new' with 'nyu'
    text = text.replace(/know/gi, 'knu'); // Replace 'know' with 'knu'
    text = text.replace(/kitty/gi, 'kitteh'); // Replace 'kitty' with 'kitteh'
    text = text.replace(/baby/gi, 'babbeh'); // Replace 'baby' with 'babbeh'
    text = text.replace(/funny/gi, 'funneh'); // Replace 'funny' with 'funneh'
    text = text.replace(/runny/gi, 'wunneh'); // Replace 'runny' with 'wunneh'
    text = text.replace(/daddy/gi, 'daddeh'); // Replace 'daddy' with 'daddeh'
    text = text.replace(/litter/gi, 'wittah'); // Replace 'litter' with 'wittah'
    text = text.replace(/other/gi, 'udah'); // Replace 'other' with 'udah'
    text = text.replace(/thriller/gi, 'thwiwwah'); // Replace 'thriller' with 'thwiwwah'
    text = text.replace(/bother/gi, 'bothah'); // Replace 'bother' with 'bothah'
    text = text.replace(/monster/gi, 'munstah'); // Replace 'monster' with 'munstah'

    return text;
}

// Process all elements with the 'fluffyspeak' class
function processFluffspeak() {
    $('.fluffyspeak').each(function () {
        let text = $(this).html();
        let transformedText = applyFluffspeak(text);
        $(this).html(transformedText);
    });
}

// Run the Fluffspeak processor when the passage is displayed
$(document).on(':passagedisplay', function () {
    processFluffspeak();
});
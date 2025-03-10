Macro.add("dynamicPronoun", {
    handler: function() {
        var index = this.args[0]; // Index of the Fluffy
        var pronounType = this.args[1]; // Pronoun type ("they", "them", "their")
        
        // Define pronoun sets
        var pronouns = {
            they: ["he", "she", "they", "it"],
            them: ["him", "her", "them", "it"],
            their: ["his", "her", "their", "its"]
        };
        
        // Get the pronoun set
        var pronounSet = pronouns[pronounType];
        if (!pronounSet) {
            $(this.output).append("Error: Invalid pronoun type.");
            return;
        }
        
        // Get the pronoun index from the Fluffy
        var pronounIndex = State.variables.fluffies[index].pronounIndex;
        var text = pronounSet[pronounIndex];
        
        // Handle capitalization
        if (this.args.includes("upper")) {
            text = text.charAt(0).toUpperCase() + text.slice(1); // Title case
        } else if (this.args.includes("lower")) {
            text = text.toLowerCase(); // Lowercase
        }
        
        // Output the pronoun
        $(this.output).append(text);
    }
});
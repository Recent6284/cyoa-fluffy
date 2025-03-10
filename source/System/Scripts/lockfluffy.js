Macro.add("lockFluffy", {
    handler: function() {
        var index = State.variables.currentFluffyIndex; // Use the current index
        
        // Ensure the index is valid
        if (index < 0 || index >= State.variables.fluffies.length) {
            $(this.output).append("Error: Invalid Fluffy index.");
            return;
        }
        
        // Get the chosen Fluffy
        var chosenFluffy = State.variables.fluffies[index];
        
        // Copy all properties into permanent variables dynamically
        for (var key in chosenFluffy) {
            if (chosenFluffy.hasOwnProperty(key)) {
                State.variables["fluffy" + key.charAt(0).toUpperCase() + key.slice(1)] = chosenFluffy[key];
            }
        }
        
        // Optionally, store the entire Fluffy object for future reference
        State.variables.fluffy = chosenFluffy;
        
        $(this.output).append("Fluffy properties locked in!");
    }
});
Macro.add("dynamicFluffyProperty", {
    handler: function() {
        var index = this.args[0]; // Index of the Fluffy
        var property = this.args[1]; // Property to retrieve (e.g., "name", "mane")
        
        // Ensure the index and property are valid
        if (index < 0 || index >= State.variables.fluffies.length) {
            $(this.output).append("Error: Invalid Fluffy index.");
            return;
        }
        
        var fluffy = State.variables.fluffies[index];
        if (!fluffy.hasOwnProperty(property)) {
            $(this.output).append("Error: Property '" + property + "' not found.");
            return;
        }
        
        $(this.output).append(fluffy[property]);
    }
});
/* shopSystem.js - Fixed for Simple Inventory */
(function() {
    // Cart calculation function (fixed)
    setup.calculateCartTotal = function(cart) {
        let total = 0;
        const items = Object.keys(cart.table); // Changed to use .table
        for (let i = 0; i < items.length; i++) {
            const id = items[i];
            const item = Item.get(id);
            if (!(item && item.permanent && State.variables.bag.has(id))) {
                total += cart.count(id) * (setup.fmPrices.get(id) || 0);
            }
        }
        return total;
    };

    // Cart validation function (fixed)
    setup.validateCart = function(cart) {
        let changed = false;
        const items = Object.keys(cart.table); // Changed to use .table
        for (let i = 0; i < items.length; i++) {
            const id = items[i];
            const item = Item.get(id);
            if (item && item.permanent && State.variables.bag.has(id)) {
                cart.drop(id);
                changed = true;
            }
        }
        return changed;
    };

    // Quantity helper (fixed)
    setup.addToCart = function(cart, id, quantity) {
        if (!Item.get(id).permanent || !State.variables.bag.has(id)) {
            cart.pickup(id, quantity);
            return true;
        }
        return false;
    };
})();
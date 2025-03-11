function weightedRandom(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    for (const item of items) {
      cumulativeWeight += item.weight;
      if (randomNum < cumulativeWeight) {
        return item;
      }
    }
  }
  
  // Attach to window for global access
  window.weightedRandom = weightedRandom;
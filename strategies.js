function avg (timeInSeconds) {
    var r = Math.random();
    r/=10;
    r+=9.95;
    return r;
}
function nextBlockPrediction(alpha) {
    return Math.random() < alpha;
}
function honest(alpha, gamma, attempts) {
    var youPublished = 0;
    var othersPublished = 0;
    var OrphanedBlocks = 0;
    var OrphanCounter = 0;
    for (i = 0; i < attempts; i++) {
        OrphanCounter++;
        var rand = Math.random();
        if (rand < alpha) {
            youPublished++;
        } else {
            othersPublished++;
        }
        if (OrphanCounter === 60) {
            if (Math.random() < alpha) {
                youPublished--;
                OrphanedBlocks++;
            } else {
                othersPublished--;
                OrphanedBlocks++;
            }
            OrphanCounter = 0;
        }
    }
    var totalPublished = youPublished + othersPublished;
    var totalMined = attempts; //iterations
    var OrphanedPercentage = (100 * OrphanedBlocks / totalMined).toPrecision(4);
    var yourRelativePerformance = (100 * youPublished / totalPublished).toPrecision(4);
    var theirRelativePerformance = (100 * othersPublished / totalPublished).toPrecision(4);
    var result = [youPublished, othersPublished, totalPublished, OrphanedBlocks, totalMined, OrphanedPercentage, yourRelativePerformance, theirRelativePerformance];
    return result;
}
function selfish(alpha, gamma, attempts, initialPoint) {
    var state = 0;
    var willBeSelfish = false;
    var youPublished = 0; //total blocks we published since our initialPoint
    var othersPublished = 0; //total blocks others published since our initialPoint
    var cycleCounter = 0;
    var totalMined = 0;
    var i = 0; // arrays' indexes
    var minedIn2016 = [];
    var difficultyChanges = [];
    var publishedIn2016 = [];
    var timeOf2016 = [];
    while (cycleCounter < attempts) {
        totalMined++;
        willBeSelfish = nextBlockPrediction(alpha);
        switch (state) {
            case 0:
                cycleCounter++;
                state = willBeSelfish ? 1 : 0;
                if (!willBeSelfish) {
                    othersPublished++;
                }
                break;
            case 1:
                state = willBeSelfish ? 2 : -1;
                break;
            case - 1:
                rand = Math.random();
                state = 0;
                if (rand < alpha) {
                    youPublished += 2;
                } else if (rand < alpha + gamma * (1 - alpha)) {
                    youPublished += 1;
                    othersPublished += 1;
                } else {
                    othersPublished += 2;
                }
                break;
            case 2:
                if (willBeSelfish) {
                    state = 3;
                } else {
                    state = 0;
                    youPublished += 2;
                }
                break;
            default:
                if (willBeSelfish) {
                    state += 1;
                    cycleCounter++;
                } else {
                    state -= 1;
                    youPublished += 1;
                }
                break;
        }
        if ((totalMined + initialPoint) % 2016 === 0) {
            minedIn2016[i] = totalMined;
            publishedIn2016[i] = youPublished + othersPublished - publishedIn2016.reduce((a, b) => a + b, 0);
            difficultyChanges[i] = i === 0 ? (publishedIn2016[i] + Math.trunc(initialPoint - initialPoint / 60)) / 2016 : publishedIn2016[i] / 2016;
            timeOf2016[i] = i === 0 ? totalMined * 10 / difficultyChanges[i] : 2016 * 10 / difficultyChanges[i];
            i++;
        }
    }
    var totalPublished = youPublished + othersPublished;
    var OrphanedBlocks = totalMined - totalPublished;
    var OrphanedPercentage = (100 * OrphanedBlocks / totalMined).toPrecision(4);
    var yourRelativePerformance = (100 * youPublished / totalPublished).toPrecision(4);
    var theirRelativePerformance = (100 * othersPublished / totalPublished).toPrecision(4);
    var result = [youPublished, othersPublished, totalPublished, OrphanedBlocks, totalMined, OrphanedPercentage, yourRelativePerformance, theirRelativePerformance, publishedIn2016, difficultyChanges, timeOf2016, minedIn2016, initialPoint];
    return result;
}


function lead(alpha, gamma, attempts, initialPoint) {
    var state = 0;
    var willBeSelfish = false;
    var youPublished = 0; //total blocks we published since our initialPoint
    var othersPublished = 0; //total blocks others published since our initialPoint
    var youHided = 0;
    var cycleCounter = 0;
    var totalMined = 0;
    var i = 0; // arrays' indexes
    var minedIn2016 = [];
    var difficultyChanges = [];
    var publishedIn2016 = [];
    var timeOf2016 = [];
    while (cycleCounter < attempts) {
        totalMined++;
        willBeSelfish = nextBlockPrediction(alpha);
        switch (state) {
            case 0:
                cycleCounter++;
                state = willBeSelfish ? 1 : 0;
                if (!willBeSelfish) {
                    othersPublished++;
                }
                break;
            case 1:
                cycleCounter++;
                state = willBeSelfish ? 2 : -1;
                if (state === -1) {
                    youHided++;
                }
                break;
            case - 1:
                rand = Math.random();
                if (rand < alpha) {
                    state = 1;
                } else if (rand < alpha + gamma * (1 - alpha)) {
                    youPublished += youHided;
                    youHided = 0;
                    othersPublished += 1;
                    state = 0;
                } else {
                    othersPublished += (1 + youHided);
                    youHided = 0;
                    state = 0;
                }
                break;
            case 2:
                if (willBeSelfish) {
                    state = 3;
                } else {
                    state = 0;
                    youPublished += (2 + youHided);
                    youHided = 0;
                }
                break;
            default:
                if (willBeSelfish) {
                    state++;
                    cycleCounter++;
                } else {
                    state--;
                    youHided++;
                }
                break;
        }
        if ((totalMined + initialPoint) % 2016 === 0) {
            minedIn2016[i] = totalMined;
            publishedIn2016[i] = youPublished + othersPublished - publishedIn2016.reduce((a, b) => a + b, 0);
            difficultyChanges[i] = i === 0 ? (publishedIn2016[i] + Math.trunc(initialPoint - initialPoint / 60)) / 2016 : publishedIn2016[i] / 2016;
            timeOf2016[i] = i === 0 ? totalMined * 10 / difficultyChanges[i] : 2016 * 10 / difficultyChanges[i];
            i++;
        }
    }
    var totalPublished = youPublished + othersPublished;
    var OrphanedBlocks = totalMined - totalPublished;
    var OrphanedPercentage = (100 * OrphanedBlocks / totalMined).toPrecision(4);
    var yourRelativePerformance = (100 * youPublished / totalPublished).toPrecision(4);
    var theirRelativePerformance = (100 * othersPublished / totalPublished).toPrecision(4);
    var result = [youPublished, othersPublished, totalPublished, OrphanedBlocks, totalMined, OrphanedPercentage, yourRelativePerformance, theirRelativePerformance, publishedIn2016, difficultyChanges, timeOf2016, minedIn2016, initialPoint];
    return result;
}

function equalFork(alpha, gamma, attempts, initialPoint) {
    var state = 0;
    var willBeSelfish = false;
    var youPublished = 0; //total blocks we published since our initialPoint
    var othersPublished = 0; //total blocks others published since our initialPoint
    var youHided = 0;
    var cycleCounter = 0;
    var totalMined = 0;
    var i = 0; // arrays' indexes
    var minedIn2016 = [];
    var difficultyChanges = [];
    var publishedIn2016 = [];
    var timeOf2016 = [];
    while (cycleCounter < attempts) {
        totalMined++;
        willBeSelfish = nextBlockPrediction(alpha);
        switch (state) {
            case 0:
                cycleCounter++;
                state = willBeSelfish ? 1 : 0;
                if (!willBeSelfish) {
                    othersPublished++;
                }
                break;
            case 1:
                cycleCounter++;
                state = willBeSelfish ? 2 : -1;
                if (state === -1) {
                    youHided++;
                }
                break;
            case - 1:
                rand = Math.random();
                if (rand < alpha) {
                    state = 1;
                } else if (rand < alpha + gamma * (1 - alpha)) {
                    youPublished += youHided;
                    youHided = 0;
                    othersPublished += 1;
                    state = 0;
                } else {
                    othersPublished += (1 + youHided);
                    youHided = 0;
                    state = 0;
                }
                break;
            case 2:
                if (willBeSelfish) {
                    state = 3;
                } else {
                    state = 0;
                    youPublished += (2 + youHided);
                    youHided = 0;
                }
                break;
            default:
                if (willBeSelfish) {
                    state++;
                    cycleCounter++;
                } else {
                    state--;
                    youHided++;
                }
                break;
        }
        if ((totalMined + initialPoint) % 2016 === 0) {
            minedIn2016[i] = totalMined;
            publishedIn2016[i] = youPublished + othersPublished - publishedIn2016.reduce((a, b) => a + b, 0);
            difficultyChanges[i] = i === 0 ? (publishedIn2016[i] + Math.trunc(initialPoint - initialPoint / 60)) / 2016 : publishedIn2016[i] / 2016;
            timeOf2016[i] = i === 0 ? totalMined * 10 / difficultyChanges[i] : 2016 * 10 / difficultyChanges[i];
            i++;
        }
    }
    var totalPublished = youPublished + othersPublished;
    var OrphanedBlocks = totalMined - totalPublished;
    var OrphanedPercentage = (100 * OrphanedBlocks / totalMined).toPrecision(4);
    var yourRelativePerformance = (100 * youPublished / totalPublished).toPrecision(4);
    var theirRelativePerformance = (100 * othersPublished / totalPublished).toPrecision(4);
    var result = [youPublished, othersPublished, totalPublished, OrphanedBlocks, totalMined, OrphanedPercentage, yourRelativePerformance, theirRelativePerformance, publishedIn2016, difficultyChanges, timeOf2016, minedIn2016, initialPoint];
    return result;
}

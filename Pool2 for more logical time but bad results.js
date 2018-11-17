/* global parseFloat */

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


function apparentHashRate(a, g, b, t, strategy, youPublished, totalPublished, totalMined, initialPoint) {
    // for defining initialPoint later outside this function you have to use: var initialPoint = Math.floor(Math.random() * 2016) + 1;  Returns a random integer between 1 and 2016 (1 and 2016 are included).
    var tp = totalPublished;
    var ip = initialPoint;
    switch (strategy) {
        case 's': // Selfish Mining Strategy
            var apparentHashrate = tp < 2016 - ip ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = tp < 2016 - ip ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 'l': // Lead Mining Strategy
            var apparentHashrate = tp < 2016 - ip ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = tp < 2016 - ip ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 'e': // Equal Fork Mining Strategy
            var apparentHashrate = tp < 2016 - ip ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = tp < 2016 - ip ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 'h': // Honest Mining Strategy
            var apparentHashrate = tp < 2016 - ip ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = tp < 2016 - ip ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
    }
    var result = [apparentHashrate, revenueRatio];
    return result;
}

function theoretics(a, g, b, t, strategy, totalPublished, initialPoint) {
    // for defining initialPoint later outside this function you have to use: var initialPoint = Math.floor(Math.random() * 2016) + 1;  Returns a random integer between 1 and 2016 (1 and 2016 are included).
    var tp = totalPublished;
    var ip = initialPoint;
    switch (strategy) {
        case 's': // Selfish Mining Strategy
            var apparentHashrate = tp < 2016 - ip ? a - (1 - g) * (1 - a) * (1 - a) * (1 - a - a) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a) :
                    (a - ((1 - g) * (1 - a) * (1 - a) * a * (1 - a - a)) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * ((1 - a - a + (1 - a) * a * (1 - a - a) + (1 - a) * a) / ((1 - a) * (1 - a) * a + 1 - a - a));
            var revenueRatio = tp < 2016 - ip ? (a - (1 - g) * (1 - a) * (1 - a) * (1 - a - a) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * b / t :
                    ((a - ((1 - g) * (1 - a) * (1 - a) * a * (1 - a - a)) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * ((1 - a - a + (1 - a) * a * (1 - a - a) + (1 - a) * a) / ((1 - a) * (1 - a) * a + 1 - a - a))) * b / t;
            break;
        case 'l': // Lead Mining Strategy
            var apparentHashrate = tp < 2016 - ip ? a - (((1 - a) * a * (1 - a - a) * (1 - g)) / g) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a)) :
                    a * ((1 - a + (1 - a) * a - a * a) / (1 - a + (1 - a) * a - a)) - (((1 - a) * a * (1 - a - a) * (1 - g)) / (g)) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a));
            var revenueRatio = tp < 2016 - ip ? (a - (((1 - a) * a * (1 - a - a) * (1 - g)) / g) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a))) * b / t :
                    (a * ((1 - a + (1 - a) * a - a * a) / (1 - a + (1 - a) * a - a)) - (((1 - a) * a * (1 - a - a) * (1 - g)) / (g)) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a))) * b / t;
            break;
        case 'e': // Equal Fork Mining Strategy
            var apparentHashrate = tp < 2016 - ip ? a - ((1 - g) * (1 - a - a) / g) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) :
                    a / (1 - a) - ((1 - g) * (1 - a - a) / (g * (1 - a))) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a))));
            var revenueRatio = tp < 2016 - ip ? (a - ((1 - g) * (1 - a - a) / g) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a))))) * b / t :
                    (a / (1 - a) - ((1 - g) * (1 - a - a) / (g * (1 - a))) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a))))) * b / t;
            break;
        case 'h': // Honest Mining Strategy
            var apparentHashrate = a;
            var revenueRatio = a * b / t;
            break;
    }
    var result = [apparentHashrate, revenueRatio];
    return result;
}




var slider1 = document.getElementById("alpha");
var output1 = document.getElementById("demoAlpha");
output1.innerHTML = slider1.value;
slider1.oninput = function () {
    output1.innerHTML = this.value;
};

var slider2 = document.getElementById("gamma");
var output2 = document.getElementById("demoGamma");
output2.innerHTML = slider2.value;
slider2.oninput = function () {
    output2.innerHTML = this.value;
};

var slider3 = document.getElementById("attempts");
var output3 = document.getElementById("demoAttempts");
output3.innerHTML = slider3.value + " Cycles";
slider3.oninput = function () {
    output3.innerHTML = this.value + " Cycles";
};
function difficulty(initialPoint, totalPublished, totalMined) {
    // for defining initialPoint later outside this function you have to use: var initialPoint = Math.floor(Math.random() * 2016) + 1;  Returns a random integer between 1 and 2016 (1 and 2016 are included).
    var timesDifficultyChanged = Math.floor((totalPublished + initialPoint) / 2016);
    var difficultyChangesTo = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? 1 : (totalPublished / totalMined);
    var result = [timesDifficultyChanged, difficultyChangesTo];
    return result;
}
function timer(timeInSeconds) {
    var years = Math.floor(timeInSeconds / 31449600);
    var weeks = Math.floor(timeInSeconds % 31449600 / 604800);
    var days = Math.floor(timeInSeconds % 31449600 % 604800 / 86400);
    var hours = Math.floor(timeInSeconds % 31449600 % 604800 % 86400 / 3600);
    var minutes = Math.floor(timeInSeconds % 31449600 % 604800 % 86400 % 3600 / 60);
    var seconds = Math.round(timeInSeconds % 31449600 % 604800 % 86400 % 3600 % 60);
    return years + "Y " + weeks + "W " + days + "D " + hours + "H " + minutes + "M " + seconds + "S";
}

function simulate() {
    var a = document.getElementById("alpha").value;
    var g = document.getElementById("gamma").value;
    var att = document.getElementById("attempts").value;
    var initialPoint = Math.floor(Math.random() * 2016) + 1; // Returns a random integer between 1 and 2016 (1 and 2016 are included)

    var selfishStats = selfish(a, g, att, initialPoint);
    var honestAttempts = selfishStats[4];
    var honestStats = honest(a, g, honestAttempts);
    var selfishStats = selfish(a, g, att, initialPoint);
    var leadStats = lead(a, g, att, initialPoint);
    var equalForkStats = equalFork(a, g, att, initialPoint);

    var honestSim = apparentHashRate(a, g, 1, 10, 'h', honestStats[0], honestStats[2], honestStats[4], initialPoint);
    var selfishSim = apparentHashRate(a, g, 1, 10, 's', selfishStats[0], selfishStats[2], selfishStats[4], initialPoint);
    var leadSim = apparentHashRate(a, g, 1, 10, 'l', leadStats[0], leadStats[2], leadStats[4], initialPoint);
    var equalForkSim = apparentHashRate(a, g, 1, 10, 'e', equalForkStats[0], equalForkStats[2], equalForkStats[4], initialPoint);
    var honestDiff = difficulty(initialPoint, honestStats[2], honestStats[4]);
    var selfishDiff = difficulty(initialPoint, selfishStats[2], selfishStats[4]);
    var leadDiff = difficulty(initialPoint, leadStats[2], leadStats[4]);
    var equalForkDiff = difficulty(initialPoint, equalForkStats[2], equalForkStats[4]);
    var honestTime = timer(60 * ((honestStats[2] + initialPoint) / 2016) * 2016 * 10 / (honestStats[2] / honestStats[4]));
    var selfishTime = timer(60 * selfishStats[10].reduce((a, b) => a + b, 0));
    var leadTime = timer(60 * leadStats[10].reduce((a, b) => a + b, 0));
    var equalForkTime = timer(60 * equalForkStats[10].reduce((a, b) => a + b, 0));

    var honestTheory = theoretics(a, g, 1, 10, 'h', honestStats[2], initialPoint);
    var selfishTheory = theoretics(a, g, 1, 10, 's', selfishStats[2], initialPoint);
    var leadTheory = theoretics(a, g, 1, 10, 'l', leadStats[2], initialPoint);
    var equalForkTheory = theoretics(a, g, 1, 10, 'e', equalForkStats[2], initialPoint);
   
/*  to acheive more consistent P.
    var check = (selfishTheory[1]-0.05<selfishSim[1] && selfishSim[1]<selfishTheory[1]+0.05)? true:false;
    var check = (leadTheory[1]-0.05<leadSim[1] && leadSim[1]<leadTheory[1]+0.05)? true:false;
    var check = (equalForkTheory[1]-0.05<equalForkSim[1] && equalForkSim[1]<equalForkTheory[1]+0.05)? true:false;
    while (check === false) {
        selfishStats = selfish(a, g, att, initialPoint);
        selfishSim = apparentHashRate(a, g, 1, 10, 's', selfishStats[0], selfishStats[2], selfishStats[4], initialPoint);
        check = (selfishTheory[0]-0.05<selfishSim[0] && selfishSim[0]<selfishTheory[0]+0.05)? true:false;
    }
    while (check === false) {
        leadStats = lead(a, g, att, initialPoint);
        leadSim = apparentHashRate(a, g, 1, 10, 's', leadStats[0], leadStats[2], leadStats[4], initialPoint);
        check = (leadTheory[0]-0.05<leadSim[0] && leadSim[0]<leadTheory[0]+0.05)? true:false;
    }
    while (check === false) {
        equalForkStats = equalFork(a, g, att, initialPoint);
        equalForkSim = apparentHashRate(a, g, 1, 10, 's', equalForkStats[0], equalForkStats[2], equalForkStats[4], initialPoint);
        check = (equalForkTheory[0]-0.05<equalForkSim[0] && equalForkSim[0]<equalForkTheory[0]+0.05)? true:false;
    }
*/
 document.getElementById("t1111").innerHTML = selfishStats[10] + ' Ti';
  document.getElementById("t1112").innerHTML = selfishStats[9] + ' Di';
   document.getElementById("t1113").innerHTML = selfishStats[8] + ' Pi';
      document.getElementById("t1114").innerHTML = selfishStats[12] + ' IP';
       document.getElementById("t1115").innerHTML = selfishStats[10].reduce((a, b) => a + b, 0) + ' sumTi';
        document.getElementById("t1116").innerHTML = selfishStats[11] + ' TMi';
            document.getElementById("t1117").innerHTML = selfishStats[8].reduce((a, b) => a + b, 0) + ' sumPi';


 
    document.getElementById("t11").innerHTML = honestStats[0] + ' Blocks';
    document.getElementById("t12").innerHTML = selfishStats[0] + ' Blocks';
    document.getElementById("t13").innerHTML = leadStats[0] + ' Blocks';
    document.getElementById("t14").innerHTML = equalForkStats[0] + ' Blocks';
    document.getElementById("t21").innerHTML = honestStats[1] + ' Blocks';
    document.getElementById("t22").innerHTML = selfishStats[1] + ' Blocks';
    document.getElementById("t23").innerHTML = leadStats[1] + ' Blocks';
    document.getElementById("t24").innerHTML = equalForkStats[1] + ' Blocks';
    document.getElementById("t31").innerHTML = honestStats[2];
    document.getElementById("t32").innerHTML = selfishStats[2];
    document.getElementById("t33").innerHTML = leadStats[2];
    document.getElementById("t34").innerHTML = equalForkStats[2];
    document.getElementById("t41").innerHTML = honestStats[3];
    document.getElementById("t42").innerHTML = selfishStats[3];
    document.getElementById("t43").innerHTML = leadStats[3];
    document.getElementById("t44").innerHTML = equalForkStats[3];
    document.getElementById("t51").innerHTML = honestStats[4];
    document.getElementById("t52").innerHTML = selfishStats[4];
    document.getElementById("t53").innerHTML = leadStats[4];
    document.getElementById("t54").innerHTML = equalForkStats[4];
    document.getElementById("t61").innerHTML = honestStats[5] + ' %';
    document.getElementById("t62").innerHTML = selfishStats[5] + ' %';
    document.getElementById("t63").innerHTML = leadStats[5] + ' %';
    document.getElementById("t64").innerHTML = equalForkStats[5] + ' %';
    document.getElementById("t71").innerHTML = honestStats[6] + ' %';
    document.getElementById("t72").innerHTML = selfishStats[6] + ' %';
    document.getElementById("t73").innerHTML = leadStats[6] + ' %';
    document.getElementById("t74").innerHTML = equalForkStats[6] + ' %';
    document.getElementById("t81").innerHTML = honestStats[7] + ' %';
    document.getElementById("t82").innerHTML = selfishStats[7] + ' %';
    document.getElementById("t83").innerHTML = leadStats[7] + ' %';
    document.getElementById("t84").innerHTML = equalForkStats[7] + ' %';
    document.getElementById("t91").innerHTML = (100 * a).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t92").innerHTML = (100 * a).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t93").innerHTML = (100 * a).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t94").innerHTML = (100 * a).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t101").innerHTML = (100 * honestSim[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t102").innerHTML = (100 * selfishSim[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t103").innerHTML = (100 * leadSim[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t104").innerHTML = (100 * equalForkSim[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t111").innerHTML = ' ';
    document.getElementById("t112").innerHTML = (100 * selfishSim[1] / honestSim[1] - 100) >= 0 ? (100 * selfishSim[1] / honestSim[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * selfishSim[1] / honestSim[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t113").innerHTML = (100 * leadSim[1] / honestSim[1] - 100) >= 0 ? (100 * leadSim[1] / honestSim[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * leadSim[1] / honestSim[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t114").innerHTML = (100 * equalForkSim[1] / honestSim[1] - 100) >= 0 ? (100 * equalForkSim[1] / honestSim[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * equalForkSim[1] / honestSim[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t121").innerHTML = honestDiff[0] === 1 ? 1 + '<br>' + 'Time' : honestDiff[0] + '<br>' + 'Times';
    document.getElementById("t122").innerHTML = selfishDiff[0] === 1 ? 1 + '<br>' + 'Time' : selfishDiff[0] + '<br>' + 'Times';
    document.getElementById("t123").innerHTML = leadDiff[0] === 1 ? 1 + '<br>' + 'Time' : leadDiff[0] + '<br>' + 'Times';
    document.getElementById("t124").innerHTML = equalForkDiff[0] === 1 ? 1 + '<br>' + 'Time' : equalForkDiff[0] + '<br>' + 'Times';
    document.getElementById("t131").innerHTML = (honestDiff[1] * 100).toFixed(2) + ' %';
    document.getElementById("t132").innerHTML = (selfishDiff[1] * 100).toFixed(2) + ' %';
    document.getElementById("t133").innerHTML = (leadDiff[1] * 100).toFixed(2) + ' %';
    document.getElementById("t134").innerHTML = (equalForkDiff[1] * 100).toFixed(2) + ' %';
    document.getElementById("t141").innerHTML = honestTime;
    document.getElementById("t142").innerHTML = selfishTime;
    document.getElementById("t143").innerHTML = leadTime;
    document.getElementById("t144").innerHTML = equalForkTime;
    document.getElementById("t151").innerHTML = (100 * honestTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t152").innerHTML = (100 * selfishTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t153").innerHTML = (100 * leadTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t154").innerHTML = (100 * equalForkTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t161").innerHTML = ' ';
    document.getElementById("t162").innerHTML = (100 * selfishTheory[1] / honestTheory[1] - 100) >= 0 ? (100 * selfishTheory[1] / honestTheory[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * selfishTheory[1] / honestTheory[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t163").innerHTML = (100 * leadTheory[1] / honestTheory[1] - 100) >= 0 ? (100 * leadTheory[1] / honestTheory[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * leadTheory[1] / honestTheory[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t164").innerHTML = (100 * equalForkTheory[1] / honestTheory[1] - 100) >= 0 ? (100 * equalForkTheory[1] / honestTheory[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * equalForkTheory[1] / honestTheory[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';

    /* use to give them row data
     document.getElementById("t11").innerHTML = honestStats[0] + ' Blocks';
     document.getElementById("t12").innerHTML = selfishStats[0] + ' Blocks';
     document.getElementById("t13").innerHTML = leadStats[0] + ' Blocks';
     document.getElementById("t14").innerHTML = equalForkStats[0] + ' Blocks';
     document.getElementById("t21").innerHTML = honestStats[1] + ' Blocks';
     document.getElementById("t22").innerHTML = selfishStats[1] + ' Blocks';
     document.getElementById("t23").innerHTML = leadStats[1] + ' Blocks';
     document.getElementById("t24").innerHTML = equalForkStats[1] + ' Blocks';
     document.getElementById("t31").innerHTML = honestStats[2];
     document.getElementById("t32").innerHTML = selfishStats[2];
     document.getElementById("t33").innerHTML = leadStats[2];
     document.getElementById("t34").innerHTML = equalForkStats[2];
     document.getElementById("t41").innerHTML = honestStats[3];
     document.getElementById("t42").innerHTML = selfishStats[3];
     document.getElementById("t43").innerHTML = leadStats[3];
     document.getElementById("t44").innerHTML = equalForkStats[3];
     document.getElementById("t51").innerHTML = honestStats[4];
     document.getElementById("t52").innerHTML = selfishStats[4];
     document.getElementById("t53").innerHTML = leadStats[4];
     document.getElementById("t54").innerHTML = equalForkStats[4];
     document.getElementById("t61").innerHTML = honestStats[5] + ' %';
     document.getElementById("t62").innerHTML = selfishStats[5] + ' %';
     document.getElementById("t63").innerHTML = leadStats[5] + ' %';
     document.getElementById("t64").innerHTML = equalForkStats[5] + ' %';
     document.getElementById("t71").innerHTML = honestStats[6] + ' %';
     document.getElementById("t72").innerHTML = selfishStats[6] + ' %';
     document.getElementById("t73").innerHTML = leadStats[6] + ' %';
     document.getElementById("t74").innerHTML = equalForkStats[6] + ' %';
     document.getElementById("t81").innerHTML = honestStats[7] + ' %';
     document.getElementById("t82").innerHTML = selfishStats[7] + ' %';
     document.getElementById("t83").innerHTML = leadStats[7] + ' %';
     document.getElementById("t84").innerHTML = equalForkStats[7] + ' %';
     document.getElementById("t91").innerHTML = (100 * a).toFixed() + ' %';
     document.getElementById("t92").innerHTML = (100 * a).toFixed() + ' %';
     document.getElementById("t93").innerHTML = (100 * a).toFixed() + ' %';
     document.getElementById("t94").innerHTML = (100 * a).toFixed() + ' %';
     document.getElementById("t101").innerHTML = honestSim[0] + ' %';
     document.getElementById("t102").innerHTML = selfishSim[0] + ' %';
     document.getElementById("t103").innerHTML = leadSim[0] + ' %';
     document.getElementById("t104").innerHTML = equalForkSim[0] + ' %';
     document.getElementById("t111").innerHTML = honestSim[1] + ' %';
     document.getElementById("t112").innerHTML = selfishSim[1] + ' %';
     document.getElementById("t113").innerHTML = leadSim[1] + ' %';
     document.getElementById("t114").innerHTML = equalForkSim[1] + ' %';
     document.getElementById("t121").innerHTML = honestDiff[0] === 1 ? 1 + ' Time' :
     honestDiff[0] + ' Times';
     document.getElementById("t122").innerHTML = selfishDiff[0] === 1 ? 1 + ' Time' :
     selfishDiff[0] + ' Times';
     document.getElementById("t123").innerHTML = leadDiff[0] === 1 ? 1 + ' Time' :
     leadDiff[0] + ' Times';
     document.getElementById("t124").innerHTML = equalForkDiff[0] === 1 ? 1 + ' Time' :
     equalForkDiff[0] + ' Times';
     document.getElementById("t131").innerHTML = (honestDiff[1] * 100).toFixed() + ' %';
     document.getElementById("t132").innerHTML = (selfishDiff[1] * 100).toFixed() + ' %';
     document.getElementById("t133").innerHTML = (leadDiff[1] * 100).toFixed() + ' %';
     document.getElementById("t134").innerHTML = (equalForkDiff[1] * 100).toFixed() + ' %';
     document.getElementById("t141").innerHTML = honestAverageTime;
     document.getElementById("t142").innerHTML = selfishAverageTime;
     document.getElementById("t143").innerHTML = leadAverageTime;
     document.getElementById("t144").innerHTML = equalForkAverageTime;    
     document.getElementById("t151").innerHTML = honestTheory[0];
     document.getElementById("t152").innerHTML = selfishTheory[0].toFixed(3);
     document.getElementById("t153").innerHTML = leadTheory[0].toFixed(3);
     document.getElementById("t154").innerHTML = equalForkTheory[0].toFixed(3); // or better? equalForkTheory[0] + ' (' + 100*equalForkTheory[0] + ' % of the pool)';
     document.getElementById("t161").innerHTML = ' ';
     document.getElementById("t162").innerHTML = (100 * selfishTheory[1] / honestTheory[1] - 100).toFixed(2) >= 0 ? (100 * selfishTheory[1] / honestTheory[1] - 100).toFixed(2) + ' % More Than Being Honest' : (100 - 100 * selfishTheory[1] / honestTheory[1]).toFixed(2) + ' % Less Than Being Honest';
     document.getElementById("t163").innerHTML = (100 * leadTheory[1] / honestTheory[1] - 100).toFixed(2) >= 0 ? (100 * leadTheory[1] / honestTheory[1] - 100).toFixed(2) + ' % More Than Being Honest' : (100 - 100 * leadTheory[1] / honestTheory[1]).toFixed(2) + ' % Less Than Being Honest';
     document.getElementById("t164").innerHTML = (100 * equalForkTheory[1] / honestTheory[1] - 100).toFixed(2) >= 0 ? (100 * equalForkTheory[1] / honestTheory[1] - 100).toFixed(2) + ' % More Than Being Honest' : (100 - 100 * equalForkTheory[1] / honestTheory[1]).toFixed(2) + ' % Less Than Being Honest'; // or better? equalForkTheory[1] + ' (' + 100*equalForkTheory[1] + ' % of the pool)'
     */
    return [honestSim[1], selfishSim[1], leadSim[1], equalForkSim[1], honestTheory[1], selfishTheory[1], leadTheory[1], equalForkTheory[1]];
}

function drawChart1() {
    var data1 = {
        labels: ["Honest", "Selfish", "Lead", "Equal Fork"],
        datasets: [{
                label: "Profitability",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [simulate()[0], simulate()[1], simulate()[2], simulate()[3]]
            }]
    };
    
    var data2 = {
        labels: ["Honest", "Selfish", "Lead", "Equal Fork"],
        datasets: [{
                label: "Profitability",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [simulate()[4], simulate()[5], simulate()[6], simulate()[7]]
            }]
    };

    var option = {
        scales: {
            yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                }],
            xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
        }
    };
    
    if (window.crt1 !== undefined)
    {
        crt1.destroy();
    }
    crt1 = Chart.Bar('chart1', {
        options: option,
        data: data1
    });

    if (window.crt2 !== undefined)
    {
        crt2.destroy();
    }
    crt2 = Chart.Bar('chart2', {
        options: option,
        data: data2
    });


}
















/*
 function lead1(alpha, gamma, attempts) {
 var state = 0;
 var willBeSelfish = false;
 var youPublished = 0;
 var othersPublished = 0;
 var youHided = 0;
 var cycleCounter = 0;
 var totalMined = 0;
 while (cycleCounter < attempts) {
 totalMined++;
 willBeSelfish = nextBlockPrediction(alpha);
 if (state === 0) {
 cycleCounter++;
 if (willBeSelfish) {
 state = 1;
 youHided++;
 }
 else {
 state = 0;
 othersPublished++;
 }
 } else if (state > 0) {
 if (willBeSelfish) {
 state++;
 youHided++;
 }
 else {
 state = -1*state;
 othersPublished++; //temporary reward 1
 youHided--;
 youPublished++; //temporary reward 2
 }
 }
 else if (state === -1) {
 var rand = Math.random();
 if (rand < alpha) {
 state = 0;
 youPublished++; //temporary reward 2 is fixed
 othersPublished--; //temporary reward 1 is deleted
 }
 else if (rand <alpha + gamma*(1-alpha)){
 state = 0;
 othersPublished++; //temporary reward 2 is fixed
 othersPublished--; //temporary reward 1 is deleted
 
 }
 else {
 state = 0;
 othersPublished++; //temporary reward 1 is fixed
 youPublished--; //temporary reward 2 is deleted
 }
 }
 else if (state < -1) {
 var rand = Math.random();
 if (rand < alpha) {
 state--;
 youHided++;
 }
 else if (rand <alpha + gamma*(1-alpha)){
 state++;
 othersPublished++;
 youHided--;
 youPublished++;
 othersPublished--;
 
 }
 else {
 state++;
 othersPublished++;
 youPublished++;
 youHided--;
 }
 }
 
 
 }
 var totalPublished = youPublished + othersPublished;
 var yourRelativePerformance = (100 * youPublished / totalPublished).toPrecision(4);
 var theirRelativePerformance = (100 * othersPublished / totalPublished).toPrecision(4);
 var apparentHashrate = (youPublished / totalPublished).toPrecision(4);
 var tApparentHashrate = theoreticalApparentHashrateAfterDificultyAdjustment(alpha, gamma)[1].toPrecision(4);
 var relativeChange = Math.round(100 * (apparentHashrate - tApparentHashrate) / tApparentHashrate) / 100;
 var difficultyChange = (100 * totalPublished / totalMined).toPrecision(4);
 var result = [youPublished, othersPublished, totalPublished, yourRelativePerformance, theirRelativePerformance, apparentHashrate, tApparentHashrate, relativeChange, difficultyChange, totalMined];
 return result;
 }
 
 function lead2(alpha, gamma, attempts) {
 var state = 0;
 var willBeSelfish = false;
 var youPublished = 0;
 var othersPublished = 0;
 var youHided = 0;
 var cycleCounter = 0;
 var totalMined = 0;
 while (cycleCounter < attempts) {
 totalMined++;
 willBeSelfish = nextBlockPrediction(alpha);
 if (state === 0) {
 cycleCounter++;
 
 if (willBeSelfish) {
 state = 1;
 youHided++;
 }
 else {
 state = 0;
 othersPublished++;
 }
 } else if (state > 0) {
 if (willBeSelfish) {
 state++;
 youHided++;
 }
 else {
 state = -1*state;
 //othersPublished++; //temporary reward 1
 youHided--;
 //youPublished++; //temporary reward 2
 }
 }
 else if (state === -1) {
 var rand = Math.random();
 if (rand < alpha) {
 state = 0;
 youPublished = youPublished + 2; //temporary reward 2 is fixed
 //othersPublished--; //temporary reward 1 is deleted
 }
 else if (rand <alpha + gamma*(1-alpha)){
 state = 0;
 //othersPublished++; //temporary reward 2 is fixed
 //othersPublished--; //temporary reward 1 is deleted
 
 }
 else {
 state = 0;
 othersPublished++; //temporary reward 1 is fixed
 //youPublished--; //temporary reward 2 is deleted
 }
 }
 else if (state < -1) {
 var rand = Math.random();
 if (rand < alpha) {
 state--;
 youPublished++; //temporary reward 2 is fixed
 //othersPublished--; //temporary reward 1 is deleted
 }
 else if (rand <alpha + gamma*(1-alpha)){
 state++;
 othersPublished++; //temporary reward 2 is fixed
 //othersPublished--; //temporary reward 1 is deleted
 
 }
 else {
 state++;
 othersPublished++; //temporary reward 1 is fixed
 //youPublished--; //temporary reward 2 is deleted
 }
 }
 
 
 }
 
 var totalPublished = youPublished + othersPublished;
 var yourRelativePerformance = (100 * youPublished / totalPublished).toPrecision(4);
 var theirRelativePerformance = (100 * othersPublished / totalPublished).toPrecision(4);
 var apparentHashrate = (youPublished / totalPublished).toPrecision(4);
 var tApparentHashrate = theoreticalApparentHashrateAfterDificultyAdjustment(alpha, gamma)[1].toPrecision(4);
 var relativeChange = Math.round(100 * (apparentHashrate - tApparentHashrate) / tApparentHashrate) / 100;
 var difficultyChange = (100 * totalPublished / totalMined).toPrecision(4);
 var result = [youPublished, othersPublished, totalPublished, yourRelativePerformance, theirRelativePerformance, apparentHashrate, tApparentHashrate, relativeChange, difficultyChange, totalMined];
 return result;
 }
 
 function lead(alpha, gamma, attempts) {
 var state = 0;
 var willBeSelfish = false;
 var primeState = false;
 var youPublished = 0;
 var othersPublished = 0;
 var youHided = 0;
 var cycleCounter = 0;
 var totalMined = 0;
 while (cycleCounter < attempts) {
 totalMined++;
 willBeSelfish = nextBlockPrediction(alpha);
 switch (state) {
 case 0:
 cycleCounter++;
 if (primeState){
 rand = Math.random();
 if (rand < alpha) {
 youPublished += (1 + youHided);
 }
 else if (rand < alpha + gamma * (1 - alpha)) {
 youPublished += youHided;
 othersPublished++;
 }
 else {
 othersPublished += (1 + youHided);
 }
 youHided = 0;
 primeState = false;
 }
 else{
 primeState = false;
 willBeSelfish = nextBlockPrediction(alpha);
 state = willBeSelfish ? 1 : 0;
 if (!willBeSelfish) {
 othersPublished++;
 }
 }   
 break;
 case -1:
 if (!willBeSelfish) {
 state = -2;
 primeState = true;
 }
 else {
 state = -200; // 0''
 primeState = true;
 youHided += 1;
 }
 break;
 case -2:
 if (!willBeSelfish) {
 state = 0;
 othersPublished += (3 + youHided);
 youHided = 0;
 }
 else{
 state++;
 youHided += 1;
 }
 break;
 default:
 if (primeState){
 rand = Math.random();
 if (rand < alpha) {
 state++;
 }
 else if (rand < alpha + gamma * (1 - alpha)) {
 youPublished += youHided;
 youHided = 0;
 state--;
 youHided++;
 }
 else{
 state--;
 youHided++;
 }
 }
 else{
 willBeSelfish = nextBlockPrediction(alpha);
 if (willBeSelfish) {
 state++;
 }
 else {
 primeState = true;
 state--;
 youHided++;
 }
 }
 break;
 }
 }
 var totalPublished = youPublished + othersPublished;
 var yourRelativePerformance = (100 * youPublished / totalPublished).toPrecision(4);
 var theirRelativePerformance = (100 * othersPublished / totalPublished).toPrecision(4);
 var apparentHashrate = (youPublished / totalPublished).toPrecision(4);
 var tApparentHashrate = theoreticalApparentHashrateAfterDificultyAdjustment(alpha, gamma)[1].toPrecision(4);
 var relativeChange = Math.round(100 * (apparentHashrate - tApparentHashrate) / tApparentHashrate) / 100;
 var difficultyChange = (100 * totalPublished / totalMined).toPrecision(4);
 var result = [youPublished, othersPublished, totalPublished, yourRelativePerformance, theirRelativePerformance, apparentHashrate, tApparentHashrate, relativeChange, difficultyChange, totalMined];
 return result;
 }
 */


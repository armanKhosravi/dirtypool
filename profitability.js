function simulatedProfits(a, g, b, t, strategy, youPublished, totalPublished, totalMined, initialPoint) {
    // for defining initialPoint later outside this function you have to use: var initialPoint = Math.floor(Math.random() * 2016) + 1;  Returns a random integer between 1 and 2016 (1 and 2016 are included).
    switch (strategy) {
        case 's': // Selfish Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 'l': // Lead Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 'e': // Equal Fork Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 'h': // Honest Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
    }
    var result = [apparentHashrate, revenueRatio];
    return result;
}
function theoreticalProfits(a, g, b, t, strategy, totalPublished, initialPoint) {
    // for defining initialPoint later outside this function you have to use: var initialPoint = Math.floor(Math.random() * 2016) + 1;  Returns a random integer between 1 and 2016 (1 and 2016 are included).
    switch (strategy) {
        case 's': // Selfish Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? a - (1 - g) * (1 - a) * (1 - a) * (1 - a - a) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a) :
                    (a - ((1 - g) * (1 - a) * (1 - a) * a * (1 - a - a)) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * ((1 - a - a + (1 - a) * a * (1 - a - a) + (1 - a) * a) / ((1 - a) * (1 - a) * a + 1 - a - a));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a - (1 - g) * (1 - a) * (1 - a) * (1 - a - a) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * b / t :
                    ((a - ((1 - g) * (1 - a) * (1 - a) * a * (1 - a - a)) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * ((1 - a - a + (1 - a) * a * (1 - a - a) + (1 - a) * a) / ((1 - a) * (1 - a) * a + 1 - a - a))) * b / t;
            ;
            break;
        case 'l': // Lead Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? a - (((1 - a) * a * (1 - a - a) * (1 - g)) / g) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a)) :
                    a * ((1 - a + (1 - a) * a - a * a) / (1 - a + (1 - a) * a - a)) - (((1 - a) * a * (1 - a - a) * (1 - g)) / (g)) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a - (((1 - a) * a * (1 - a - a) * (1 - g)) / g) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a))) * b / t :
                    (a * ((1 - a + (1 - a) * a - a * a) / (1 - a + (1 - a) * a - a)) - (((1 - a) * a * (1 - a - a) * (1 - g)) / (g)) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a))) * b / t;
            break;
        case 'e': // Equal Fork Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? a - ((1 - g) * (1 - a - a) / g) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) :
                    a / (1 - a) - ((1 - g) * (1 - a - a) / (g * (1 - a))) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a))));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a - ((1 - g) * (1 - a - a) / g) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a))))) * b / t :
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
function difficulty(initialPoint, totalPublished, totalMined) {
    // for defining initialPoint later outside this function you have to use: var initialPoint = Math.floor(Math.random() * 2016) + 1;  Returns a random integer between 1 and 2016 (1 and 2016 are included).
    var timesDifficultyChanged = Math.floor((totalPublished + initialPoint) / 2016);
    var difficultyChangesTo = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? 1 : (totalPublished / totalMined);
    var result = [timesDifficultyChanged, difficultyChangesTo];
    return result;
}
function timer(initialPoint, totalPublished, totalMined) {
    //var averageBlockTime = 0;
    //var timeInSeconds = 60 * ((totalPublished + initialPoint) / 2016) * 2016 * 10 / (totalPublished / totalMined);
    var timeInSeconds = 60 * (totalPublished) * 10;
    var years = Math.floor(timeInSeconds / 31449600);
    var weeks = Math.floor(timeInSeconds % 31449600 / 604800);
    var days = Math.floor(timeInSeconds % 31449600 % 604800 / 86400);
    var hours = Math.floor(timeInSeconds % 31449600 % 604800 % 86400 / 3600);
    var minutes = Math.floor(timeInSeconds % 31449600 % 604800 % 86400 % 3600 / 60);
    var seconds = Math.round(timeInSeconds % 31449600 % 604800 % 86400 % 3600 % 60);
    return years + "Y " + weeks + "W " + days + "D " + hours + "H " + minutes + "M " + seconds + "S";
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


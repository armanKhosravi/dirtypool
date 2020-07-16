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









/*  to acheive more consistent P.
    var check = (selfishTheory[1]-0.05<selfishSim[1] && selfishSim[1]<selfishTheory[1]+0.05)? true:false;
    var check = (leadTheory[1]-0.05<leadSim[1] && leadSim[1]<leadTheory[1]+0.05)? true:false;
    var check = (equalForkTheory[1]-0.05<equalForkSim[1] && equalForkSim[1]<equalForkTheory[1]+0.05)? true:false;
    while (check === false) {
        selfishStats = selfish(a, g, att, initialPoint);
        selfishSim = simulatedProfits(a, g, 1, 10, 's', selfishStats[0], selfishStats[2], selfishStats[4], initialPoint);
        check = (selfishTheory[0]-0.05<selfishSim[0] && selfishSim[0]<selfishTheory[0]+0.05)? true:false;
    }
    while (check === false) {
        leadStats = lead(a, g, att, initialPoint);
        leadSim = simulatedProfits(a, g, 1, 10, 's', leadStats[0], leadStats[2], leadStats[4], initialPoint);
        check = (leadTheory[0]-0.05<leadSim[0] && leadSim[0]<leadTheory[0]+0.05)? true:false;
    }
    while (check === false) {
        equalForkStats = equalFork(a, g, att, initialPoint);
        equalForkSim = simulatedProfits(a, g, 1, 10, 's', equalForkStats[0], equalForkStats[2], equalForkStats[4], initialPoint);
        check = (equalForkTheory[0]-0.05<equalForkSim[0] && equalForkSim[0]<equalForkTheory[0]+0.05)? true:false;
    }*/

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

/*cell = {t11:honestStats[0], t12:selfishStats[0], t13:leadStats[0], t14:equalForkStats[0],
            t21:honestStats[1], t22:selfishStats[1], t23:leadStats[1], t24:equalForkStats[1],
            t31:honestStats[2], t32:selfishStats[2], t33:leadStats[2], t34:equalForkStats[2],
            t41:honestStats[3], t42:selfishStats[3], t43:leadStats[3], t44:equalForkStats[3],
            t51:honestStats[4], t52:selfishStats[4], t53:leadStats[4], t54:equalForkStats[4],
            t61:honestStats[5], t62:selfishStats[5], t63:leadStats[5], t64:equalForkStats[5],
            t71:honestStats[6], t72:selfishStats[6], t73:leadStats[6], t74:equalForkStats[6],
            t81:honestStats[7], t82:selfishStats[7], t83:leadStats[7], t84:equalForkStats[7],
            t91:(100 * a).toFixed(1), t92:(100 * a).toFixed(1), t93:(100 * a).toFixed(1), t94:(100 * a).toFixed(1),
            t101:(100 * honestSim[0]).toFixed(1), t102:(100 * selfishSim[0]).toFixed(1), t103:(100 * leadSim[0]).toFixed(1), t104:(100 * equalForkSim[0]).toFixed(1),
            t111:0; t112:(100 * selfishSim[1] / honestSim[1] - 100) >= 0 ? (100 * selfishSim[1] / honestSim[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * selfishSim[1] / honestSim[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest',
 t113:(100 * leadSim[1] / honestSim[1] - 100) >= 0 ? (100 * leadSim[1] / honestSim[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * leadSim[1] / honestSim[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest',
 t114:(100 * equalForkSim[1] / honestSim[1] - 100) >= 0 ? (100 * equalForkSim[1] / honestSim[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * equalForkSim[1] / honestSim[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest',
 t121:honestDiff[0] === 1 ? 1 + '<br>' + 'Time' : honestDiff[0] + '<br>' + 'Times',
 t122:selfishDiff[0] === 1 ? 1 + '<br>' + 'Time' : selfishDiff[0] + '<br>' + 'Times',
 t123:leadDiff[0] === 1 ? 1 + '<br>' + 'Time' : leadDiff[0] + '<br>' + 'Times',
 t124:equalForkDiff[0] === 1 ? 1 + '<br>' + 'Time' : equalForkDiff[0] + '<br>' + 'Times',
 t131:(honestDiff[1] * 100).toFixed(2) + ' %',
 t132:(selfishDiff[1] * 100).toFixed(2) + ' %',
 t133:(leadDiff[1] * 100).toFixed(2) + ' %',
 t134:(equalForkDiff[1] * 100).toFixed(2) + ' %',
 t141:honestAverageTime,
 t142:selfishAverageTime,
 t143:leadAverageTime,
 t144:equalForkAverageTime,
 t151:(100 * honestTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool',
 t152:(100 * selfishTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool',
 t153:(100 * leadTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool',
 t154:(100 * equalForkTheory[0]).toFixed(1) + ' %' + '<br>' + 'of the pool',
 t161:'0' + ' %' + '<br>' + 'More Than Being Honest',
 t162:(100 * selfishTheory[1] / honestTheory[1] - 100) >= 0 ? (100 * selfishTheory[1] / honestTheory[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * selfishTheory[1] / honestTheory[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest',
 t163:(100 * leadTheory[1] / honestTheory[1] - 100) >= 0 ? (100 * leadTheory[1] / honestTheory[1] - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * leadTheory[1] / honestTheory[1]).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest',
 t164:(100 * equalForkTheory[1] / ho
        */

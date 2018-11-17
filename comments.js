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
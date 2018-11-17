var pureCellVlues = {};
var editedCellValues = {};

var slider1 = document.getElementById("alpha");
var output1 = document.getElementById("demoAlpha");
output1.innerHTML = slider1.value;
slider1.oninput = function () {output1.innerHTML = this.value;};

var slider2 = document.getElementById("gamma");
var output2 = document.getElementById("demoGamma");
output2.innerHTML = slider2.value;
slider2.oninput = function () {output2.innerHTML = this.value;};

var slider3 = document.getElementById("attempts");
var output3 = document.getElementById("demoAttempts");
output3.innerHTML = slider3.value + " Cycles";
slider3.oninput = function () {output3.innerHTML = this.value + " Cycles";};

function simulate() {
    var a = document.getElementById("alpha").value;
    var g = document.getElementById("gamma").value;
    var att = document.getElementById("attempts").value;
    var initialPoint = Math.floor(Math.random() * 2016) + 1; // Returns a random integer between 1 and 2016 (1 and 2016 are included)
    var selfishStats = selfish(a, g, att, initialPoint);
    var honestAttempts = selfishStats[4];
    var honestStats = honest(a, g, honestAttempts);
    var selfishStats = selfish(a, g, att, initialPoint);
    var leadStats = lead(a, g, att);
    var equalForkStats = equalFork(a, g, att);
    var honestSim = simulatedProfits(a, g, 12.5, 10, 'h', honestStats[0], honestStats[2], honestStats[4], initialPoint);
    var selfishSim = simulatedProfits(a, g, 12.5, 10, 's', selfishStats[0], selfishStats[2], selfishStats[4], initialPoint);
    var leadSim = simulatedProfits(a, g, 12.5, 10, 'l', leadStats[0], leadStats[2], leadStats[4], initialPoint);
    var equalForkSim = simulatedProfits(a, g, 12.5, 10, 'e', equalForkStats[0], equalForkStats[2], equalForkStats[4], initialPoint);
    var honestDiff = difficulty(initialPoint, honestStats[2], honestStats[4]);
    var selfishDiff = difficulty(initialPoint, selfishStats[2], selfishStats[4]);
    var leadDiff = difficulty(initialPoint, leadStats[2], leadStats[4]);
    var equalForkDiff = difficulty(initialPoint, equalForkStats[2], equalForkStats[4]);
    var honestDuration = timer(initialPoint, honestStats[2], honestStats[4]);
    var selfishDuration = timer(initialPoint, selfishStats[2], selfishStats[4]);
    var leadDuration = timer(initialPoint, leadStats[2], leadStats[4]);
    var equalForkDuration = timer(initialPoint, equalForkStats[2], equalForkStats[4]);
    var honestTheory = theoreticalProfits(a, g, 12.5, 10, 'h', honestStats[2], initialPoint);
    var selfishTheory = theoreticalProfits(a, g, 12.5, 10, 's', selfishStats[2], initialPoint);
    var leadTheory = theoreticalProfits(a, g, 12.5, 10, 'l', leadStats[2], initialPoint);
    var equalForkTheory = theoreticalProfits(a, g, 12.5, 10, 'e', equalForkStats[2], initialPoint);
    pureCellVlues =
            {
                hyp:honestStats[0]  , syp:selfishStats[0]   , lyp:leadStats[0]  , eyp:equalForkStats[0],
                hop:honestStats[1]  , sop:selfishStats[1]   , lop:leadStats[1]  , eop:equalForkStats[1],
                htbp:honestStats[2] , stbp:selfishStats[2]  , ltbp:leadStats[2] , etbp:equalForkStats[2],
                hob:honestStats[3]  , sob:selfishStats[3]   , lob:leadStats[3]  , eob:equalForkStats[3],
                htbm:honestStats[4] , stbm:selfishStats[4]  , ltbm:leadStats[4] , etbm:equalForkStats[4],
                hobp:honestStats[5] , sobp:selfishStats[5]  , lobp:leadStats[5] , eobp:equalForkStats[5],
                hypp:honestStats[6] , sypp:selfishStats[6]  , lypp:leadStats[6] , eypp:equalForkStats[6],
                hopp:honestStats[7] , sopp:selfishStats[7]  , lopp:leadStats[7] , eopp:equalForkStats[7],
                hyrh:a              , syrh:a                , lyrh:a            , eyrh:a,
                hyah:honestSim[0]   , syah:selfishSim[0]    , lyah:leadSim[0]   , eyah:equalForkSim[0],
                hypr:honestSim[1]   , sypr:selfishSim[1]    , lypr:leadSim[1]   , eypr:equalForkSim[1],
                hdc:honestDiff[0]   , sdc:selfishDiff[0]    , ldc:leadDiff[0]   , edc:equalForkDiff[0],
                hdwc:honestDiff[1]  , sdwc:selfishDiff[1]   , ldwc:leadDiff[1]  , edwc:equalForkDiff[1],
                hacd:honestDuration , sacd:selfishDuration  , lacd:leadDuration , eacd:equalForkDuration,
                htah:honestTheory[0], stah:selfishTheory[0] , ltah:leadTheory[0], etah:equalForkTheory[0],
                htpr:honestTheory[1], stpr:selfishTheory[1] , ltpr:leadTheory[1], etpr:equalForkTheory[1]
            };
}
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

function table() {
    document.getElementById("hyp").innerHTML = pureCellVlues.hyp + ' Blocks';
    document.getElementById("syp").innerHTML = pureCellVlues.syp + ' Blocks';
    document.getElementById("lyp").innerHTML = pureCellVlues.lyp + ' Blocks';
    document.getElementById("eyp").innerHTML = pureCellVlues.eyp + ' Blocks';
    document.getElementById("hop").innerHTML = pureCellVlues.hop + ' Blocks';
    document.getElementById("sop").innerHTML = pureCellVlues.sop + ' Blocks';
    document.getElementById("lop").innerHTML = pureCellVlues.lop + ' Blocks';
    document.getElementById("eop").innerHTML = pureCellVlues.eop + ' Blocks';
    document.getElementById("htbp").innerHTML = pureCellVlues.htbp;
    document.getElementById("stbp").innerHTML = pureCellVlues.stbp;
    document.getElementById("ltbp").innerHTML = pureCellVlues.ltbp;
    document.getElementById("etbp").innerHTML = pureCellVlues.etbp;
    document.getElementById("hob").innerHTML = pureCellVlues.hob;
    document.getElementById("sob").innerHTML = pureCellVlues.sob;
    document.getElementById("lob").innerHTML = pureCellVlues.lob;
    document.getElementById("eob").innerHTML = pureCellVlues.eob;
    document.getElementById("htbm").innerHTML = pureCellVlues.htbm;
    document.getElementById("stbm").innerHTML = pureCellVlues.stbm;
    document.getElementById("ltbm").innerHTML = pureCellVlues.ltbm;
    document.getElementById("etbm").innerHTML = pureCellVlues.etbm;
    document.getElementById("hobp").innerHTML = pureCellVlues.hobp + ' %';
    document.getElementById("sobp").innerHTML = pureCellVlues.sobp + ' %';
    document.getElementById("lobp").innerHTML = pureCellVlues.lobp + ' %';
    document.getElementById("eobp").innerHTML = pureCellVlues.eobp + ' %';
    document.getElementById("hypp").innerHTML = pureCellVlues.hypp + ' %';
    document.getElementById("sypp").innerHTML = pureCellVlues.sypp + ' %';
    document.getElementById("lypp").innerHTML = pureCellVlues.lypp + ' %';
    document.getElementById("eypp").innerHTML = pureCellVlues.eypp + ' %';
    document.getElementById("hopp").innerHTML = pureCellVlues.hopp + ' %';
    document.getElementById("sopp").innerHTML = pureCellVlues.sopp + ' %';
    document.getElementById("lopp").innerHTML = pureCellVlues.lopp + ' %';
    document.getElementById("eopp").innerHTML = pureCellVlues.eopp + ' %';
    document.getElementById("hyrh").innerHTML = (100 * pureCellVlues.hyrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("syrh").innerHTML = (100 * pureCellVlues.syrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("lyrh").innerHTML = (100 * pureCellVlues.lyrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("eyrh").innerHTML = (100 * pureCellVlues.eyrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("hyah").innerHTML = (100 * pureCellVlues.hyah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("syah").innerHTML = (100 * pureCellVlues.syah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("lyah").innerHTML = (100 * pureCellVlues.lyah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("eyah").innerHTML = (100 * pureCellVlues.eyah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("hypr").innerHTML = '0' + ' %' + '<br>' + 'More Than Being Honest';
    document.getElementById("sypr").innerHTML = (100 * pureCellVlues.sypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.sypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.sypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("lypr").innerHTML = (100 * pureCellVlues.lypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.lypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.lypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("eypr").innerHTML = (100 * pureCellVlues.eypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.eypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.eypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("hdc").innerHTML = pureCellVlues.hdc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.hdc + '<br>' + 'Times';
    document.getElementById("sdc").innerHTML = pureCellVlues.sdc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.sdc + '<br>' + 'Times';
    document.getElementById("ldc").innerHTML = pureCellVlues.ldc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.ldc + '<br>' + 'Times';
    document.getElementById("edc").innerHTML = pureCellVlues.edc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.hdc + '<br>' + 'Times';
    document.getElementById("hdwc").innerHTML = (pureCellVlues.hdwc * 100).toFixed(2) + ' %';
    document.getElementById("sdwc").innerHTML = (pureCellVlues.sdwc * 100).toFixed(2) + ' %';
    document.getElementById("ldwc").innerHTML = (pureCellVlues.ldwc * 100).toFixed(2) + ' %';
    document.getElementById("edwc").innerHTML = (pureCellVlues.edwc * 100).toFixed(2) + ' %';
    document.getElementById("hacd").innerHTML = pureCellVlues.hacd;
    document.getElementById("sacd").innerHTML = pureCellVlues.sacd;
    document.getElementById("lacd").innerHTML = pureCellVlues.lacd;
    document.getElementById("eacd").innerHTML = pureCellVlues.eacd;
    document.getElementById("htah").innerHTML = (100 * pureCellVlues.htah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("stah").innerHTML = (100 * pureCellVlues.stah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("ltah").innerHTML = (100 * pureCellVlues.ltah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("etah").innerHTML = (100 * pureCellVlues.etah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("htpr").innerHTML = '0' + ' %' + '<br>' + 'More Than Being Honest';
    document.getElementById("stpr").innerHTML = (100 * pureCellVlues.stpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.stpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.stpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("ltpr").innerHTML = (100 * pureCellVlues.ltpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.ltpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.ltpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("etpr").innerHTML = (100 * pureCellVlues.etpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.etpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.etpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
}

function profitabilityChart(){
    var data1 = {
        labels: ["Honest", "Selfish", "Lead", "Equal Fork"],
        datasets: [{
                label: "Profitability",
                backgroundColor: "white",
                borderColor: "tomato",
                borderWidth: 2,
                hoverBackgroundColor: "tomato",
                hoverBorderColor: "tomato",
                data: [pureCellVlues.htpr, pureCellVlues.stpr, pureCellVlues.ltpr, pureCellVlues.etpr]
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
                data: [pureCellVlues.htpr, pureCellVlues.stpr, pureCellVlues.ltpr, pureCellVlues.etpr]
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

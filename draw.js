
var pureCellVlues = {};

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
    selfishStats = selfish(a, g, att, initialPoint);
    var leadStats = lead(a, g, att, initialPoint);
    var t2Stats = twoTrail(a, g, att, initialPoint);
    var t3Stats = threeTrail(a, g, att, initialPoint);
    var t4Stats = fourTrail(a, g, att, initialPoint);
    var equalForkStats = equalFork(a, g, att, initialPoint);
    
    var honestSec = secTimer(initialPoint, honestStats[2], honestStats[4]);
    var selfishSec = secTimer(initialPoint, selfishStats[2], selfishStats[4]);
    var leadSec = secTimer(initialPoint, leadStats[2], leadStats[4]);
    var t2Sec = secTimer(initialPoint, t2Stats[2], t2Stats[4]);
    var t3Sec = secTimer(initialPoint, t3Stats[2], t3Stats[4]);
    var t4Sec = secTimer(initialPoint, t4Stats[2], t4Stats[4]);
    var equalForkSec = secTimer(initialPoint, equalForkStats[2], equalForkStats[4]);
    //var honestAvgTime = honestSec / honestStats[4];
    //var selfishAvgTime = selfishSec / selfishStats[4];
    //var leadAvgTime = leadSec / leadStats[4];
    //var equalForkAvgTime = equalForkSec / equalForkStats[4];
    
    var honestSim = simulatedProfits(a, g, 12.5, 10, 'h', honestStats[0], honestStats[2], honestStats[4], initialPoint);
    var selfishSim = simulatedProfits(a, g, 12.5, 10, 's', selfishStats[0], selfishStats[2], selfishStats[4], initialPoint);
    var leadSim = simulatedProfits(a, g, 12.5, 10, 'l', leadStats[0], leadStats[2], leadStats[4], initialPoint);
    var t2Sim = simulatedProfits(a, g, 12.5, 10, 't2', t2Stats[0], t2Stats[2], t2Stats[4], initialPoint);
    var t3Sim = simulatedProfits(a, g, 12.5, 10, 't3', t3Stats[0], t3Stats[2], t3Stats[4], initialPoint);
    var t4Sim = simulatedProfits(a, g, 12.5, 10, 't4', t4Stats[0], t4Stats[2], t4Stats[4], initialPoint);
    var equalForkSim = simulatedProfits(a, g, 12.5, 10, 'e', equalForkStats[0], equalForkStats[2], equalForkStats[4], initialPoint);
    var honestDiff = difficulty(initialPoint, honestStats[2], honestStats[4]);
    var selfishDiff = difficulty(initialPoint, selfishStats[2], selfishStats[4]);
    var leadDiff = difficulty(initialPoint, leadStats[2], leadStats[4]);
    var t2Diff = difficulty(initialPoint, t2Stats[2], t2Stats[4]);
    var t3Diff = difficulty(initialPoint, t3Stats[2], t3Stats[4]);
    var t4Diff = difficulty(initialPoint, t4Stats[2], t4Stats[4]);
    var equalForkDiff = difficulty(initialPoint, equalForkStats[2], equalForkStats[4]);
    var honestDuration = timer(initialPoint, honestStats[2], honestStats[4]);
    var selfishDuration = timer(initialPoint, selfishStats[2], selfishStats[4]);
    var leadDuration = timer(initialPoint, leadStats[2], leadStats[4]);
    var t2Duration = timer(initialPoint, t2Stats[2], t2Stats[4]);
    var t3Duration = timer(initialPoint, t3Stats[2], t3Stats[4]);
    var t4Duration = timer(initialPoint, t4Stats[2], t4Stats[4]);
    var equalForkDuration = timer(initialPoint, equalForkStats[2], equalForkStats[4]);
    var honestTheory = theoreticalProfits(a, g, 12.5, 10, 'h', honestStats[2], initialPoint);
    var selfishTheory = theoreticalProfits(a, g, 12.5, 10, 's', selfishStats[2], initialPoint);
    var leadTheory = theoreticalProfits(a, g, 12.5, 10, 'l', leadStats[2], initialPoint);
    var t2Theory = theoreticalProfits(a, g, 12.5, 10, 't2', t2Stats[2], initialPoint);
    var t3Theory = theoreticalProfits(a, g, 12.5, 10, 't3', t3Stats[2], initialPoint);
    var t4Theory = theoreticalProfits(a, g, 12.5, 10, 't4', t4Stats[2], initialPoint);
    var equalForkTheory = theoreticalProfits(a, g, 12.5, 10, 'e', equalForkStats[2], initialPoint);

    var hCrt1 = theoreticalProfits(a, g, 12.5, avg(honestSec), 'h', honestStats[2], initialPoint)[1].toFixed(4);
    var sCrt1 = theoreticalProfits(a, g, 12.5, avg(selfishSec), 's', selfishStats[2], initialPoint)[1].toFixed(4);
    var lCrt1 = theoreticalProfits(a, g, 12.5, avg(leadSec), 'l', leadStats[2], initialPoint)[1].toFixed(4);
    var t2Crt1 = theoreticalProfits(a, g, 12.5, avg(t2Sec), 't2', t2Stats[2], initialPoint)[1].toFixed(4);
    var t3Crt1 = theoreticalProfits(a, g, 12.5, avg(t3Sec), 't3', t3Stats[2], initialPoint)[1].toFixed(4);
    var t4Crt1 = theoreticalProfits(a, g, 12.5, avg(t4Sec), 't4', t4Stats[2], initialPoint)[1].toFixed(4);
    var eCrt1 = theoreticalProfits(a, g, 12.5, avg(equalForkSec), 'e', equalForkStats[2], initialPoint)[1].toFixed(4);
    var hBadge = 0;
    var sBadge = (100 * sCrt1 / hCrt1 - 100) >= 0 ? 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') SELFISH strategy would be ' + (100 * sCrt1 / hCrt1 - 100).toFixed(1) + ' %' + ' MORE profitable than being HONEST.' : 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') SELFISH strategy would be ' + (100 - 100 * sCrt1 / hCrt1).toFixed(1) + ' %' + ' LESS profitable than being HONEST.';
    var lBadge = (100 * lCrt1 / hCrt1 - 100) >= 0 ? 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') LEAD strategy would be ' + (100 * lCrt1 / hCrt1 - 100).toFixed(1) + ' %' + ' MORE profitable than being HONEST.' : 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') LEAD strategy would be ' + (100 - 100 * lCrt1 / hCrt1).toFixed(1) + ' %' + ' LESS profitable than profitable being HONEST.';
    var t2Badge = (100 * t2Crt1 / hCrt1 - 100) >= 0 ? 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') 2-TRAIL strategy would be ' + (100 * t2Crt1 / hCrt1 - 100).toFixed(1) + ' %' + ' MORE profitable than being HONEST.' : 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') 2-TRAIL strategy would be ' + (100 - 100 * t2Crt1 / hCrt1).toFixed(1) + ' %' + ' LESS profitable than profitable being HONEST.';
    var t3Badge = (100 * t3Crt1 / hCrt1 - 100) >= 0 ? 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') 3-TRAIL strategy would be ' + (100 * t3Crt1 / hCrt1 - 100).toFixed(1) + ' %' + ' MORE profitable than being HONEST.' : 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') 3-TRAIL strategy would be ' + (100 - 100 * t3Crt1 / hCrt1).toFixed(1) + ' %' + ' LESS profitable than profitable being HONEST.';
    var t4Badge = (100 * t4Crt1 / hCrt1 - 100) >= 0 ? 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') 4-TRAIL strategy would be ' + (100 * t4Crt1 / hCrt1 - 100).toFixed(1) + ' %' + ' MORE profitable than being HONEST.' : 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') 4-TRAIL strategy would be ' + (100 - 100 * t4Crt1 / hCrt1).toFixed(1) + ' %' + ' LESS profitable than profitable being HONEST.';
    var eBadge = (100 * eCrt1 / hCrt1 - 100) >= 0 ? 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') EQUAL FORK strategy would be ' + (100 * eCrt1 / hCrt1 - 100).toFixed(1) + ' %' + ' MORE profitable than being HONEST.' : 'If (&alpha;,&gamma;) = (' + a + ',' + g + ') EQUAL FORK strategy would be ' + (100 - 100 * eCrt1 / hCrt1).toFixed(1) + ' %' + ' LESS profitable than being HONEST.';

    pureCellVlues =
            {
                hyp:honestStats[0], syp:selfishStats[0], lyp:leadStats[0], t2yp:t2Stats[0], t3yp:t3Stats[0], t4yp:t4Stats[0], eyp:equalForkStats[0],
                hop:honestStats[1], sop:selfishStats[1], lop:leadStats[1], t2op:t2Stats[1], t3op:t3Stats[1], t4op:t4Stats[1], eop:equalForkStats[1],
                htbp:honestStats[2], stbp:selfishStats[2], ltbp:leadStats[2], t2tbp:t2Stats[2], t3tbp:t3Stats[2], t4tbp:t4Stats[2], etbp:equalForkStats[2],
                hob:honestStats[3], sob:selfishStats[3], lob:leadStats[3], t2ob:t2Stats[3], t3ob:t3Stats[3], t4ob:t4Stats[3], eob:equalForkStats[3],
                htbm:honestStats[4], stbm:selfishStats[4], ltbm:leadStats[4], t2tbm:t2Stats[4], t3tbm:t3Stats[4], t4tbm:t4Stats[4], etbm:equalForkStats[4],
                hobp:honestStats[5], sobp:selfishStats[5], lobp:leadStats[5], t2obp:t2Stats[5], t3obp:t3Stats[5], t4obp:t4Stats[5], eobp:equalForkStats[5],
                hypp:honestStats[6], sypp:selfishStats[6], lypp:leadStats[6], t2ypp:t2Stats[6], t3ypp:t3Stats[6], t4ypp:t4Stats[6], eypp:equalForkStats[6],
                hopp:honestStats[7], sopp:selfishStats[7], lopp:leadStats[7], t2opp:t2Stats[7], t3opp:t3Stats[7], t4opp:t4Stats[7], eopp:equalForkStats[7],
                hyrh:a, syrh:a, lyrh:a, t2yrh:a, t3yrh:a, t4yrh:a, eyrh:a,
                hyah:honestSim[0], syah:selfishSim[0], lyah:leadSim[0], t2yah:t2Sim[0], t3yah:t3Sim[0], t4yah:t4Sim[0], eyah:equalForkSim[0],
                hypr:honestSim[1], sypr:selfishSim[1], lypr:leadSim[1], t2ypr:t2Sim[1], t3ypr:t3Sim[1], t4ypr:t4Sim[1], eypr:equalForkSim[1],
                hdc:honestDiff[0], sdc:selfishDiff[0], ldc:leadDiff[0], t2dc:t2Diff[0], t3dc:t3Diff[0], t4dc:t4Diff[0], edc:equalForkDiff[0],
                hdwc:honestDiff[1], sdwc:selfishDiff[1], ldwc:leadDiff[1], t2dwc:t2Diff[1], t3dwc:t3Diff[1], t4dwc:t4Diff[1], edwc:equalForkDiff[1],
                hacd:honestDuration, sacd:selfishDuration, lacd:leadDuration, t2acd:t2Duration, t3acd:t3Duration, t4acd:t4Duration, eacd:equalForkDuration,
                htah:honestTheory[0], stah:selfishTheory[0], ltah:leadTheory[0], t2tah:t2Theory[0], t3tah:t3Theory[0], t4tah:t4Theory[0], etah:equalForkTheory[0],
                htpr:honestTheory[1], stpr:selfishTheory[1], ltpr:leadTheory[1], t2tpr:t2Theory[1], t3tpr:t3Theory[1], t4tpr:t4Theory[1], etpr:equalForkTheory[1],
                hCrt1:hCrt1, sCrt1:sCrt1, lCrt1:lCrt1, t2Crt1:t2Crt1, t3Crt1:t3Crt1, t4Crt1:t4Crt1, eCrt1:eCrt1,
                hBadge:hBadge, sBadge:sBadge, lBadge:lBadge, t2Badge:t2Badge, t3Badge:t3Badge, t4Badge:t4Badge, eBadge:eBadge
            };
}

function table() {
    document.getElementById("hyp").innerHTML = pureCellVlues.hyp + ' Blocks';
    document.getElementById("syp").innerHTML = pureCellVlues.syp + ' Blocks';
    document.getElementById("lyp").innerHTML = pureCellVlues.lyp + ' Blocks';
    document.getElementById("t2yp").innerHTML = pureCellVlues.t2yp + ' Blocks';
    document.getElementById("t3yp").innerHTML = pureCellVlues.t3yp + ' Blocks';
    document.getElementById("t4yp").innerHTML = pureCellVlues.t4yp + ' Blocks';
    document.getElementById("eyp").innerHTML = pureCellVlues.eyp + ' Blocks';
    document.getElementById("hop").innerHTML = pureCellVlues.hop + ' Blocks';
    document.getElementById("sop").innerHTML = pureCellVlues.sop + ' Blocks';
    document.getElementById("lop").innerHTML = pureCellVlues.lop + ' Blocks';
    document.getElementById("t2op").innerHTML = pureCellVlues.t2op + ' Blocks';
    document.getElementById("t3op").innerHTML = pureCellVlues.t3op + ' Blocks';
    document.getElementById("t4op").innerHTML = pureCellVlues.t4op + ' Blocks';
    document.getElementById("eop").innerHTML = pureCellVlues.eop + ' Blocks';
    document.getElementById("htbp").innerHTML = pureCellVlues.htbp;
    document.getElementById("stbp").innerHTML = pureCellVlues.stbp;
    document.getElementById("ltbp").innerHTML = pureCellVlues.ltbp;
    document.getElementById("t2tbp").innerHTML = pureCellVlues.t2tbp;
    document.getElementById("t3tbp").innerHTML = pureCellVlues.t3tbp;
    document.getElementById("t4tbp").innerHTML = pureCellVlues.t4tbp;
    document.getElementById("etbp").innerHTML = pureCellVlues.etbp;
    document.getElementById("hob").innerHTML = pureCellVlues.hob;
    document.getElementById("sob").innerHTML = pureCellVlues.sob;
    document.getElementById("lob").innerHTML = pureCellVlues.lob;
    document.getElementById("t2ob").innerHTML = pureCellVlues.t2ob;
    document.getElementById("t3ob").innerHTML = pureCellVlues.t3ob;
    document.getElementById("t4ob").innerHTML = pureCellVlues.t4ob;
    document.getElementById("eob").innerHTML = pureCellVlues.eob;
    document.getElementById("htbm").innerHTML = pureCellVlues.htbm;
    document.getElementById("stbm").innerHTML = pureCellVlues.stbm;
    document.getElementById("ltbm").innerHTML = pureCellVlues.ltbm;
    document.getElementById("t2tbm").innerHTML = pureCellVlues.t2tbm;
    document.getElementById("t3tbm").innerHTML = pureCellVlues.t3tbm;
    document.getElementById("t4tbm").innerHTML = pureCellVlues.t4tbm;
    document.getElementById("etbm").innerHTML = pureCellVlues.etbm;
    document.getElementById("hobp").innerHTML = pureCellVlues.hobp + ' %';
    document.getElementById("sobp").innerHTML = pureCellVlues.sobp + ' %';
    document.getElementById("lobp").innerHTML = pureCellVlues.lobp + ' %';
    document.getElementById("t2obp").innerHTML = pureCellVlues.t2obp + ' %';
    document.getElementById("t3obp").innerHTML = pureCellVlues.t3obp + ' %';
    document.getElementById("t4obp").innerHTML = pureCellVlues.t4obp + ' %';
    document.getElementById("eobp").innerHTML = pureCellVlues.eobp + ' %';
    document.getElementById("hypp").innerHTML = pureCellVlues.hypp + ' %';
    document.getElementById("sypp").innerHTML = pureCellVlues.sypp + ' %';
    document.getElementById("lypp").innerHTML = pureCellVlues.lypp + ' %';
    document.getElementById("t2ypp").innerHTML = pureCellVlues.t2ypp + ' %';
    document.getElementById("t3ypp").innerHTML = pureCellVlues.t3ypp + ' %';
    document.getElementById("t4ypp").innerHTML = pureCellVlues.t4ypp + ' %';
    document.getElementById("eypp").innerHTML = pureCellVlues.eypp + ' %';
    document.getElementById("hopp").innerHTML = pureCellVlues.hopp + ' %';
    document.getElementById("sopp").innerHTML = pureCellVlues.sopp + ' %';
    document.getElementById("lopp").innerHTML = pureCellVlues.lopp + ' %';
    document.getElementById("t2opp").innerHTML = pureCellVlues.t2opp + ' %';
    document.getElementById("t3opp").innerHTML = pureCellVlues.t3opp + ' %';
    document.getElementById("t4opp").innerHTML = pureCellVlues.t4opp + ' %';
    document.getElementById("eopp").innerHTML = pureCellVlues.eopp + ' %';
    document.getElementById("hyrh").innerHTML = (100 * pureCellVlues.hyrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("syrh").innerHTML = (100 * pureCellVlues.syrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("lyrh").innerHTML = (100 * pureCellVlues.lyrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t2yrh").innerHTML = (100 * pureCellVlues.t2yrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t3yrh").innerHTML = (100 * pureCellVlues.t3yrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t4yrh").innerHTML = (100 * pureCellVlues.t4yrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("eyrh").innerHTML = (100 * pureCellVlues.eyrh).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("hyah").innerHTML = (100 * pureCellVlues.hyah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("syah").innerHTML = (100 * pureCellVlues.syah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("lyah").innerHTML = (100 * pureCellVlues.lyah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t2yah").innerHTML = (100 * pureCellVlues.t2yah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t3yah").innerHTML = (100 * pureCellVlues.t3yah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t4yah").innerHTML = (100 * pureCellVlues.t4yah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("eyah").innerHTML = (100 * pureCellVlues.eyah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("hypr").innerHTML = '0' + ' %' + '<br>' + 'More Than Being Honest';
    document.getElementById("sypr").innerHTML = (100 * pureCellVlues.sypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.sypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.sypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("lypr").innerHTML = (100 * pureCellVlues.lypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.lypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.lypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t2ypr").innerHTML = (100 * pureCellVlues.t2ypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.t2ypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.t2ypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t3ypr").innerHTML = (100 * pureCellVlues.t3ypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.t3ypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.t3ypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t4ypr").innerHTML = (100 * pureCellVlues.t4ypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.t4ypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.t4ypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("eypr").innerHTML = (100 * pureCellVlues.eypr / pureCellVlues.hypr - 100) >= 0 ? (100 * pureCellVlues.eypr / pureCellVlues.hypr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.eypr / pureCellVlues.hypr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("hdc").innerHTML = pureCellVlues.hdc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.hdc + '<br>' + 'Times';
    document.getElementById("sdc").innerHTML = pureCellVlues.sdc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.sdc + '<br>' + 'Times';
    document.getElementById("ldc").innerHTML = pureCellVlues.ldc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.ldc + '<br>' + 'Times';
    document.getElementById("t2dc").innerHTML = pureCellVlues.t2dc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.t2dc + '<br>' + 'Times';
    document.getElementById("t3dc").innerHTML = pureCellVlues.t3dc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.t3dc + '<br>' + 'Times';
    document.getElementById("t4dc").innerHTML = pureCellVlues.t4dc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.t4dc + '<br>' + 'Times';
    document.getElementById("edc").innerHTML = pureCellVlues.edc === 1 ? 1 + '<br>' + 'Time' : pureCellVlues.edc + '<br>' + 'Times';
    document.getElementById("hdwc").innerHTML = (pureCellVlues.hdwc * 100).toFixed(2) + ' %';
    document.getElementById("sdwc").innerHTML = (pureCellVlues.sdwc * 100).toFixed(2) + ' %';
    document.getElementById("ldwc").innerHTML = (pureCellVlues.ldwc * 100).toFixed(2) + ' %';
    document.getElementById("t2dwc").innerHTML = (pureCellVlues.t2dwc * 100).toFixed(2) + ' %';
    document.getElementById("t3dwc").innerHTML = (pureCellVlues.t3dwc * 100).toFixed(2) + ' %';
    document.getElementById("t4dwc").innerHTML = (pureCellVlues.t4dwc * 100).toFixed(2) + ' %';
    document.getElementById("edwc").innerHTML = (pureCellVlues.edwc * 100).toFixed(2) + ' %';
    document.getElementById("hacd").innerHTML = pureCellVlues.hacd;
    document.getElementById("sacd").innerHTML = pureCellVlues.sacd;
    document.getElementById("lacd").innerHTML = pureCellVlues.lacd;
    document.getElementById("t2acd").innerHTML = pureCellVlues.t2acd;
    document.getElementById("t3acd").innerHTML = pureCellVlues.t3acd;
    document.getElementById("t4acd").innerHTML = pureCellVlues.t4acd;
    document.getElementById("eacd").innerHTML = pureCellVlues.eacd;
    document.getElementById("htah").innerHTML = (100 * pureCellVlues.htah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("stah").innerHTML = (100 * pureCellVlues.stah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("ltah").innerHTML = (100 * pureCellVlues.ltah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t2tah").innerHTML = (100 * pureCellVlues.t2tah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t3tah").innerHTML = (100 * pureCellVlues.t3tah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("t4tah").innerHTML = (100 * pureCellVlues.t4tah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("etah").innerHTML = (100 * pureCellVlues.etah).toFixed(1) + ' %' + '<br>' + 'of the pool';
    document.getElementById("htpr").innerHTML = '0' + ' %' + '<br>' + 'More Than Being Honest';
    document.getElementById("stpr").innerHTML = (100 * pureCellVlues.stpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.stpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.stpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("ltpr").innerHTML = (100 * pureCellVlues.ltpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.ltpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.ltpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t2tpr").innerHTML = (100 * pureCellVlues.t2tpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.t2tpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.t2tpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t3tpr").innerHTML = (100 * pureCellVlues.t3tpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.t3tpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.t3tpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("t4tpr").innerHTML = (100 * pureCellVlues.t4tpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.t4tpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.t4tpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
    document.getElementById("etpr").innerHTML = (100 * pureCellVlues.etpr / pureCellVlues.htpr - 100) >= 0 ? (100 * pureCellVlues.etpr / pureCellVlues.htpr - 100).toFixed(1) + ' %' + '<br>' + 'More Than Being Honest' : (100 - 100 * pureCellVlues.etpr / pureCellVlues.htpr).toFixed(1) + ' %' + '<br>' + 'Less Than Being Honest';
}

function profitabilityChart(){
    var data = {
        labels: ["Honest", "Selfish", "Lead", "2-Trail", "3-Trail", "4-Trail", "Equal Fork"],
        datasets: [{
                label: "Profitability Ratio",
                backgroundColor: "#f04836",
                borderColor: "#f04836",
                borderWidth: 1,
                hoverBackgroundColor: "white",
                hoverBorderColor: "#f04836",
                data: [pureCellVlues.hCrt1, pureCellVlues.sCrt1, pureCellVlues.lCrt1, pureCellVlues.t2Crt1, pureCellVlues.t3Crt1, pureCellVlues.t4Crt1, pureCellVlues.eCrt1]
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
    if (window.crt !== undefined)
    {
        crt.destroy();
    }
    crt = Chart.Bar('chart1', {
        options: option,
        data: data
    });
}
function drawBadge() {
        badge1.style.opacity = '1';
        badge2.style.opacity = '1';
        document.getElementById("sBadge").innerHTML = pureCellVlues.sdc < 1 ? pureCellVlues.sBadge + ' (Difficulty didn\'t changed)' : pureCellVlues.sBadge + ' ( Difficulty changed)';
        document.getElementById("lBadge").innerHTML = pureCellVlues.ldc < 1 ? pureCellVlues.lBadge + ' (Difficulty didn\'t changed)' : pureCellVlues.lBadge + ' ( Difficulty changed)';
        document.getElementById("t2Badge").innerHTML = pureCellVlues.t2dc < 1 ? pureCellVlues.t2Badge + ' (Difficulty didn\'t changed)' : pureCellVlues.t2Badge + ' ( Difficulty changed)';
        document.getElementById("t3Badge").innerHTML = pureCellVlues.t3dc < 1 ? pureCellVlues.t3Badge + ' (Difficulty didn\'t changed)' : pureCellVlues.t3Badge + ' ( Difficulty changed)';
        document.getElementById("t4Badge").innerHTML = pureCellVlues.t4dc < 1 ? pureCellVlues.t4Badge + ' (Difficulty didn\'t changed)' : pureCellVlues.t4Badge + ' ( Difficulty changed)';
        document.getElementById("eBadge").innerHTML = pureCellVlues.edc < 1 ? pureCellVlues.eBadge + ' (Difficulty didn\'t changed)' : pureCellVlues.eBadge + ' ( Difficulty changed)';
}
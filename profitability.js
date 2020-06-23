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
        case 't2': // 2-Trail Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 't3': // 3-Trail Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) : (youPublished / totalPublished);
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (youPublished / totalMined) * b / t : (youPublished / totalPublished) * b / t;
            break;
        case 't4': // 4-Trail Mining Strategy
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
    a = parseFloat(a);
    var q = parseFloat(a); 
    g = parseFloat(g);
    b = parseFloat(b);
    t = parseFloat(t);
    switch (strategy) {
        case 's': // Selfish Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? q - (1 - g) * (((1 - q) * (1 - q) * q * (1 - q - q)) ./ (((1 + (1 - q) * q) * (1 - q - q) + (1 - q) * q))) :
                    (q - ((1 - g) * (1 - q) * (1 - q) * q * (1 - q - q)) ./ ((1 + (1 - q) * q) * (1 - q - q) + (1 - q) * q)) * ((1 - q - q + (1 - q) * q * (1 - q - q) + (1 - q) * q) ./ ((1 - q) * (1 - q) * q + 1 - q - q));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a - (1 - g) * (((1 - a) * (1 - a) * a* (1 - a - a)) / (((1 + (1 - a) * a) * (1 - a - a)+(1 - a) * a)))) * b / t : 
                    ((a - ((1 - g) * (1 - a) * (1 - a) * a * (1 - a - a)) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * ((1 - a - a + (1 - a) * a * (1 - a - a) + (1 - a) * a) / ((1 - a) * (1 - a) * a + 1 - a - a))) * b / t;
            break;
        case 'l': // Lead Mining Strategy
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? q - (((1 - q) * q * (1 - q - q) * (1 - g)) / g) * ((1 - (1 - q) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - q) * q)))) / (1 - q + (1 - q) * q - q)) :
                    q * ((1 - q + (1 - q) * q - q * q) / (1 - q + (1 - q) * q - q)) - (((1 - q) * q * (1 - q - q) * (1 - g)) / (g)) * ((1 - (1 - q) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - q) * q)))) / (1 - q + (1 - q) * q - q));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a - (((1 - a) * a * (1 - a - a) * (1 - g)) / g) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a))) * b / t :
                    (a * ((1 - a + (1 - a) * a - a * a) / (1 - a + (1 - a) * a - a)) - (((1 - a) * a * (1 - a - a) * (1 - g)) / (g)) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a))) * b / t;
            break;
        case 't2': // 2-Trail Mining Strategy
            j = 2;
            if (a === 0.5) a = 0.49999;
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (1 + (1 - g) * (1 - a) * a / ((1 - a) + (1 - a) * a - a * a) * (j + 1) * (((1 - (a / (1 - a)) ** 2) / (1 - (a / (1 - a)))) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 2 / (j + 1))):
                    (a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (((1 - a) + (1 - a) * a - a) / ((1 - a) + (1 - a) * a - a * a) + ((1 - g) * (1 - a) * a) / ((1 - a) + (1 - a) * a - a * a) * (j + (a / (1 - a))) * (1 / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 1 / (j + (a / (1 - a)))));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? ((a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (1 + (1 - g) * (1 - a) * a / ((1 - a) + (1 - a) * a - a * a) * (j + 1) * (((1 - (a / (1 - a)) ** 2) / (1 - (a / (1 - a)))) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 2 / (j + 1)))) * b / t :
                    ((a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (((1 - a) + (1 - a) * a - a) / ((1 - a) + (1 - a) * a - a * a) + ((1 - g) * (1 - a) * a) / ((1 - a) + (1 - a) * a - a * a) * (j + (a / (1 - a))) * (1 / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 1 / (j + (a / (1 - a)))))) * b / t;
            break;
        case 't3': // 3-Trail Mining Strategy
            j = 3;
            if (a === 0.5) a = 0.49999;
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (1 + (1 - g) * (1 - a) * a / ((1 - a) + (1 - a) * a - a * a) * (j + 1) * (((1 - (a / (1 - a)) ** 2) / (1 - (a / (1 - a)))) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 2 / (j + 1))):
                    (a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (((1 - a) + (1 - a) * a - a) / ((1 - a) + (1 - a) * a - a * a) + ((1 - g) * (1 - a) * a) / ((1 - a) + (1 - a) * a - a * a) * (j + (a / (1 - a))) * (1 / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 1 / (j + (a / (1 - a)))));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? ((a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (1 + (1 - g) * (1 - a) * a / ((1 - a) + (1 - a) * a - a * a) * (j + 1) * (((1 - (a / (1 - a)) ** 2) / (1 - (a / (1 - a)))) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 2 / (j + 1)))) * b / t :
                    ((a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (((1 - a) + (1 - a) * a - a) / ((1 - a) + (1 - a) * a - a * a) + ((1 - g) * (1 - a) * a) / ((1 - a) + (1 - a) * a - a * a) * (j + (a / (1 - a))) * (1 / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 1 / (j + (a / (1 - a)))))) * b / t;
            break;
        case 't4': // 4-Trail Mining Strategy
            j = 4;
            if (a === 0.5) a = 0.49999;
            var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (1 + (1 - g) * (1 - a) * a / ((1 - a) + (1 - a) * a - a * a) * (j + 1) * (((1 - (a / (1 - a)) ** 2) / (1 - (a / (1 - a)))) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 2 / (j + 1))):
                    (a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (((1 - a) + (1 - a) * a - a) / ((1 - a) + (1 - a) * a - a * a) + ((1 - g) * (1 - a) * a) / ((1 - a) + (1 - a) * a - a * a) * (j + (a / (1 - a))) * (1 / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 1 / (j + (a / (1 - a)))));
            var revenueRatio = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? ((a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (1 + (1 - g) * (1 - a) * a / ((1 - a) + (1 - a) * a - a * a) * (j + 1) * (((1 - (a / (1 - a)) ** 2) / (1 - (a / (1 - a)))) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 2 / (j + 1)))) * b / t :
                    ((a + (1 - g) * (1 - a) * a * ((1 - a) - a) / ((1 - a) + (1 - a) * a - a * a * (1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) * (((1 - (a / (1 - a)) ** (j - 1)) / (1 - (a / (1 - a))) + 1 / (1 - a) * ((1 - j * (a / (1 - a)) ** (j - 1) + j * (a / (1 - a)) ** (j + 1) - (a / (1 - a)) ** (2 * j)) / (1 - (a / (1 - a))) ** 3) / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a))))) * (a / (1 - a)) * (a / (1 - a)) - 2 / ((1 - 4 * (1 - g) * (1 - a) * a) ** 0.5 + (1 - a) - a))) / (((1 - a) + (1 - a) * a - a) / ((1 - a) + (1 - a) * a - a * a) + ((1 - g) * (1 - a) * a) / ((1 - a) + (1 - a) * a - a * a) * (j + (a / (1 - a))) * (1 / ((1 - (a / (1 - a)) ** (j + 1)) / (1 - (a / (1 - a)))) - 1 / (j + (a / (1 - a)))))) * b / t;
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
    var timeInSeconds = 60 * (totalPublished) * 10;
    var years = Math.floor(timeInSeconds / 31449600);
    var weeks = Math.floor(timeInSeconds % 31449600 / 604800);
    var days = Math.floor(timeInSeconds % 31449600 % 604800 / 86400);
    var hours = Math.floor(timeInSeconds % 31449600 % 604800 % 86400 / 3600);
    var minutes = Math.floor(timeInSeconds % 31449600 % 604800 % 86400 % 3600 / 60);
    var seconds = Math.round(timeInSeconds % 31449600 % 604800 % 86400 % 3600 % 60);
    return years + "Y " + weeks + "W " + days + "D " + hours + "H " + minutes + "M " + seconds + "S";
}
function secTimer(initialPoint, totalPublished, totalMined) {
   var timeInSeconds = 60 * (totalPublished) * 10;
    return timeInSeconds;
}

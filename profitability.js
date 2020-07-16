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

function probability(A, L) {
	return (1 - A * Math.pow(L, A - 1) + A * Math.pow(L, A + 1) - Math.pow(L, 2 * A)) / (Math.pow(1 - L, 3));
}

function brackets(A, L) {
	return (1 - Math.pow(L, A)) / (1 - L);
}

function theoreticalProfits(a, g, b, t, strategy, totalPublished, initialPoint) {
	if (a > 0.49) a = 0.49;
	var L = a / (1 - a);
	var p = 1 - a;
	var j;
	// for defining initialPoint later outside this function you have to use: var initialPoint = Math.floor(Math.random() * 2016) + 1;  Returns a random integer between 1 and 2016 (1 and 2016 are included).
	a = parseFloat(a);
	g = parseFloat(g);
	b = parseFloat(b);
	t = parseFloat(t);
	switch (strategy) {
		case 's': // Selfish Mining Strategy
			apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? a - (1 - g) * (((1 - a) * (1 - a) * a * (1 - a - a)) / (((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a))) :
				(a - ((1 - g) * (1 - a) * (1 - a) * a * (1 - a - a)) / ((1 + (1 - a) * a) * (1 - a - a) + (1 - a) * a)) * ((1 - a - a + (1 - a) * a * (1 - a - a) + (1 - a) * a) / ((1 - a) * (1 - a) * a + 1 - a - a));

			var revenueRatio = apparentHashrate * b / t;
			break;
		case 'l': // Lead Mining Strategy
			apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? a - (((1 - a) * a * (1 - a - a) * (1 - g)) / g) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a)) :
				a * ((1 - a + (1 - a) * a - a * a) / (1 - a + (1 - a) * a - a)) - (((1 - a) * a * (1 - a - a) * (1 - g)) / (g)) * ((1 - (1 - a) * (1 - g) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a)))) / (1 - a + (1 - a) * a - a));

			revenueRatio = apparentHashrate * b / t;
			break;
		case 't2': // 2-Trail Mining Strategy
			j = 2;
			apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a + ((1 - g) * p * a * (p - a) / ((p + p * a - a * a) * brackets(j + 1, L))) * ((brackets(j - 1, L) + 1 / p * probability(j, L) / brackets(j + 1, L)) * L * L - (2 / (Math.sqrt(1 - 4 * (1 - g) * p * a) + p - a)))) / (1 + ((1 - g) * p * a / (p + p * a - a * a)) * (j + 1) * (brackets(2, L) / brackets(j + 1, L) - 2 / (j + 1))) : (a + ((1 - g) * p * a * (p - a)) / ((p + p * a - a * a) * brackets(j + 1, L)) * ((brackets(j - 1, L) + (1) / (p) * (probability(j, L)) / (brackets(j + 1, L))) * L * L - (2) / (Math.sqrt(1 - 4 * (1 - g) * p * a) + p - a))) / ((p + p * a - a) / (p + p * a - a * a) + ((1 - g) * p * a) / (p + p * a - a * a) * (j + L) * ((1) / (brackets(j + 1, L)) - (1) / (j + L)));

			revenueRatio = apparentHashrate * b / t;
			break;
		case 't3': // 3-Trail Mining Strategy
			j = 3;
			var apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a + ((1 - g) * p * a * (p - a) / ((p + p * a - a * a) * brackets(j + 1, L))) * ((brackets(j - 1, L) + 1 / p * probability(j, L) / brackets(j + 1, L)) * L * L - (2 / (Math.sqrt(1 - 4 * (1 - g) * p * a) + p - a)))) / (1 + ((1 - g) * p * a / (p + p * a - a * a)) * (j + 1) * (brackets(2, L) / brackets(j + 1, L) - 2 / (j + 1))) : (a + ((1 - g) * p * a * (p - a)) / ((p + p * a - a * a) * brackets(j + 1, L)) * ((brackets(j - 1, L) + (1) / (p) * (probability(j, L)) / (brackets(j + 1, L))) * L * L - (2) / (Math.sqrt(1 - 4 * (1 - g) * p * a) + p - a))) / ((p + p * a - a) / (p + p * a - a * a) + ((1 - g) * p * a) / (p + p * a - a * a) * (j + L) * ((1) / (brackets(j + 1, L)) - (1) / (j + L)));

			revenueRatio = apparentHashrate * b / t;
			break;
		case 't4': // 4-Trail Mining Strategy
			j = 4;
			apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? (a + ((1 - g) * p * a * (p - a) / ((p + p * a - a * a) * brackets(j + 1, L))) * ((brackets(j - 1, L) + 1 / p * probability(j, L) / brackets(j + 1, L)) * L * L - (2 / (Math.sqrt(1 - 4 * (1 - g) * p * a) + p - a)))) / (1 + ((1 - g) * p * a / (p + p * a - a * a)) * (j + 1) * (brackets(2, L) / brackets(j + 1, L) - 2 / (j + 1))) : (a + ((1 - g) * p * a * (p - a)) / ((p + p * a - a * a) * brackets(j + 1, L)) * ((brackets(j - 1, L) + (1) / (p) * (probability(j, L)) / (brackets(j + 1, L))) * L * L - (2) / (Math.sqrt(1 - 4 * (1 - g) * p * a) + p - a))) / ((p + p * a - a) / (p + p * a - a * a) + ((1 - g) * p * a) / (p + p * a - a * a) * (j + L) * ((1) / (brackets(j + 1, L)) - (1) / (j + L)));

			revenueRatio = apparentHashrate * b / t;
			break;
		case 'e': // Equal Fork Mining Strategy
			apparentHashrate = Math.floor((totalPublished + initialPoint) / 2016) < 1 ? a - ((1 - g) / g) * (p - a) * (1 - p * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * p * a)))) :
				a / (1 - a) - ((1 - g) * (1 - a - a) / (g * (1 - a))) * (1 - (1 - a) * (2 / (1 + Math.sqrt(1 - 4 * (1 - g) * (1 - a) * a))));

			revenueRatio = apparentHashrate * b / t;
			break;
		case 'h': // Honest Mining Strategy
			apparentHashrate = a;
			revenueRatio = a * b / t;
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

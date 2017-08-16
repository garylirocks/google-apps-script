/**
 * Given a positive integer number 'count', return an array of numbers between 1 to 'count' in random order
 *
 * @return an array of randomly ordered integers
 */
function _randomSequence(count) {
    var sources = [];
    var results = Array();
    var i;

    for (var i = 0; i < count; i++) {
        sources[i] = i + 1;
    }

    while (sources.length) {
        var randomIndex = Math.floor(Math.random() * sources.length);

        results.push(sources[randomIndex]);
        sources.splice(randomIndex, 1);
    }

    return results;
}

/**
 * Group rows to random groups according to their content, each group has at most 4 rows
 * example:
 *
 * > groupMe(['A','A','A','A','A','A','B','B','B','B','B','B','B','B','B','B','C','C','C','C','C','C','C','C','C']);
 * > [1,1,2,1,2,1,1,2,3,2,1,1,2,1,3,2,1,3,1,2,2,1,2,2,1]
 *
 * @param {levels} a range within a column
 * @return an array of group numbers
 * @customfunction
 */
function groupMe(levels) {
    var groupSize = 4;
    var levelCounts = {};
    var result = [];
    var i = 0;

    for (i = 0; i < levels.length; i++) {
        var l = levels[i];
        if (String(l).trim() === '') {
            continue;
        }

        if (levelCounts[l] === undefined) {
            levelCounts[l] = {
                'total': 1
            };
        } else {
            levelCounts[l]['total'] += 1;
        }
    }

    for (var level in levelCounts) {
        if (levelCounts.hasOwnProperty(level)) {
            levelCounts[level]['current'] = 0;
            levelCounts[level]['draws'] = _randomSequence(levelCounts[level]['total']);
        }
    }

    for (i = 0; i < levels.length; i++) {
        var l = levels[i];
        if (String(l).trim() === '') {
            continue;
        }
        var groupNumber = Math.ceil( levelCounts[l]['draws'][levelCounts[l]['current']] / groupSize );
        result[i] = groupNumber;
        levelCounts[l]['current'] += 1;
    }

    return result;
}

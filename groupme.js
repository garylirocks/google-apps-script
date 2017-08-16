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
 * > ['A1','A1','A2','A1','A2','A1','B1','B2','B3','B2','B1','B1','B2','B1','B3','B2','C1','C3','C1','C2','C2','C1','C2','C2','C1']
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
        var e = levels[i];
        if (levelCounts[e] === undefined) {
            levelCounts[e] = {
                'total': 1
            };
        } else {
            levelCounts[e]['total'] += 1;
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
        var groupNumber = Math.ceil( levelCounts[l]['draws'][levelCounts[l]['current']] / groupSize );
        result[i] = l + groupNumber;
        levelCounts[l]['current'] += 1;
    }

    return result;
}

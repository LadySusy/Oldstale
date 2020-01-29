
;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

function each(array, callback) {
    var i;
    for (i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

function objectKeys(obj) {
    if (Object.keys) {
        return Object.keys(obj);
    } else {
        // IE8
        var res = [], i;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                res.push(i);
            }
        }
        return res;
    }
}

// Pick the first defined of two or three arguments.

function defineCommonLocaleTests(locale, options) {
    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

    test('meridiem invariant', function (assert) {
        var h, m, t1, t2;
        for (h = 0; h < 24; ++h) {
            for (m = 0; m < 60; m += 15) {
                t1 = moment.utc([2000, 0, 1, h, m]);
                t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                        'meridiem at ' + t1.format('HH:mm'));
            }
        }
    });

    test('date format correctness', function (assert) {
        var data, tokens;
        data = moment.localeData()._longDateFormat;
        tokens = objectKeys(data);
        each(tokens, function (srchToken) {
            // Check each format string to make sure it does not contain any
            // tokens that need to be expanded.
            each(tokens, function (baseToken) {
                // strip escaped sequences
                var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                assert.equal(false, !!~format.indexOf(srchToken),
                        'contains ' + srchToken + ' in ' + baseToken);
            });
        });
    });

    test('month parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr') {
            // I can't fix it :(
            expect(0);
            return;
        }
        function tester(format) {
            var r;
            r = moment(m.format(format), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower strict');
        }

        for (i = 0; i < 12; ++i) {
            m = moment([2015, i, 15, 18]);
            tester('MMM');
            tester('MMM.');
            tester('MMMM');
            tester('MMMM.');
        }
    });

    test('weekday parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr' || locale === 'az' || locale === 'ro') {
            // tr, az: There is a lower-case letter (ı), that converted to
            // upper then lower changes to i
            // ro: there is the letter ț which behaves weird under IE8
            expect(0);
            return;
        }
        function tester(format) {
            var r, baseMsg = 'weekday ' + m.weekday() + ' fmt ' + format + ' ' + m.toISOString();
            r = moment(m.format(format), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower strict');
        }

        for (i = 0; i < 7; ++i) {
            m = moment.utc([2015, 0, i + 1, 18]);
            tester('dd');
            tester('ddd');
            tester('dddd');
        }
    });
}

function setupDeprecationHandler(test, moment$$1, scope) {
    test._expectedDeprecations = null;
    test._observedDeprecations = null;
    test._oldSupress = moment$$1.suppressDeprecationWarnings;
    moment$$1.suppressDeprecationWarnings = true;
    test.expectedDeprecations = function () {
        test._expectedDeprecations = arguments;
        test._observedDeprecations = [];
    };
    moment$$1.deprecationHandler = function (name, msg) {
        var deprecationId = matchedDeprecation(name, msg, test._expectedDeprecations);
        if (deprecationId === -1) {
            throw new Error('Unexpected deprecation thrown name=' +
                    name + ' msg=' + msg);
        }
        test._observedDeprecations[deprecationId] = 1;
    };
}

function teardownDeprecationHandler(test, moment$$1, scope) {
    moment$$1.suppressDeprecationWarnings = test._oldSupress;

    if (test._expectedDeprecations != null) {
        var missedDeprecations = [];
        each(test._expectedDeprecations, function (deprecationPattern, id) {
            if (test._observedDeprecations[id] !== 1) {
                missedDeprecations.push(deprecationPattern);
            }
        });
        if (missedDeprecations.length !== 0) {
            throw new Error('Expected deprecation warnings did not happen: ' +
                    missedDeprecations.join(' '));
        }
    }
}

function matchedDeprecation(name, msg, deprecations) {
    if (deprecations == null) {
        return -1;
    }
    for (var i = 0; i < deprecations.length; ++i) {
        if (name != null && name === deprecations[i]) {
            return i;
        }
        if (msg != null && msg.substring(0, deprecations[i].length) === deprecations[i]) {
            return i;
        }
    }
    return -1;
}

/*global QUnit:false*/

var test = QUnit.test;

var expect = QUnit.expect;



function localeModule (name, lifecycle) {
    QUnit.module('locale:' + name, {
        setup : function () {
            moment.locale(name);
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        teardown : function () {
            moment.locale('en');
            teardownDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
    defineCommonLocaleTests(name, -1, -1);
}

localeModule('af');

test('parse', function (assert) {
    var tests = 'Januarie Jan_Februarie Feb_Maart Mrt_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }
    for (i = 0; i < 12; i++) {
        tests[i] = tests[i].split(' ');
        equalTest(tests[i][0], 'MMM', i);
        equalTest(tests[i][1], 'MMM', i);
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
        equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sondag, Februarie 14de 2010, 3:25:50 nm'],
            ['ddd, hA',                            'Son, 3NM'],
            ['M Mo MM MMMM MMM',                   '2 2de 02 Februarie Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14de 14'],
            ['d do dddd ddd dd',                   '0 0de Sondag Son So'],
            ['DDD DDDo DDDD',                      '45 45ste 045'],
            ['w wo ww',                            '6 6de 06'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'nm NM'],
            ['[the] DDDo [day of the year]',       'the 45ste day of the year'],
            ['LT',                                 '15:25'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 Februarie 2010'],
            ['LLL',                                '14 Februarie 2010 15:25'],
            ['LLLL',                               'Sondag, 14 Februarie 2010 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 Feb 2010'],
            ['lll',                                '14 Feb 2010 15:25'],
            ['llll',                               'Son, 14 Feb 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ste', '1ste');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2de', '2de');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3de', '3de');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4de', '4de');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5de', '5de');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6de', '6de');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7de', '7de');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8ste', '8ste');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9de', '9de');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10de', '10de');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11de', '11de');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12de', '12de');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13de', '13de');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14de', '14de');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15de', '15de');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16de', '16de');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17de', '17de');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18de', '18de');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19de', '19de');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20ste', '20ste');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ste', '21ste');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22ste', '22ste');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23ste', '23ste');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ste', '24ste');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ste', '25ste');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ste', '26ste');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ste', '27ste');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ste', '28ste');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ste', '29ste');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ste', '30ste');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ste', '31ste');
});

test('format month', function (assert) {
    var expected = 'Januarie Jan_Februarie Feb_Maart Mrt_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'Sondag Son So_Maandag Maa Ma_Dinsdag Din Di_Woensdag Woe Wo_Donderdag Don Do_Vrydag Vry Vr_Saterdag Sat Sa'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '\'n paar sekondes', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '\'n minuut',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '\'n minuut',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minute',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minute',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '\'n uur',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '\'n uur',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ure',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ure',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ure',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '\'n dag',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '\'n dag',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dae',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '\'n dag',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dae',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dae',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '\'n maand',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '\'n maand',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '\'n maand',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 maande',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 maande',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 maande',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '\'n maand',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 maande',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '\'n jaar',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 jaar',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '\'n jaar',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 jaar',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'oor \'n paar sekondes',  'prefix');
    assert.equal(moment(0).from(30000), '\'n paar sekondes gelede', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), '\'n paar sekondes gelede',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'oor \'n paar sekondes', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'oor 5 dae', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Vandag om 12:00',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Vandag om 12:25',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Vandag om 13:00',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Môre om 12:00',       'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Vandag om 11:00',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Gister om 12:00',     'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52ste', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1ste', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1ste', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),    '2 02 2de', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),    '2 02 2de', 'Jan 15 2012 should be week 2');
});

})));


;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

function each(array, callback) {
    var i;
    for (i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

function objectKeys(obj) {
    if (Object.keys) {
        return Object.keys(obj);
    } else {
        // IE8
        var res = [], i;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                res.push(i);
            }
        }
        return res;
    }
}

// Pick the first defined of two or three arguments.

function defineCommonLocaleTests(locale, options) {
    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

    test('meridiem invariant', function (assert) {
        var h, m, t1, t2;
        for (h = 0; h < 24; ++h) {
            for (m = 0; m < 60; m += 15) {
                t1 = moment.utc([2000, 0, 1, h, m]);
                t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                        'meridiem at ' + t1.format('HH:mm'));
            }
        }
    });

    test('date format correctness', function (assert) {
        var data, tokens;
        data = moment.localeData()._longDateFormat;
        tokens = objectKeys(data);
        each(tokens, function (srchToken) {
            // Check each format string to make sure it does not contain any
            // tokens that need to be expanded.
            each(tokens, function (baseToken) {
                // strip escaped sequences
                var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                assert.equal(false, !!~format.indexOf(srchToken),
                        'contains ' + srchToken + ' in ' + baseToken);
            });
        });
    });

    test('month parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr') {
            // I can't fix it :(
            expect(0);
            return;
        }
        function tester(format) {
            var r;
            r = moment(m.format(format), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower strict');
        }

        for (i = 0; i < 12; ++i) {
            m = moment([2015, i, 15, 18]);
            tester('MMM');
            tester('MMM.');
            tester('MMMM');
            tester('MMMM.');
        }
    });

    test('weekday parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr' || locale === 'az' || locale === 'ro') {
            // tr, az: There is a lower-case letter (ı), that converted to
            // upper then lower changes to i
            // ro: there is the letter ț which behaves weird under IE8
            expect(0);
            return;
        }
        function tester(format) {
            var r, baseMsg = 'weekday ' + m.weekday() + ' fmt ' + format + ' ' + m.toISOString();
            r = moment(m.format(format), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower strict');
        }

        for (i = 0; i < 7; ++i) {
            m = moment.utc([2015, 0, i + 1, 18]);
            tester('dd');
            tester('ddd');
            tester('dddd');
        }
    });
}

function setupDeprecationHandler(test, moment$$1, scope) {
    test._expectedDeprecations = null;
    test._observedDeprecations = null;
    test._oldSupress = moment$$1.suppressDeprecationWarnings;
    moment$$1.suppressDeprecationWarnings = true;
    test.expectedDeprecations = function () {
        test._expectedDeprecations = arguments;
        test._observedDeprecations = [];
    };
    moment$$1.deprecationHandler = function (name, msg) {
        var deprecationId = matchedDeprecation(name, msg, test._expectedDeprecations);
        if (deprecationId === -1) {
            throw new Error('Unexpected deprecation thrown name=' +
                    name + ' msg=' + msg);
        }
        test._observedDeprecations[deprecationId] = 1;
    };
}

function teardownDeprecationHandler(test, moment$$1, scope) {
    moment$$1.suppressDeprecationWarnings = test._oldSupress;

    if (test._expectedDeprecations != null) {
        var missedDeprecations = [];
        each(test._expectedDeprecations, function (deprecationPattern, id) {
            if (test._observedDeprecations[id] !== 1) {
                missedDeprecations.push(deprecationPattern);
            }
        });
        if (missedDeprecations.length !== 0) {
            throw new Error('Expected deprecation warnings did not happen: ' +
                    missedDeprecations.join(' '));
        }
    }
}

function matchedDeprecation(name, msg, deprecations) {
    if (deprecations == null) {
        return -1;
    }
    for (var i = 0; i < deprecations.length; ++i) {
        if (name != null && name === deprecations[i]) {
            return i;
        }
        if (msg != null && msg.substring(0, deprecations[i].length) === deprecations[i]) {
            return i;
        }
    }
    return -1;
}

/*global QUnit:false*/

var test = QUnit.test;

var expect = QUnit.expect;



function localeModule (name, lifecycle) {
    QUnit.module('locale:' + name, {
        setup : function () {
            moment.locale(name);
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        teardown : function () {
            moment.locale('en');
            teardownDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
    defineCommonLocaleTests(name, -1, -1);
}

localeModule('ar-dz');

test('parse', function (assert) {
    var tests = 'جانفي:جانفي_فيفري:فيفري_مارس:مارس_أفريل:أفريل_ماي:ماي_جوان:جوان_جويلية:جويلية_أوت:أوت_سبتمبر:سبتمبر_أكتوبر:أكتوبر_نوفمبر:نوفمبر_ديسمبر:ديسمبر'.split('_'), i;
    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }
    for (i = 0; i < 12; i++) {
        tests[i] = tests[i].split(':');
        equalTest(tests[i][0], 'MMM', i);
        equalTest(tests[i][1], 'MMM', i);
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
        equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'الأحد, فيفري 14 2010, 3:25:50 pm'],
            ['ddd, hA',                            'احد, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2 02 فيفري فيفري'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 الأحد احد أح'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '7 7 07'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['[the] DDDo [day of the year]',       'the 45 day of the year'],
            ['LT',                                 '15:25'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 فيفري 2010'],
            ['LLL',                                '14 فيفري 2010 15:25'],
            ['LLLL',                               'الأحد 14 فيفري 2010 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 فيفري 2010'],
            ['lll',                                '14 فيفري 2010 15:25'],
            ['llll',                               'احد 14 فيفري 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
});

test('format month', function (assert) {
    var expected = 'جانفي جانفي_فيفري فيفري_مارس مارس_أفريل أفريل_ماي ماي_جوان جوان_جويلية جويلية_أوت أوت_سبتمبر سبتمبر_أكتوبر أكتوبر_نوفمبر نوفمبر_ديسمبر ديسمبر'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'الأحد احد أح_الإثنين اثنين إث_الثلاثاء ثلاثاء ثلا_الأربعاء اربعاء أر_الخميس خميس خم_الجمعة جمعة جم_السبت سبت سب'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ثوان', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'دقيقة',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'دقيقة',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 دقائق',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 دقائق',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ساعة',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ساعة',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ساعات',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ساعات',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ساعات',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'يوم',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'يوم',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 أيام',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'يوم',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 أيام',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 أيام',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'شهر',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'شهر',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'شهر',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 أشهر',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 أشهر',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 أشهر',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'شهر',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 أشهر',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'سنة',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 سنوات',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'سنة',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 سنوات',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'في ثوان',  'prefix');
    assert.equal(moment(0).from(30000), 'منذ ثوان', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'منذ ثوان',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'في ثوان', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'في 5 أيام', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'اليوم على الساعة 12:00',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'اليوم على الساعة 12:25',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'اليوم على الساعة 13:00',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'غدا على الساعة 12:00',      'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'اليوم على الساعة 11:00',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'أمس على الساعة 12:00',     'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2016, 1, 4]).format('w ww wo'), '5 05 5', 'Feb 4 2016 should be week 5');
    assert.equal(moment([2016,  0,  6]).format('w ww wo'), '1 01 1', 'Jan  6 2016 should be week 1');
    assert.equal(moment([2016,  0,  7]).format('w ww wo'), '1 01 1', 'Jan  7 2016 should be week 1');
    assert.equal(moment([2016,  0, 13]).format('w ww wo'), '2 02 2', 'Jan 13 2016 should be week 2');
    assert.equal(moment([2016,  0, 14]).format('w ww wo'), '2 02 2', 'Jan 14 2016 should be week 2');
});

})));


;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

function each(array, callback) {
    var i;
    for (i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

function objectKeys(obj) {
    if (Object.keys) {
        return Object.keys(obj);
    } else {
        // IE8
        var res = [], i;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                res.push(i);
            }
        }
        return res;
    }
}

// Pick the first defined of two or three arguments.

function defineCommonLocaleTests(locale, options) {
    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

    test('meridiem invariant', function (assert) {
        var h, m, t1, t2;
        for (h = 0; h < 24; ++h) {
            for (m = 0; m < 60; m += 15) {
                t1 = moment.utc([2000, 0, 1, h, m]);
                t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                        'meridiem at ' + t1.format('HH:mm'));
            }
        }
    });

    test('date format correctness', function (assert) {
        var data, tokens;
        data = moment.localeData()._longDateFormat;
        tokens = objectKeys(data);
        each(tokens, function (srchToken) {
            // Check each format string to make sure it does not contain any
            // tokens that need to be expanded.
            each(tokens, function (baseToken) {
                // strip escaped sequences
                var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                assert.equal(false, !!~format.indexOf(srchToken),
                        'contains ' + srchToken + ' in ' + baseToken);
            });
        });
    });

    test('month parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr') {
            // I can't fix it :(
            expect(0);
            return;
        }
        function tester(format) {
            var r;
            r = moment(m.format(format), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower strict');
        }

        for (i = 0; i < 12; ++i) {
            m = moment([2015, i, 15, 18]);
            tester('MMM');
            tester('MMM.');
            tester('MMMM');
            tester('MMMM.');
        }
    });

    test('weekday parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr' || locale === 'az' || locale === 'ro') {
            // tr, az: There is a lower-case letter (ı), that converted to
            // upper then lower changes to i
            // ro: there is the letter ț which behaves weird under IE8
            expect(0);
            return;
        }
        function tester(format) {
            var r, baseMsg = 'weekday ' + m.weekday() + ' fmt ' + format + ' ' + m.toISOString();
            r = moment(m.format(format), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower strict');
        }

        for (i = 0; i < 7; ++i) {
            m = moment.utc([2015, 0, i + 1, 18]);
            tester('dd');
            tester('ddd');
            tester('dddd');
        }
    });
}

function setupDeprecationHandler(test, moment$$1, scope) {
    test._expectedDeprecations = null;
    test._observedDeprecations = null;
    test._oldSupress = moment$$1.suppressDeprecationWarnings;
    moment$$1.suppressDeprecationWarnings = true;
    test.expectedDeprecations = function () {
        test._expectedDeprecations = arguments;
        test._observedDeprecations = [];
    };
    moment$$1.deprecationHandler = function (name, msg) {
        var deprecationId = matchedDeprecation(name, msg, test._expectedDeprecations);
        if (deprecationId === -1) {
            throw new Error('Unexpected deprecation thrown name=' +
                    name + ' msg=' + msg);
        }
        test._observedDeprecations[deprecationId] = 1;
    };
}

function teardownDeprecationHandler(test, moment$$1, scope) {
    moment$$1.suppressDeprecationWarnings = test._oldSupress;

    if (test._expectedDeprecations != null) {
        var missedDeprecations = [];
        each(test._expectedDeprecations, function (deprecationPattern, id) {
            if (test._observedDeprecations[id] !== 1) {
                missedDeprecations.push(deprecationPattern);
            }
        });
        if (missedDeprecations.length !== 0) {
            throw new Error('Expected deprecation warnings did not happen: ' +
                    missedDeprecations.join(' '));
        }
    }
}

function matchedDeprecation(name, msg, deprecations) {
    if (deprecations == null) {
        return -1;
    }
    for (var i = 0; i < deprecations.length; ++i) {
        if (name != null && name === deprecations[i]) {
            return i;
        }
        if (msg != null && msg.substring(0, deprecations[i].length) === deprecations[i]) {
            return i;
        }
    }
    return -1;
}

/*global QUnit:false*/

var test = QUnit.test;

var expect = QUnit.expect;



function localeModule (name, lifecycle) {
    QUnit.module('locale:' + name, {
        setup : function () {
            moment.locale(name);
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        teardown : function () {
            moment.locale('en');
            teardownDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
    defineCommonLocaleTests(name, -1, -1);
}

localeModule('ar-ly');

var months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر'
];

test('parse', function (assert) {
    var tests = months, i;
    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
    }
    for (i = 0; i < 12; i++) {
        equalTest(tests[i], 'MMM', i);
        equalTest(tests[i], 'MMM', i);
        equalTest(tests[i], 'MMMM', i);
        equalTest(tests[i], 'MMMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'الأحد، فبراير 14 2010، 3:25:50 م'],
            ['ddd, hA',                            'أحد، 3م'],
            ['M Mo MM MMMM MMM',                   '2 2 02 فبراير فبراير'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 الأحد أحد ح'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '8 8 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'م م'],
            ['[the] DDDo [day of the year]',       'the 45 day of the year'],
            ['LT',                                 '15:25'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/\u200f2/\u200f2010'],
            ['LL',                                 '14 فبراير 2010'],
            ['LLL',                                '14 فبراير 2010 15:25'],
            ['LLLL',                               'الأحد 14 فبراير 2010 15:25'],
            ['l',                                  '14/\u200f2/\u200f2010'],
            ['ll',                                 '14 فبراير 2010'],
            ['lll',                                '14 فبراير 2010 15:25'],
            ['llll',                               'أحد 14 فبراير 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
});

test('format month', function (assert) {
    var expected = months, i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM'), expected[i], expected[i]);
        assert.equal(moment([2011, i, 1]).format('MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '44 ثانية', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'دقيقة واحدة',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'دقيقة واحدة',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  'دقيقتان',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 دقيقة',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ساعة واحدة',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ساعة واحدة',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  'ساعتان',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ساعات',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ساعة',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'يوم واحد',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'يوم واحد',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  'يومان',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'يوم واحد',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 أيام',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 يومًا',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'شهر واحد',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'شهر واحد',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'شهر واحد',       '43 days = a month');
        assert.equal(m.clone().local().valueOf(), m.valueOf(),
                'zone(' + z + ':00) to local failed to keep utc time (implicit)');
    }
});

})));


;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

function each(array, callback) {
    var i;
    for (i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

function objectKeys(obj) {
    if (Object.keys) {
        return Object.keys(obj);
    } else {
        // IE8
        var res = [], i;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                res.push(i);
            }
        }
        return res;
    }
}

// Pick the first defined of two or three arguments.

function defineCommonLocaleTests(locale, options) {
    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

    test('meridiem invariant', function (assert) {
        var h, m, t1, t2;
        for (h = 0; h < 24; ++h) {
            for (m = 0; m < 60; m += 15) {
                t1 = moment.utc([2000, 0, 1, h, m]);
                t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                        'meridiem at ' + t1.format('HH:mm'));
            }
        }
    });

    test('date format correctness', function (assert) {
        var data, tokens;
        data = moment.localeData()._longDateFormat;
        tokens = objectKeys(data);
        each(tokens, function (srchToken) {
            // Check each format string to make sure it does not contain any
            // tokens that need to be expanded.
            each(tokens, function (baseToken) {
                // strip escaped sequences
                var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                assert.equal(false, !!~format.indexOf(srchToken),
                        'contains ' + srchToken + ' in ' + baseToken);
            });
        });
    });

    test('month parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr') {
            // I can't fix it :(
            expect(0);
            return;
        }
        function tester(format) {
            var r;
            r = moment(m.format(format), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower strict');
        }

        for (i = 0; i < 12; ++i) {
            m = moment([2015, i, 15, 18]);
            tester('MMM');
            tester('MMM.');
            tester('MMMM');
            tester('MMMM.');
        }
    });

    test('weekday parsing correctness', function (assert) {
        var i, m;

        if (locale === 'tr' || locale === 'az' || locale === 'ro') {
            // tr, az: There is a lower-case letter (ı), that converted to
            // upper then lower changes to i
            // ro: there is the letter ț which behaves weird under IE8
            expect(0);
            return;
        }
        function tester(format) {
            var r, baseMsg = 'weekday ' + m.weekday() + ' fmt ' + format + ' ' + m.toISOString();
            r = moment(m.format(format), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg);
            r = moment(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper');
            r = moment(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower');

            r = moment(m.format(format), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' strict');
            r = moment(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper strict');
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower strict');
        }

        for (i = 0; i < 7; ++i) {
            m = moment.utc([2015, 0, i + 1, 18]);
            tester('dd');
            tester('ddd');
            tester('dddd');
        }
    });
}

function setupDeprecationHandler(test, moment$$1, scope) {
    test._expectedDeprecations = null;
    test._observedDeprecations = null;
    test._oldSupress = moment$$1.suppressDeprecationWarnings;
    moment$$1.suppressDeprecationWarnings = true;
    test.expectedDeprecations = function () {
        test._expectedDeprecations = arguments;
        test._observedDeprecations = [];
    };
    moment$$1.deprecationHandler = function (name, msg) {
        var deprecationId = matchedDeprecation(name, msg, test._expectedDeprecations);
        if (deprecationId === -1) {
            throw new Error('Unexpected deprecation thrown name=' +
                    name + ' msg=' + msg);
        }
        test._observedDeprecations[deprecationId] = 1;
    };
}

function teardownDeprecationHandler(test, moment$$1, scope) {
    moment$$1.suppressDeprecationWarnings = test._oldSupress;

    if (test._expectedDeprecations != null) {
        var missedDeprecations = [];
        each(test._expectedDeprecations, function (deprecationPattern, id) {
            if (test._observedDeprecations[id] !== 1) {
                missedDeprecations.push(deprecationPattern);
            }
        });
        if (missedDeprecations.length !== 0) {
            throw new Error('Expected deprecation warnings did not happen: ' +
                    missedDeprecations.join(' '));
        }
    }
}

function matchedDeprecation(name, msg, deprecations) {
    if (deprecations == null) {
        return -1;
    }
    for (var i = 0; i < deprecations.length; ++i) {
        if (name != null && name === deprecations[i]) {
            return i;
        }
        if (msg != null && msg.substring(0, deprecations[i].length) === deprecations[i]) {
            return i;
        }
    }
    return -1;
}

/*global QUnit:false*/

var test = QUnit.test;

var expect = QUnit.expect;

function module$1 (name, lifecycle) {
    QUnit.module(name, {
        setup : function () {
            moment.locale('en');
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'core');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        teardown : function () {
            teardownDeprecationHandler(test, moment, 'core');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
}

module$1('zones', {
    'setup': function () {
        test.expectedDeprecations('moment().zone');
    }
});

test('set zone', function (assert) {
    var zone = moment();

    zone.zone(0);
    assert.equal(zone.zone(), 0, 'should be able to set the zone to 0');

    zone.zone(60);
    assert.equal(zone.zone(), 60, 'should be able to set the zone to 60');

    zone.zone(-60);
    assert.equal(zone.zone(), -60, 'should be able to set the zone to -60');
});

test('set zone shorthand', function (assert) {
    var zone = moment();

    zone.zone(1);
    assert.equal(zone.zone(), 60, 'setting the zone to 1 should imply hours and convert to 60');

    zone.zone(-1);
    assert.equal(zone.zone(), -60, 'setting the zone to -1 should imply hours and convert to -60');

    zone.zone(15);
    assert.equal(zone.zone(), 900, 'setting the zone to 15 should imply hours and convert to 900');

    zone.zone(-15);
    assert.equal(zone.zone(), -900, 'setting the zone to -15 should imply hours and convert to -900');

    zone.zone(16);
    assert.equal(zone.zone(), 16, 'setting the zone to 16 should imply minutes');

    zone.zone(-16);
    assert.equal(zone.zone(), -16, 'setting the zone to -16 should imply minutes');
});

test('set zone with string', function (assert) {
    var zone = moment();

    zone.zone('+00:00');
    assert.equal(zone.zone(), 0, 'set the zone with a timezone string');

    zone.zone('2013-03-07T07:00:00-08:00');
    assert.equal(zone.zone(), 480, 'set the zone with a string that does not begin with the timezone');

    zone.zone('2013-03-07T07:00:00+0100');
    assert.equal(zone.zone(), -60, 'set the zone with a string that uses the +0000 syntax');

    zone.zone('2013-03-07T07:00:00+02');
    assert.equal(zone.zone(), -120, 'set the zone with a string that uses the +00 syntax');

    zone.zone('03-07-2013T07:00:00-08:00');
    assert.equal(zone.zone(), 480, 'set the zone with a string with a non-ISO 8601 date');
});

test('change hours when changing the zone', function (assert) {
    var zone = moment.utc([2000, 0, 1, 6]);

    zone.zone(0);
    assert.equal(zone.hour(), 6, 'UTC 6AM should be 6AM at +0000');

    zone.zone(60);
    assert.equal(zone.hour(), 5, 'UTC 6AM should be 5AM at -0100');

    zone.zone(-60);
    assert.equal(zone.hour(), 7, 'UTC 6AM should be 7AM at +0100');
});

test('change minutes when changing the zone', function (assert) {
    var zone = moment.utc([2000, 0, 1, 6, 31]);

    zone.zone(0);
    assert.equal(zone.format('HH:mm'), '06:31', 'UTC 6:31AM should be 6:31AM at +0000');

    zone.zone(30);
    assert.equal(zone.format('HH:mm'), '06:01', 'UTC 6:31AM should be 6:01AM at -0030');

    zone.zone(-30);
    assert.equal(zone.format('HH:mm'), '07:01', 'UTC 6:31AM should be 7:01AM at +0030');

    zone.zone(1380);
    assert.equal(zone.format('HH:mm'), '07:31', 'UTC 6:31AM should be 7:31AM at +1380');
});

test('distance from the unix epoch', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA),
        zoneC = moment(zoneA),
        zoneD = moment(zoneA),
        zoneE = moment(zoneA);

    zoneB.utc();
    assert.equal(+zoneA, +zoneB, 'moment should equal moment.utc');

    zoneC.zone(-60);
    assert.equal(+zoneA, +zoneC, 'moment should equal moment.zone(-60)');

    zoneD.zone(480);
    assert.equal(+zoneA, +zoneD, 'moment should equal moment.zone(480)');

    zoneE.zone(1000);
    assert.equal(+zoneA, +zoneE, 'moment should equal moment.zone(1000)');
});

test('update offset after changing any values', function (assert) {
    var oldOffset = moment.updateOffset,
        m = moment.utc([2000, 6, 1]);

    moment.updateOffset = function (mom, keepTime) {
        if (mom.__doChange) {
            if (+mom > 962409600000) {
                mom.zone(120, keepTime);
            } else {
                mom.zone(60, keepTime);
            }
        }
    };

    assert.equal(m.format('ZZ'), '+0000', 'should be at +0000');
    assert.equal(m.format('HH:mm'), '00:00', 'should start 12AM at +0000 timezone');

    m.__doChange = true;
    m.add(1, 'h');

    assert.equal(m.format('ZZ'), '-0200', 'should be at -0200');
    assert.equal(m.format('HH:mm'), '23:00', '1AM at +0000 should be 11PM at -0200 timezone');

    m.subtract(1, 'h');

    assert.equal(m.format('ZZ'), '-0100', 'should be at -0100');
    assert.equal(m.format('HH:mm'), '23:00', '12AM at +0000 should be 11PM at -0100 timezone');

    moment.updateOffset = oldOffset;
});

test('getters and setters', function (assert) {
    var a = moment([2011, 5, 20]);

    assert.equal(a.clone().zone(120).year(2012).year(), 2012, 'should get and set year correctly');
    assert.equal(a.clone().zone(120).month(1).month(), 1, 'should get and set month correctly');
    assert.equal(a.clone().zone(120).date(2).date(), 2, 'should get and set date correctly');
    assert.equal(a.clone().zone(120).day(1).day(), 1, 'should get and set day correctly');
    assert.equal(a.clone().zone(120).hour(1).hour(), 1, 'should get and set hour correctly');
    assert.equal(a.clone().zone(120).minute(1).minute(), 1, 'should get and set minute correctly');
});

test('getters', function (assert) {
    var a = moment.utc([2012, 0, 1, 0, 0, 0]);

    assert.equal(a.clone().zone(120).year(),  2011, 'should get year correctly');
    assert.equal(a.clone().zone(120).month(),   11, 'should get month correctly');
    assert.equal(a.clone().zone(120).date(),    31, 'should get date correctly');
    assert.equal(a.clone().zone(120).hour(),    22, 'should get hour correctly');
    assert.equal(a.clone().zone(120).minute(),   0, 'should get minute correctly');

    assert.equal(a.clone().zone(-120).year(),  2012, 'should get year correctly');
    assert.equal(a.clone().zone(-120).month(),    0, 'should get month correctly');
    assert.equal(a.clone().zone(-120).date(),     1, 'should get date correctly');
    assert.equal(a.clone().zone(-120).hour(),     2, 'should get hour correctly');
    assert.equal(a.clone().zone(-120).minute(),   0, 'should get minute correctly');

    assert.equal(a.clone().zone(-90).year(),  2012, 'should get year correctly');
    assert.equal(a.clone().zone(-90).month(),    0, 'should get month correctly');
    assert.equal(a.clone().zone(-90).date(),     1, 'should get date correctly');
    assert.equal(a.clone().zone(-90).hour(),     1, 'should get hour correctly');
    assert.equal(a.clone().zone(-90).minute(),  30, 'should get minute correctly');
});

test('from', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA).zone(720),
        zoneC = moment(zoneA).zone(360),
        zoneD = moment(zoneA).zone(-690),
        other = moment(zoneA).add(35, 'm');

    assert.equal(zoneA.from(other), zoneB.from(other), 'moment#from should be the same in all zones');
    assert.equal(zoneA.from(other), zoneC.from(other), 'moment#from should be the same in all zones');
    assert.equal(zoneA.from(other), zoneD.from(other), 'moment#from should be the same in all zones');
});

test('diff', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA).zone(720),
        zoneC = moment(zoneA).zone(360),
        zoneD = moment(zoneA).zone(-690),
        other = moment(zoneA).add(35, 'm');

    assert.equal(zoneA.diff(other), zoneB.diff(other), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other), zoneC.diff(other), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other), zoneD.diff(other), 'moment#diff should be the same in all zones');

    assert.equal(zoneA.diff(other, 'minute', true), zoneB.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'minute', true), zoneC.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'minute', true), zoneD.diff(other, 'minute', true), 'moment#diff should be the same in all zones');

    assert.equal(zoneA.diff(other, 'hour', true), zoneB.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'hour', true), zoneC.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'hour', true), zoneD.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
});

test('unix offset and timestamp', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA).zone(720),
        zoneC = moment(zoneA).zone(360),
        zoneD = moment(zoneA).zone(-690);

    assert.equal(zoneA.unix(), zoneB.unix(), 'moment#unix should be the same in all zones');
    assert.equal(zoneA.unix(), zoneC.unix(), 'moment#unix should be the same in all zones');
    assert.equal(zoneA.unix(), zoneD.unix(), 'moment#unix should be the same in all zones');

    assert.equal(+zoneA, +zoneB, 'moment#valueOf should be the same in all zones');
    assert.equal(+zoneA, +zoneC, 'moment#valueOf should be the same in all zones');
    assert.equal(+zoneA, +zoneD, 'moment#valueOf should be the same in all zones');
});

test('cloning', function (assert) {
    assert.equal(moment().zone(120).clone().zone(),   120, 'explicit cloning should retain the zone');
    assert.equal(moment().zone(-120).clone().zone(), -120, 'explicit cloning should retain the zone');
    assert.equal(moment(moment().zone(120)).zone(),   120, 'implicit cloning should retain the zone');
    assert.equal(moment(moment().zone(-120)).zone(), -120, 'implicit cloning should retain the zone');
});

test('start of / end of', function (assert) {
    var a = moment.utc([2010, 1, 2, 0, 0, 0]).zone(450);

    assert.equal(a.clone().startOf('day').hour(), 0, 'start of day should work on moments with a zone');
    assert.equal(a.clone().startOf('day').minute(), 0, 'start of day should work on moments with a zone');
    assert.equal(a.clone().startOf('hour').minute(), 0, 'start of hour should work on moments with a zone');

    assert.equal(a.clone().endOf('day').hour(), 23, 'end of day should work on moments with a zone');
    assert.equal(a.clone().endOf('day').minute(), 59, 'end of day should work on moments with a zone');
    assert.equal(a.clone().endOf('hour').minute(), 59, 'end of hour should work on moments with a zone');
});

test('reset zone with moment#utc', function (assert) {
    var a = moment.utc([2012]).zone(480);

    assert.equal(a.clone().hour(),      16, 'different zone should have different hour');
    assert.equal(a.clone().utc().hour(), 0, 'calling moment#utc should reset the offset');
});

test('reset zone with moment#local', function (assert) {
    var a = moment([2012]).zone(480);

    assert.equal(a.clone().local().hour(), 0, 'calling moment#local should reset the offset');
});

test('toDate', function (assert) {
    var zoneA = new Date(),
        zoneB = moment(zoneA).zone(720).toDate(),
        zoneC = moment(zoneA).zone(360).toDate(),
        zoneD = moment(zoneA).zone(-690).toDate();

    assert.equal(+zoneA, +zoneB, 'moment#toDate should output a date with the right unix timestamp');
    assert.equal(+zoneA, +zoneC, 'moment#toDate should output a date with the right unix timestamp');
    assert.equal(+zoneA, +zoneD, 'moment#toDate should output a date with the right unix timestamp');
});

test('same / before / after', function (assert) {
    var zoneA = moment().utc(),
        zoneB = moment(zoneA).zone(120),
        zoneC = moment(zoneA).zone(-120);

    assert.ok(zoneA.isSame(zoneB), 'two moments with different offsets should be the same');
    assert.ok(zoneA.isSame(zoneC), 'two moments with different offsets should be the same');

    assert.ok(zoneA.isSame(zoneB, 'hour'), 'two moments with different offsets should be the same hour');
    assert.ok(zoneA.isSame(zoneC, 'hour'), 'two moments with different offsets should be the same hour');

    zoneA.add(1, 'hour');

    assert.ok(zoneA.isAfter(zoneB), 'isAfter should work with two moments with different offsets');
    assert.ok(zoneA.isAfter(zoneC), 'isAfter should work with two moments with different offsets');

    assert.ok(zoneA.isAfter(zoneB, 'hour'), 'isAfter:hour should work with two moments with different offsets');
    assert.ok(zoneA.isAfter(zoneC, 'hour'), 'isAfter:hour should work with two moments with different offsets');

    zoneA.subtract(2, 'hour');

    assert.ok(zoneA.isBefore(zoneB), 'isBefore should work with two moments with different offsets');
    assert.ok(zoneA.isBefore(zoneC), 'isBefore should work with two moments with different offsets');

    assert.ok(zoneA.isBefore(zoneB, 'hour'), 'isBefore:hour should work with two moments with different offsets');
    assert.ok(zoneA.isBefore(zoneC, 'hour'), 'isBefore:hour should work with two moments with different offsets');
});

test('add / subtract over dst', function (assert) {
    var oldOffset = moment.updateOffset,
        m = moment.utc([2000, 2, 31, 3]);

    moment.updateOffset = function (mom, keepTime) {
        if (mom.clone().utc().month() > 2) {
            mom.zone(-60, keepTime);
        } else {
            mom.zone(0, keepTime);
        }
    };

    assert.equal(m.hour(), 3, 'should start at 00:00');

    m.add(24, 'hour');

    assert.equal(m.hour(), 4, 'adding 24 hours should disregard dst');

    m.subtract(24, 'hour');

    assert.equal(m.hour(), 3, 'subtracting 24 hours should disregard dst');

    m.add(1, 'day');

    assert.equal(m.hour(), 3, 'adding 1 day should have the same hour');

    m.subtract(1, 'day');

    assert.equal(m.hour(), 3, 'subtracting 1 day should have the same hour');

    m.add(1, 'month');

    assert.equal(m.hour(), 3, 'adding 1 month should have the same hour');

    m.subtract(1, 'month');

    assert.equal(m.hour(), 3, 'subtracting 1 month should have the same hour');

    moment.updateOffset = oldOffset;
});

test('isDST', function (assert) {
    var oldOffset = moment.updateOffset;

    moment.updateOffset = function (mom, keepTime) {
        if (mom.month() > 2 && mom.month() < 9) {
            mom.zone(-60, keepTime);
        } else {
            mom.zone(0, keepTime);
        }
    };

    assert.ok(!moment().month(0).isDST(),  'Jan should not be summer dst');
    assert.ok(moment().month(6).isDST(),   'Jul should be summer dst');
    assert.ok(!moment().month(11).isDST(), 'Dec should not be summer dst');

    moment.updateOffset = function (mom) {
        if (mom.month() > 2 && mom.month() < 9) {
            mom.zone(0);
        } else {
            mom.zone(-60);
        }
    };

    assert.ok(moment().month(0).isDST(),  'Jan should be winter dst');
    assert.ok(!moment().month(6).isDST(), 'Jul should not be winter dst');
    assert.ok(moment().month(11).isDST(), 'Dec should be winter dst');

    moment.updateOffset = oldOffset;
});

test('zone names', function (assert) {
    test.expectedDeprecations();
    assert.equal(moment().zoneAbbr(),   '', 'Local zone abbr should be empty');
    assert.equal(moment().format('z'),  '', 'Local zone formatted abbr should be empty');
    assert.equal(moment().zoneName(),   '', 'Local zone name should be empty');
    assert.equal(moment().format('zz'), '', 'Local zone formatted name should be empty');

    assert.equal(moment.utc().zoneAbbr(),   'UTC', 'UTC zone abbr should be UTC');
    assert.equal(moment.utc().format('z'),  'UTC', 'UTC zone formatted abbr should be UTC');
    assert.equal(moment.utc().zoneName(),   'Coordinated Universal Time', 'UTC zone abbr should be Coordinated Universal Time');
    assert.equal(moment.utc().format('zz'), 'Coordinated Universal Time', 'UTC zone formatted abbr should be Coordinated Universal Time');
});

test('hours alignment with UTC', function (assert) {
    assert.equal(moment().zone(120).hasAlignedHourOffset(), true);
    assert.equal(moment().zone(-180).hasAlignedHourOffset(), true);
    assert.equal(moment().zone(90).hasAlignedHourOffset(), false);
    assert.equal(moment().zone(-90).hasAlignedHourOffset(), false);
});

test('hours alignment with other zone', function (assert) {
    var m = moment().zone(120);

    assert.equal(m.hasAlignedHourOffset(moment().zone(180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(90)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-90)), false);

    m = moment().zone(90);

    assert.equal(m.hasAlignedHourOffset(moment().zone(180)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-180)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(30)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-30)), true);

    m = moment().zone(-60);

    assert.equal(m.hasAlignedHourOffset(moment().zone(180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(90)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-90)), false);

    m = moment().zone(25);

    assert.equal(m.hasAlignedHourOffset(moment().zone(-35)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(85)), true);

    assert.equal(m.hasAlignedHourOffset(moment().zone(35)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-85)), false);
});

test('parse zone', function (assert) {
    var m = moment('2013-01-01T00:00:00-13:00').parseZone();
    assert.equal(m.zone(), 13 * 60);
    assert.equal(m.hours(), 0);
});

test('parse zone static', function (assert) {
    var m = moment.parseZone('2013-01-01T00:00:00-13:00');
    assert.equal(m.zone(), 13 * 60);
    assert.equal(m.hours(), 0);
});

test('parse zone with more arguments', function (assert) {
    test.expectedDeprecations();
    var m;
    m = moment.parseZone('2013 01 01 05 -13:00', 'YYYY MM DD HH ZZ');
    assert.equal(m.format(), '2013-01-01T05:00:00-13:00', 'accept input and format');
    m = moment.parseZone('2013-01-01-13:00', 'YYYY MM DD ZZ', true);
    assert.equal(m.isValid(), false, 'accept input, format and strict flag');
    m = moment.parseZone('2013-01-01-13:00', ['DD MM YYYY ZZ', 'YYYY MM DD ZZ']);
    assert.equal(m.format(), '2013-01-01T00:00:00-13:00', 'accept input and array of formats');
});

test('parse zone with a timezone from the format string', function (assert) {
    var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY ZZ #####').parseZone();

    assert.equal(m.zone(), 4 * 60);
});

test('parse zone without a timezone included in the format string', function (assert) {
    var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY').parseZone();

    assert.equal(m.zone(), -11 * 60);
});

test('timezone format', function (assert) {
    assert.equal(moment().zone(-60).format('ZZ'), '+0100', '-60 -> +0100');
    assert.equal(moment().zone(-90).format('ZZ'), '+0130', '-90 -> +0130');
    assert.equal(moment().zone(-120).format('ZZ'), '+0200', '-120 -> +0200');

    assert.equal(moment().zone(+60).format('ZZ'), '-0100', '+60 -> -0100');
    assert.equal(moment().zone(+90).format('ZZ'), '-0130', '+90 -> -0130');
    assert.equal(moment().zone(+120).format('ZZ'), '-0200', '+120 -> -0200');
});

test('parse zone without a timezone', function (assert) {
    test.expectedDeprecations();
    var m1 = moment.parseZone('2016-02-01T00:00:00');
    var m2 = moment.parseZone('2016-02-01T00:00:00Z');
    var m3 = moment.parseZone('2016-02-01T00:00:00+00:00'); //Someone might argue this is not necessary, you could even argue that is wrong being here.
    var m4 = moment.parseZone('2016-02-01T00:00:00+0000'); //Someone might argue this is not necessary, you could even argue that is wrong being here.
    assert.equal(
        m1.format('M D YYYY HH:mm:ss ZZ'),
        '2 1 2016 00:00:00 +0000',
        'Not providing a timezone should keep the time and change the zone to 0'
    );
    assert.equal(
        m2.format('M D YYYY HH:mm:ss ZZ'),
        '2 1 2016 00:00:00 +0000',
        'Not providing a timezone should keep the time and change the zone to 0'
    );
    assert.equal(
        m3.format('M D YYYY HH:mm:ss ZZ'),
        '2 1 2016 00:00:00 +0000',
        'Not providing a timezone should keep the time and change the zone to 0'
    );
    assert.equal(
        m4.format('M D YYYY HH:mm:ss ZZ'),
        '2 1 2016 00:00:00 +0000',
        'Not providing a timezone should keep the time and change the zone to 0'
    );
});

})));
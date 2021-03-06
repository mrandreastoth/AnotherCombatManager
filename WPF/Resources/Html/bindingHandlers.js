﻿ko.bindingHandlers.abilityScore = {
    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            bonus = Math.floor(value / 2) - 5,
            sign = bonus > 0 ? '+' : '',
            text = value + ' (' + sign + bonus + ')';
        ko.bindingHandlers.text.update(element, function() { return text; });
    }
};

ko.bindingHandlers.powerFont = {
    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            power = _.isObject(value) && value || _.isString(value) && { Type: value, IsBasic: false } || {},
            types = power.Type && power.Type.split("###"),
            text = '';

        if (!_.size(power)) {
            return;
        }

        _.each(types, function (type) {
            var type = type.toLowerCase();
            switch (type) {
                case 'melee':
                    text += power.IsBasic ? 'm' : 'M';
                    break;

                case 'ranged':
                    text += power.IsBasic ? 'r' : 'R';
                    break;

                case 'close':
                case 'close burst':
                case 'close blast':
                    text += power.IsBasic ? 'c' : 'C';
                    break;

                case 'area':
                    text += power.IsBasic ? 'a' : 'A';
                    break;
            }
        });

        if (!text) {
            return;
        }

        ko.bindingHandlers.text.update(element, function() { return text + ' '; });
    }
};

ko.bindingHandlers.rechargeFont = {
    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            power = _.isObject(value) && value || _.isString(value) && { Usage: 'Recharge', UsageDetails: value } || {},
            recharge = power.Usage.toLowerCase() === 'recharge' && parseInt(power.UsageDetails, 10),
            text = '', i;

        if (!_.size(power) || !recharge || !(recharge >= 2 && recharge <= 6)) {
            return;
        }

        for (i = recharge; i <= 6; ++i) {
            text += i + ' ';
        }

        ko.bindingHandlers.text.update(element, function() { return text; });
    }
};

ko.bindingHandlers.stringArray = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var list = ko.utils.unwrapObservable(valueAccessor()),
            options = ko.utils.unwrapObservable(allBindingsAccessor()) || {},
            fallback = options.fallback || '',
            prefix = options.prefix || '',
            joined = list && list.length && prefix + list.join(', ') || '',
            text = joined || (fallback && prefix + fallback) || '';
        ko.bindingHandlers.text.update(element, function() { return text; });
    }
};

ko.bindingHandlers.kvpArray = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var list = ko.utils.unwrapObservable(valueAccessor()),
            options = ko.utils.unwrapObservable(allBindingsAccessor()) || {},
            min = options.min || 1,
            valuePrefix = options.valuePrefix || ' ',
            fallback = options.fallback || '',
            text = [];

            _.each(list, function (kvp) {
                var key = kvp.Key || '',
                    val = kvp.Value && kvp.Value >= min && valuePrefix + kvp.Value || '';
                if (key) {
                    text.push(key + val);
                }
            });

            ko.bindingHandlers.text.update(element, function() { return text.join(', ') });
    }
};

ko.bindingHandlers.commaNum = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var num = ko.utils.unwrapObservable(valueAccessor()),
            options = ko.utils.unwrapObservable(allBindingsAccessor()) || {},
            prefix = options.prefix || '',
            postfix = options.postfix || '',
            text = StatblockHelpers.toCommaNum(num, options.signed);

        ko.bindingHandlers.text.update(element, function() { return prefix + text + postfix; });
    }
};

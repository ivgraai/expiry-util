import { i18n } from '../Dictionary';
import '../../common/String.extension';
import validate from 'validate.js';
import Utility from '../../common/Utility';

validate.validators.customDate = function(value: Date, options: any) {
    let earliest = ('now' == options.earliest) ? Utility.todayMidnigth() : new Date(0);
    return (value <= earliest) ? options.message : null;
  };

const constraints = {
    goods: {
        presence: {
            allowEmpty: false,
            message: '^' + i18n.pleaseEnterAnItem.capitalize() + '.'
        }
    },
    expiry: {
        customDate: {
            earliest: 'now',
            message: '^' + i18n.expiryMustNotBeAPastDate.capitalize() + '.'
        }
    }
};

export default constraints;

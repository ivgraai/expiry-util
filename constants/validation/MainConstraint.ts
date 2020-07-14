import { i18n } from '../Dictionary';
import '../../common/String.extension';
import validate from 'validate.js';
import moment from 'moment';

validate.validators.customDate = function(value: Date, options: any) {
    let earliest = ('now' == options.earliest) ? moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) : new Date(0);
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

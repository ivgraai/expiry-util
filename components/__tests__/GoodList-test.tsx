import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';
import GoodList from '../GoodList';
import * as shortid from 'shortid';
import moment from 'moment';
import Utility from '../../common/Utility';

type DataSourceElementType = {id?: string, image: string | null, name: string, expiry: Date};
const EXPECTED_NAME: string = 'test data 1';

describe(`list goods`, () => {
    test(`with only one item expiring today, this is still visible`, () => {
        let ds: Array<DataSourceElementType> = [];
        ds.push({image: null, name: EXPECTED_NAME, expiry: Utility.todayMidnigth()});
        const { queryByText } = render(<GoodList dataSource={ds} />);
        expect(queryByText(EXPECTED_NAME.toUpperCase())).not.toBeNull();
    });
    test(`with three items - one of them is already expired, this should be invisible`, () => {
        var midnight = Utility.todayMidnigth();
        let ds: Array<DataSourceElementType> = [];
        ds.push({id: shortid.generate(), image: null, name: 'test data 3', expiry: midnight});
        ds.push({id: shortid.generate(), image: null, name: EXPECTED_NAME, expiry: moment(midnight).subtract(1, 'milliseconds').toDate()});
        ds.push({id: shortid.generate(), image: null, name: 'test data 2', expiry: new Date()});
        const { getAllByTestId } = render(<GoodList
            dataSource={ds}
            customNodesForTheItem={(_item: DataSourceElementType) => <Text testID='id'>{'dummy'}</Text>}
        />);
        expect(getAllByTestId('id')).toHaveLength(2);
    });
});

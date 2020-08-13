import React from "react";
import { fireEvent, waitFor, act } from "react-native-testing-library";
import { renderWithRedux, resolvedPermissionValue } from "../../services/TestHelper";
import MainScreen from "../MainScreen";
import { Alert } from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import DbHelper from "../../services/DbHelper";
import moment from "moment";

test(`Notifications::scheduleLocalNotificationAsync`, async () => {
    jest.spyOn(Alert, "alert").mockImplementationOnce(() => {
        return {
            alert: jest.fn()
        };
    });
    jest.spyOn(Permissions, "getAsync").mockResolvedValueOnce(resolvedPermissionValue(Permissions.PermissionStatus.GRANTED, true));
    jest.spyOn(Notifications, "scheduleLocalNotificationAsync")
        .mockResolvedValueOnce("b57040b8-6a4f-4f46-a6e0-0994739ffa6e")
        .mockResolvedValueOnce("4b9057f4-4820-4847-adcd-630d9bec9cfb")
        .mockResolvedValueOnce("85d0b9ed-c46d-47f2-8b73-6df01e87354f");
    jest.spyOn(DbHelper, "insertGood").mockImplementationOnce((_, onSuccess) => { onSuccess!(); });
    let navigation = {
        addListener: (_name: string, _callback: () => void) => () => {}
    };
    let expiry = moment().add(4, "days").set({hour: 0, minute: 0, second: 0, millisecond: 0});
    const { getByTestId } = renderWithRedux(<MainScreen navigation={navigation} />, {initialState: { expiry: expiry.toDate() }});
    let goods = "test item";
    fireEvent.changeText(getByTestId("goodsInput"), goods);
    fireEvent.press(getByTestId("addButton"));
    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
    let calls = Notifications.scheduleLocalNotificationAsync.mock.calls;
    var convert2Unix = (moment: moment.Moment) => moment.toDate().getTime();
    expect(calls[0][1].time).toBe(convert2Unix(expiry.subtract(3, "days")));
    expect(calls[1][1].time).toBe(convert2Unix(expiry.add(2, "days")));
    expect(calls[2][1].time).toBe(convert2Unix(expiry.add(1, "days")));
    expect(calls[2][0].title).toEqual(goods.toUpperCase());
    if ("MM/DD/YYYY" == moment().localeData().longDateFormat("L")) {
        expect(calls[2][0].body).toMatch(/^Best before: [0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/);
    } else {
        expect(calls[2][0].body).toMatch(/^Best before: /i);
    }
    act(() => Alert.alert.mock.calls[0][2][0].onPress());
});

import React from "react";
import renderer, { ReactTestRenderer, act } from "react-test-renderer";
import "../../common/String.extension";
import * as Dtos from "../../constants/Dtos";
import HttpClient from "../../services/HttpClient";
import DetailsScreen from "../DetailsScreen";

test(`trigger status of an approved request, all detail is on the screen`, async () => {
  HttpClient.checkStatus = jest.fn(
    () =>
      new Promise((resolve) =>
        resolve(
          new Dtos.GoodResponse(
            {
              address: {
                country: "England",
                city: "London",
                street: "Houses of Parliament, Westminster",
                postalCode: "SW1A 0AA",
                name: "House of Commons",
                region: "Greater London",
              },
              replyMessage: "Test reply message...",
              isAccepted: true,
              name: "test goods",
              expiry: new Date(0).toISOString(),
              myMessage: "Test my message...",
              username: "Test Username",
            },
            (_value: string) => new Date(_value)
          )
        )
      )
  );
  var tree!: ReactTestRenderer;
  await act(async () => {
    tree = renderer.create(
      <DetailsScreen navigation={{ getParam: jest.fn((_: string) => 1) }} />
    );
  });
  expect(tree.toJSON()).toMatchInlineSnapshot(`
    <RCTScrollView
      scrollEnabled={true}
    >
      <View>
        <View
          style={
            Object {
              "alignSelf": "center",
              "flex": 2,
              "justifyContent": "space-around",
              "marginTop": 5,
            }
          }
        >
          <Image
            onDownloaded={[Function]}
            source={
              Object {
                "uri": "undefinedundefined",
              }
            }
            style={
              Object {
                "aspectRatio": 1,
                "borderColor": "#AED59E",
                "borderRadius": 20,
                "borderWidth": 2,
                "width": "85%",
              }
            }
          />
        </View>
        <View
          style={
            Object {
              "alignSelf": "center",
              "flex": 2,
              "justifyContent": "space-around",
              "width": "85%",
            }
          }
        >
          <View
            style={
              Array [
                Object {
                  "borderColor": "#AED59E",
                  "borderRadius": 20,
                  "borderWidth": 2,
                },
                Object {
                  "marginTop": 5,
                },
              ]
            }
          >
            <View
              style={
                Object {
                  "backgroundColor": "#556B2F",
                  "borderBottomColor": "#AED59E",
                  "borderBottomWidth": 2,
                  "borderTopLeftRadius": 18,
                  "borderTopRightRadius": 18,
                }
              }
            >
              <Text
                style={
                  Object {
                    "color": "#AED59E",
                    "letterSpacing": 3,
                    "textAlign": "center",
                  }
                }
              >
                TEST GOODS
              </Text>
            </View>
            <Text
              style={
                Object {
                  "alignSelf": "center",
                  "color": "rgba(0, 0, 0, 0.9)",
                }
              }
            >
              1/1/1970
            </Text>
            <View
              style={
                Object {
                  "borderBottomColor": "#AED59E",
                  "borderBottomWidth": 2,
                  "marginBottom": 3,
                  "marginTop": 3,
                }
              }
            />
            <Text
              style={
                Object {
                  "alignSelf": "center",
                  "color": "rgba(0, 0, 0, 0.9)",
                }
              }
            >
              Test my message...
            </Text>
          </View>
          <Text
            style={
              Object {
                "color": "#556B2F",
                "fontSize": 36,
                "marginTop": 17.5,
                "textAlign": "center",
              }
            }
          >
            Your request has already been approved!
          </Text>
          <View
            style={
              Array [
                Object {
                  "borderColor": "#AED59E",
                  "borderRadius": 20,
                  "borderWidth": 2,
                },
                Object {
                  "marginTop": 5,
                },
              ]
            }
          >
            <View
              style={
                Object {
                  "backgroundColor": "#556B2F",
                  "borderBottomColor": "#AED59E",
                  "borderBottomWidth": 2,
                  "borderTopLeftRadius": 18,
                  "borderTopRightRadius": 18,
                }
              }
            >
              <Text
                style={
                  Object {
                    "color": "#AED59E",
                    "letterSpacing": 3,
                    "textAlign": "center",
                  }
                }
              >
                USERNAME
              </Text>
            </View>
            <Text
              style={
                Object {
                  "alignSelf": "center",
                  "color": "rgba(0, 0, 0, 0.9)",
                }
              }
            >
              Test Username
            </Text>
          </View>
          <View
            style={
              Array [
                Object {
                  "borderColor": "#AED59E",
                  "borderRadius": 20,
                  "borderWidth": 2,
                },
                Object {
                  "marginTop": 5,
                },
              ]
            }
          >
            <View
              style={
                Object {
                  "backgroundColor": "#556B2F",
                  "borderBottomColor": "#AED59E",
                  "borderBottomWidth": 2,
                  "borderTopLeftRadius": 18,
                  "borderTopRightRadius": 18,
                }
              }
            >
              <Text
                style={
                  Object {
                    "color": "#AED59E",
                    "letterSpacing": 3,
                    "textAlign": "center",
                  }
                }
              >
                ADDRESS
              </Text>
            </View>
            <Text
              style={
                Object {
                  "alignSelf": "center",
                  "color": "rgba(0, 0, 0, 0.9)",
                }
              }
            >
              SW1A 0AA England
    Greater London, London
    Houses of Parliament, Westminster
    House of Commons
            </Text>
          </View>
          <View
            style={
              Array [
                Object {
                  "borderColor": "#AED59E",
                  "borderRadius": 20,
                  "borderWidth": 2,
                },
                Array [
                  Object {
                    "marginTop": 5,
                  },
                  Object {
                    "marginBottom": 5,
                  },
                ],
              ]
            }
          >
            <View
              style={
                Object {
                  "backgroundColor": "#556B2F",
                  "borderBottomColor": "#AED59E",
                  "borderBottomWidth": 2,
                  "borderTopLeftRadius": 18,
                  "borderTopRightRadius": 18,
                }
              }
            >
              <Text
                style={
                  Object {
                    "color": "#AED59E",
                    "letterSpacing": 3,
                    "textAlign": "center",
                  }
                }
              >
                REPLY
              </Text>
            </View>
            <Text
              style={
                Object {
                  "alignSelf": "center",
                  "color": "rgba(0, 0, 0, 0.9)",
                }
              }
            >
              Test reply message...
            </Text>
          </View>
        </View>
      </View>
    </RCTScrollView>
  `);
});

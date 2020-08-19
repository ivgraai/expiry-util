import React from 'react';
import renderer, { ReactTestRenderer, act } from 'react-test-renderer';
import '../../common/String.extension';
import * as Dtos from '../../constants/Dtos';
import HttpClient from '../../services/HttpClient';
import DetailsScreen from '../DetailsScreen';

test(`trigger status of an approved request, all detail is on the screen`, async () => {
  HttpClient.checkStatus = jest.fn(
    () =>
      new Promise((resolve) =>
        resolve(
          new Dtos.GoodResponse(
            {
              address: {
                country: 'England',
                city: 'London',
                street: 'Houses of Parliament, Westminster',
                postalCode: 'SW1A 0AA',
                name: 'House of Commons',
                region: 'Greater London',
              },
              replyMessage: 'Test reply message...',
              isAccepted: true,
              name: 'test goods',
              expiry: new Date(0).toISOString(),
              myMessage: 'Test my message...',
              username: 'Test Username',
            },
            (_value) => new Date(_value)
          )
        )
      )
  );
  var tree!: ReactTestRenderer;
  await act(async () => {
    tree = renderer.create(<DetailsScreen navigation={{ getParam: jest.fn((_: string) => 1) }} />);
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
              "width": "85%",
            }
          }
        >
          <Modal
            hardwareAccelerated={false}
            onRequestClose={[Function]}
            transparent={true}
            visible={false}
          >
            <View
              onLayout={[Function]}
              style={
                Object {
                  "flex": 1,
                  "overflow": "hidden",
                }
              }
            >
              <View>
                <View
                  style={
                    Object {
                      "zIndex": 9,
                    }
                  }
                >
                  <View
                    style={
                      Object {
                        "backgroundColor": "transparent",
                        "opacity": 0,
                      }
                    }
                  >
                    <View
                      style={
                        Object {
                          "bottom": 0,
                          "justifyContent": "center",
                          "left": 0,
                          "position": "absolute",
                          "top": 0,
                          "zIndex": 13,
                        }
                      }
                    >
                      <View
                        accessible={true}
                        focusable={true}
                        onClick={[Function]}
                        onResponderGrant={[Function]}
                        onResponderMove={[Function]}
                        onResponderRelease={[Function]}
                        onResponderTerminate={[Function]}
                        onResponderTerminationRequest={[Function]}
                        onStartShouldSetResponder={[Function]}
                      />
                    </View>
                    <View
                      style={
                        Object {
                          "bottom": 0,
                          "justifyContent": "center",
                          "position": "absolute",
                          "right": 0,
                          "top": 0,
                          "zIndex": 13,
                        }
                      }
                    >
                      <View
                        accessible={true}
                        focusable={true}
                        onClick={[Function]}
                        onResponderGrant={[Function]}
                        onResponderMove={[Function]}
                        onResponderRelease={[Function]}
                        onResponderTerminate={[Function]}
                        onResponderTerminationRequest={[Function]}
                        onStartShouldSetResponder={[Function]}
                      />
                    </View>
                    <View
                      style={
                        Object {
                          "alignItems": "center",
                          "flexDirection": "row",
                          "transform": Array [
                            Object {
                              "translateX": 0,
                            },
                          ],
                          "width": 0,
                        }
                      }
                    >
                      <View
                        onMoveShouldSetResponder={[Function]}
                        onMoveShouldSetResponderCapture={[Function]}
                        onResponderEnd={[Function]}
                        onResponderGrant={[Function]}
                        onResponderMove={[Function]}
                        onResponderReject={[Function]}
                        onResponderRelease={[Function]}
                        onResponderStart={[Function]}
                        onResponderTerminate={[Function]}
                        onResponderTerminationRequest={[Function]}
                        onStartShouldSetResponder={[Function]}
                        onStartShouldSetResponderCapture={[Function]}
                        style={
                          Object {
                            "alignItems": "center",
                            "backgroundColor": "transparent",
                            "height": 0,
                            "justifyContent": "center",
                            "overflow": "hidden",
                            "width": 0,
                          }
                        }
                      >
                        <View
                          renderToHardwareTextureAndroid={true}
                          style={
                            Object {
                              "transform": Array [
                                Object {
                                  "scale": 1,
                                },
                                Object {
                                  "translateX": 0,
                                },
                                Object {
                                  "translateY": 0,
                                },
                              ],
                            }
                          }
                        >
                          <View
                            onLayout={[Function]}
                            style={
                              Object {
                                "height": 0,
                                "width": 0,
                              }
                            }
                          >
                            <Image
                              source={
                                Object {
                                  "uri": "undefinedundefined",
                                }
                              }
                              style={
                                Object {
                                  "height": 0,
                                  "width": 0,
                                }
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={
                        Array [
                          Object {
                            "bottom": 0,
                            "position": "absolute",
                            "zIndex": 9,
                          },
                          Object {},
                        ]
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <View
            accessible={true}
            focusable={true}
            isTVSelectable={true}
            onClick={[Function]}
            onResponderGrant={[Function]}
            onResponderMove={[Function]}
            onResponderRelease={[Function]}
            onResponderTerminate={[Function]}
            onResponderTerminationRequest={[Function]}
            onStartShouldSetResponder={[Function]}
            style={
              Object {
                "flex": 1,
                "justifyContent": "center",
                "opacity": 1,
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
                }
              }
            />
          </View>
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

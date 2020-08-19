import React, { Component } from 'react';
import { Image, ImageBackground, Modal, TouchableHighlight } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import ImageViewer from 'react-native-image-zoom-viewer';

// https://www.npmjs.com/package/react-native-expo-cached-image
export default class CachedImage extends Component {
  state = {
    imgURI: '',
    zooming: false
  }
  async componentDidMount() {
    const filesystemURI = await this.getImageFilesystemKey(this.props.source.uri);
    await this.loadImage(filesystemURI, this.props.source.uri);
  }
  async componentDidUpdate(prevProps) {
    if (this.props.source.uri === prevProps.source.uri) {
      return;
    }
    const filesystemURI = await this.getImageFilesystemKey(this.props.source.uri);
    await this.loadImage(filesystemURI, this.props.source.uri);
  }
  async getImageFilesystemKey(remoteURI: string | null) {
    if (null == remoteURI) {
      return undefined;
    }
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      remoteURI
    );
    return `${FileSystem.cacheDirectory}${hashed}`;
  }
  async loadImage(filesystemURI: string | undefined, remoteURI: string) {
    if (!filesystemURI) {
      return;
    }
    try {
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        this.setState({
          imgURI: filesystemURI
        });
        return;
      }
      const imageObject = await FileSystem.downloadAsync(
        remoteURI,
        filesystemURI
      );
      this.setState({
        imgURI: imageObject.uri
      });
      this.props.onDownloaded(imageObject.uri);
    } catch (err) {
      // console.log('Image loading error:', err);
      this.setState({imgURI: remoteURI});
    }
  }
  render() {
    var placeholder = require('../assets/images/icon.png');
    if (this.props.isBackground) {
      return (
        <ImageBackground
          {...this.props}
          source={this.state.imgURI ? {uri: this.state.imgURI} : placeholder}
        >
          {this.props.children}
        </ImageBackground>);
    } else {
      return (<>
        <Modal visible={this.state.zooming} transparent={true}>
          <ImageViewer imageUrls={[{url: this.state.imgURI}]} onCancel={() => this.setState({zooming: false})} enableSwipeDown={true}/>
        </Modal>
        <TouchableHighlight onPress={() => this.setState({zooming: true})}>
          <Image
            {...this.props}
            source={this.state.imgURI ? {uri: this.state.imgURI} : placeholder}
          />
        </TouchableHighlight>
      </>);
    }
  }
}

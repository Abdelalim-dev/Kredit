# Readme
## MinSDK for Android must be API 21 (5.0)#
- 98% of the market share
- It is the min requirement for RN encrypted storage

## Light mode is forced in the current version
Check the following commit (44b0ef0)

## Issue: Definition of 'MLKText' must be imported from module 'MLKitTextRecognitionCommon.MLKText' before it is required
Add following imports (**Every time to do a pod install**) into `"Pods/Development Pods/react-native-camera/RN/TextDetectorManager.m"`
```
@import MLKitTextRecognition;
@import MLKitTextRecognitionCommon;
```
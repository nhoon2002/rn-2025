# RN Course for Beginners 2025

## HTML to React Native Component Mapping
https://reactnative.dev/docs/components-and-apis

| HTML/Web | React Native |
|----------|-------------|
| `<div>` | `<View><SafeAreaView>` (flex by default, flex-direction: column) |
| `<div style="overflow:scroll;">` | `<ScrollView>` (flex by default, flex-direction: column) |
| `<p>`, `<span>` `<h1><h2>,...,` | `<Text>` |
| `<button>`, `<a>` | `<TouchableOpacity>`, `<TouchableHighlight>`, `<TouchableWithoutFeedback>` |
| Loader | `<ActivityIndicator>` |

## Event Handling
| Web | React Native |
|-----|-------------|
| `onClick` | `onPress` |

## Lists
Mappable list (large count) => `<FlatList>` with props:
- `data`
- `renderItem`
- `keyExtractor`

## Images
<Image/>, <ImageBackground/> :source (No support for svg without special package), :style

## Modal
import { Modal } from 'react-native'
<Modal/>

## Alerts
import { Alert } from 'react-native'
Alert.alert()

## Switch
import {Switch} from 'react-native'
<Switch/> :trackColor (false|true: hex string), :thumbColor (hex string), :onValueChange (fn), :value (bool)

## StatusBar
import { StatusBar } from 'expo-status-bar'

# react-native-quick-scroll [![npm version](https://img.shields.io/npm/v/react-native-quick-scroll.svg?style=flat)](https://www.npmjs.com/package/react-native-quick-scroll)

React Native FlatList component for scrolling through large lists using the scrollbar thumb

# Demo

![Demo gif](https://github.com/farshed/react-native-quick-scroll/blob/master/demo/rec.gif?raw=true)

# Installation

Install with npm
```
npm install --save react-native-quick-scroll
```
Or install with Yarn
```
yarn add react-native-quick-scroll
```

# Usage

```
import QuickScrollList from 'react-native-quick-scroll';
```
```
<QuickScrollList
	keyExtractor={(asset, index) => String(asset.id)}
	data={dataArray}
	renderItem={this.renderItem}
	itemHeight={60}
	viewportHeight={ScreenHeight - TabHeight}
/>
```

# Props

Inherits all valid [FlatList props](https://facebook.github.io/react-native/docs/flatlist#props), except `ref` and `showsVerticalScrollIndicator`. Also accepts the following props:

| Prop | Type | Default Value | Description | Required |
|-----|-----|-----|-----|-----|
| `itemHeight` | `number` | | Height of an item in the FlatList | Yes |
| `viewportHeight` | `number` | | Height of the FlatList area visible on screen at a given time | Yes |
| `thumbHeight` | `number` | `80` | Height of the scroll bar thumb | No |
| `touchAreaWidth` | `number` | `25` | Width of the touchable area around thumb | No |
| `flashDuration` | `number` | `40` | The time taken by the animation to display scroll bar on screen after the scroll has begun (in ms) | No |
| `flashOutDuration` | `number` | `1500` | The time after which scroll bar disappears (in ms) | No |
| `rightOffset` | `number` | `15` | The distance of the scroll bar from the right edge of screen | No |
| `thumbStyle` | `object` | | Style object for the scroll bar thumb | No |
| `scrollbarStyle` | `object` | | Style object for the scroll bar | No |
| `containerStyle` | `object` | | Style object for the parent container | No |
| `hiddenPosition` | `number` | `ScreenWidth + 15` | The offscreen position where the scroll bar thumb moves to after `flashOutDuration` | No |


# Todo (PRs welcome!)
- [ ] Add native driver support
- [ ] Rewrite with TypeScript
- [ ] Add support for FlatList ref
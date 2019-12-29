# react-native-quick-scroll [![npm version](https://img.shields.io/npm/v/react-native-quick-scroll.svg?style=flat)](https://www.npmjs.com/package/react-native-quick-scroll)

Customizable and performant React Native scroll bar component for quickly scrolling through large lists (based on FlatList)

## Demo

![Demo gif](https://github.com/farshed/react-native-quick-scroll/blob/master/demo/rec.gif?raw=true)

## Installation

Install with npm

```bash
npm install --save react-native-quick-scroll
```
Or install with Yarn

```bash
yarn add react-native-quick-scroll
```

## Usage

```js
import QuickScrollList from 'react-native-quick-scroll';
```

```js
<QuickScrollList
	keyExtractor={(item, index) => String(item.id)}
	data={dataArray}
	renderItem={this.renderItem}
	itemHeight={60}
	viewportHeight={ScreenHeight - TabHeight}
/>
```

## Props

Inherits all valid [FlatList props](https://facebook.github.io/react-native/docs/flatlist#props), except `ref` and `showsVerticalScrollIndicator`. Also accepts the following props:

| Prop | Type | Default Value | Description | Required |
|-----|-----|-----|-----|-----|
| `itemHeight` | `number` | | Height of an item in the FlatList | Yes |
| `viewportHeight` | `number` | | Height of the FlatList area visible on screen at a given time | Yes |
| `thumbHeight` | `number` | `80` | Height of the scroll bar thumb | No |
| `touchAreaWidth` | `number` | `25` | Width of the touchable area around thumb | No |
| `flashDuration` | `number` | `40` | The time taken by the animation to move scroll bar on-screen after the scroll has begun (in ms) | No |
| `flashOutDuration` | `number` | `1500` | The time after which scroll bar disappears (in ms) | No |
| `rightOffset` | `number` | `15` | The distance of the scroll bar from the right edge of screen | No |
| `thumbStyle` | `object` | | Style object for the scroll bar thumb (Don't pass `height` here, use the `thumbHeight` prop instead) | No |
| `scrollbarStyle` | `object` | | Style object for the scroll bar | No |
| `containerStyle` | `object` | | Style object for the parent container | No |
| `hiddenPosition` | `number` | `ScreenWidth + 15` | The off-screen position where the scroll bar thumb moves to after `flashOutDuration` | No |


## Todo (PRs welcome!)
- [x] Native driver support
- [ ] Use [react-native-interactable](https://github.com/wix/react-native-interactable) for better performance??
- [ ] Add typings with TypeScript
- [ ] Support for horizontal FlatList
- [ ] Add support for FlatList ref
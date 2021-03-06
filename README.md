# react-native-quick-scroll [![npm version](https://img.shields.io/npm/v/react-native-quick-scroll.svg?style=flat)](https://www.npmjs.com/package/react-native-quick-scroll)

Customizable and performant React Native scroll bar component for quickly scrolling through large lists (based on FlatList)

## Demo

![Demo gif](https://github.com/farshed/react-native-quick-scroll/blob/master/demo/rec.gif?raw=true)

## Installation

react-native-quick-scroll uses react-native-gesture-handler to handle pan gestures. Follow these guides to install react-native-gesture-handler in your project.

- [Expo](https://docs.expo.io/versions/latest/sdk/gesture-handler/#installation)
- [Vanilla React Native](https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html#installation)

Now, install react-native-quick scroll

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
| `thumbHeight` | `number` | `60` | Height of the scroll bar thumb | No |
| `touchAreaWidth` | `number` | `25` | Width of the touchable area that extends from the left edge of the thumb | No |
| `flashDuration` | `number` | `40` | The time taken by the animation to move scroll bar on-screen after the scroll has begun (in ms) | No |
| `flashOutDuration` | `number` | `2000` | The time after which scroll bar disappears (in ms) | No |
| `rightOffset` | `number` | `10` | The distance of the scroll bar from the right edge of screen | No |
| `thumbStyle` | `object` | | Style object for the scroll bar thumb (Don't pass `height` here, use the `thumbHeight` prop instead) | No |
| `scrollbarStyle` | `object` | | Style object for the scroll bar | No |
| `containerStyle` | `object` | | Style object for the parent container | No |
| `hiddenPosition` | `number` | `ScreenWidth + 10` | The off-screen position where the scroll bar thumb moves to after `flashOutDuration` | No |


## Todo (PRs welcome!)
- [x] Native driver support
- [x] Reimplement with Gesture Handler
- [ ] Replace Animated with Reanimated
- [ ] Add TypeScript typings
- [ ] Support for horizontal FlatList
- [x] Support for FlatList ref
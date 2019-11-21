import React from 'react';
import { View, FlatList, Animated, Dimensions, PanResponder } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

class FastScroll extends React.Component {
	constructor(props) {
		super(props);
		this.position = new Animated.ValueXY();
		this.flatlistRef = React.createRef();
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				const { thumbHeight, viewportHeight } = this.props;
				const positionY = this.position.__getValue().y;
				const availHeight = viewportHeight - thumbHeight;
				if (positionY >= 0 && positionY <= availHeight) {
					this.onThumbDrag(event, gesture);
				} else if (gesture.moveY > 0 && gesture.moveY < availHeight) {
					this.onThumbDrag(event, gesture);
				}
			}
		});
	}

	static defaultProps = {
		ref: ref => {},
		onScrollEndDrag: () => {},
		flashDuration: 40,
		flashOutDuration: 1500,
		rightOffset: 15,
		thumbHeight: 80,
		hiddenPosition: ScreenWidth + 15,
		touchAreaWidth: 25,
		thumbStyle: {},
		scrollbarStyle: {},
		containerStyle: {}
	};

	state = { scrollBar: new Animated.Value(ScreenWidth) };

	createRef = ref => {
		this.flatlistRef = ref;
		this.props.ref(ref);
	};

	onThumbDrag(event, gesture) {
		const { data, itemHeight, thumbHeight, viewportHeight } = this.props;
		// Animated.event([null, { dy: this.position.y }], { useNativeDriver: true })(event, gesture);
		this.position.setValue({ x: 0, y: gesture.moveY });
		const thumbOffset = this.position.__getValue().y;
		const lastIndex = Math.floor((data.length * itemHeight - viewportHeight) / itemHeight) + 1;
		const thumbPos = (thumbOffset / (viewportHeight - thumbHeight)).toFixed(3);
		let index = Math.floor(lastIndex * thumbPos);
		if (index > lastIndex) index = lastIndex;
		if (index < 0) index = 0;
		this.flatlistRef.scrollToIndex({
			index,
			viewPosition: 0,
			animated: true
		});
	}

	moveThumbOnScroll(e) {
		const { itemHeight, data, thumbHeight, viewportHeight } = this.props;
		const listHeight = data.length * itemHeight;
		const endPosition = listHeight - viewportHeight;
		const offsetY = e.nativeEvent.contentOffset.y;
		const diff = (viewportHeight - thumbHeight) / endPosition;
		this.position.setValue({ x: 0, y: offsetY * diff });
	}

	flashScrollBar = () => {
		const { flashDuration, rightOffset } = this.props;
		Animated.timing(this.state.scrollBar, {
			toValue: ScreenWidth - rightOffset,
			duration: flashDuration,
			useNativeDriver: true
		}).start();
	};

	onScroll = (event, gesture) => {
		this.flashScrollBar();
		this.moveThumbOnScroll(event);
		this.props.onScroll(event, gesture);
	};

	onScrollEnd = (event, gesture) => {
		const { flashDuration, flashOutDuration } = this.props;
		const flashOut = Animated.timing(this.state.scrollBar, {
			toValue: this.props.hiddenPosition,
			duration: flashDuration,
			useNativeDriver: true
		});
		setTimeout(() => flashOut.start(), flashOutDuration);
		this.props.onScrollEndDrag(event, gesture);
	};

	convertStyle(prop) {
		if (Array.isArray(prop)) {
			let propObj = {};
			prop.forEach(val => {
				propObj = { ...propObj, ...val };
			});
			return propObj;
		}
		return prop;
	}

	render() {
		//prettier-ignore
		const { thumbHeight, thumbStyle, scrollbarStyle, containerStyle, viewportHeight, touchAreaWidth } = this.props;
		const rightOffset = {
			transform: [
				{
					translateX: this.state.scrollBar
				}
			]
		};
		return (
			<View style={[styles.mainWrapper, this.convertStyle(containerStyle)]}>
				<FlatList
					{...this.props}
					ref={this.createRef}
					onScroll={this.onScroll}
					onScrollEndDrag={this.onScrollEnd}
					showsVerticalScrollIndicator={false}
				/>
				<Animated.View
					style={[
						styles.scrollBar,
						rightOffset,
						{ height: viewportHeight },
						this.convertStyle(scrollbarStyle)
					]}>
					<Animated.View
						style={[
							styles.touchArea,
							this.position.getLayout(),
							{ height: thumbHeight, width: touchAreaWidth }
						]}
						{...this.panResponder.panHandlers}>
						<Animated.View
							style={[styles.thumb, { height: thumbHeight }, this.convertStyle(thumbStyle)]}
						/>
					</Animated.View>
				</Animated.View>
			</View>
		);
	}
}

export default FastScroll;

const styles = {
	mainWrapper: {
		flex: 1
	},
	scrollBar: {
		position: 'absolute',
		width: 10,
		backgroundColor: 'transparent',
		alignItems: 'center'
	},
	touchArea: {
		backgroundColor: 'transparent',
		alignItems: 'center'
	},
	thumb: {
		width: 6,
		borderRadius: 4,
		backgroundColor: '#4C4C4C',
		elevation: 2
	}
};

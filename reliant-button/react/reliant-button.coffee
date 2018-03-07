import React, { Component } from 'react'
import anime from 'anime'
import './source/reliant-button.scss'

export default class ReliantButton extends React.Component
	constructor: (props) ->
		super(props);
		this.data =
			animation: undefined
			animation2: undefined
			animation3: undefined
			animation4: undefined
			animation5: undefined
			animation6: undefined
			animation7: undefined

	animateLine: (element, to) ->
		if this.animation
			this.animation.pause()

		this.animation = anime(
			targets: element
			d: 'M 0 1 Q 80 ' + (1 - to) + ' 160 1 L 160 36 Q 80 ' + (36 + to) + ' 0 36 Z'
			duration: 1200
			elasticity: 800
		)

	animateRadius: (element, to, move) ->
		if this.animation2
			this.animation2.pause()

		this.animation2 = anime(
			targets: element
			d: 'M 0 36 L 0 0 L 20 0 A ' + to + ' 10 0 1 1 20 36 Z'
			translateX: move
		)

	animatePadding: (element, to) ->
		if this.animation3
			this.animation3.pause()

		this.animation3 = anime(
			targets: element
			paddingRight: to
		)

	animateArrowIn: ->
		arrow = this.refs.arrow
		arrowTop = this.refs.arrow_top
		arrowBottom = this.refs.arrow_bottom

		if this.animation5
			this.animation5.pause()
		if this.animation4
			this.animation4.pause()

		this.animation4 = anime.timeline();

		this.animation4.add(
			targets: arrow
			opacity: 1
			duration: 800
		).add(
			targets: arrow
			width: 12
			offset: '-=700'
			duration: 800
		).add(
			targets: arrow
			right: -6
			offset: '-=800'
			duration: 800
		).add(
			targets: arrowTop
			rotate: 45
			width: 8
			offset: '-=600'
			duration: 800
		).add(
			targets: arrowBottom
			rotate: -45
			width: 8
			offset: '-=750'
			duration: 800
		)

	animateArrowOut: ->
		arrow = this.refs.arrow
		arrowTop = this.refs.arrow_top
		arrowBottom = this.refs.arrow_bottom

		if this.animation5
			this.animation5.pause()
		if this.animation4
			this.animation4.pause()

		this.animation5 = anime.timeline();

		this.animation5
		.add(
			targets: arrow
			opacity: 0
			duration: 800
		).add(
			targets: arrowBottom
			rotate: 0
			width: 2
			duration: 100
		).add(
			targets: arrowTop
			rotate: 0
			width: 2
			duration: 100
		).add(
			targets: arrow
			right: 10
			duration: 100
		).add(
			targets: arrow
			width: 2
			duration: 100
		)

	animatecircleIn: ->
		circle = this.refs.circle

		if this.animation6
			this.animation6.pause()
		if this.animation7
			this.animation7.pause()

		this.animation6 = anime.timeline();

		this.animation6.add(
			targets: circle
			opacity: 1
			duration: 100
		).add(
			targets: circle
			scale: 1
			duration: 800
		)

	animatecircleOut: ->
		circle = this.refs.circle

		if this.animation7
			this.animation7.pause()
		if this.animation6
			this.animation6.pause()

		this.animation7 = anime.timeline();

		this.animation7.add(
			targets: circle
			opacity: 0
			duration: 100
		).add(
			targets: circle
			scale: 0
			duration: 100
		)

	hover: ->
		component = this
		lineTop = component.refs.lineTop
		button = component.refs.button_wrapper

		component.animatePadding(button, 30)
		component.animateRadius(lineTop, 10, 0)
		component.animateArrowIn()
		component.animatecircleIn()

	out: ->
		component = this
		lineTop = component.refs.lineTop
		button = component.refs.button_wrapper

		component.animatePadding(button, 20)
		component.animateRadius(lineTop, 0, -30)
		component.animateArrowOut()
		component.animatecircleOut()

	componentDidMount: ->
		console.log this.data

	render: ->
		<a href="to" onMouseOver={(e) => this.hover(e)} onMouseOut={(e) => this.out(e)} className="reliant-button">
			<div ref="button_wrapper" className="reliant-button_wrapper">
				<div>{ this.props.children }</div>

				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="slick">
					<path d="M 0 36 L 0 0 L 20 0 A 0 10 0 1 1 20 36 Z" ref="lineTop" />
				</svg>

				<div ref="arrow" className="arrow">
					<span ref="arrow_top" className="arrow_top"></span>
					<span ref="arrow_bottom" className="arrow_bottom"></span>
				</div>

				<div ref="circle" style={{scale: 0}} className="circle"></div>
			</div>
		</a>


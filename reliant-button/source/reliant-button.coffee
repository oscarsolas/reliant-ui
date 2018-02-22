import anime from 'anime'

export default
	name: 'reliant-button'
	props: ['to']
	data: ->
		animation: undefined

	methods:
		animateLine: (element, to) ->
			if this.animation
				this.animation.pause()

			this.animation = anime(
				targets: element
				d: 'M 0 1 Q 80 ' + (1 - to) + ' 160 1 L 160 36 Q 80 ' + (36 + to) + ' 0 36 Z'
				duration: 1200
				elasticity: 800
			)

		hover: ->
			component = this
			lineTop = component.$refs.lineTop
			lineBottom = component.$refs.lineBottom

			component.animateLine(lineTop, 10)

		out: ->
			component = this
			lineTop = component.$refs.lineTop
			lineBottom = component.$refs.lineBottom

			component.animateLine(lineTop, 0)

	mounted: ->
		
import anime from 'anime'

export default
	name: 'reliant-button'
	props: ['to']

	methods:
		animateLine: (element, to) ->
			anime(
				targets: element
				d: 'M 0 1 Q 80 ' + to + ' 160 1'
				duration: 1800
				# easing: 'easeInOutBack'
				elasticity: 600
			)

		hover: ->
			component = this
			lineTop = component.$refs.lineTop
			lineBottom = component.$refs.lineBottom

			component.animateLine(lineTop, -5)
			component.animateLine(lineBottom, -5)

		out: ->
			component = this
			lineTop = component.$refs.lineTop
			lineBottom = component.$refs.lineBottom

			component.animateLine(lineTop, 1)
			component.animateLine(lineBottom, 1)

	mounted: ->
		
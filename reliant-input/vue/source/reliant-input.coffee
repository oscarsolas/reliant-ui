import anime from 'anime'

export default
	name: 'reliant-input'

	props: []

	data: ->
		value: ''
		placeholder: ''

	created: ->
		component = this
		component.placeholder = this.$slots.default[0].text
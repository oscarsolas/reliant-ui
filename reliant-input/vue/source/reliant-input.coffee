import anime from 'anime'

export default
	name: 'reliant-input'

	props: ['type']

	directives:
		focus:
			inserted: (el) -> el.focus()
		blur:
			inserted: (el) -> el.blur()

	data: ->
		value: ''
		placeholder: ''
		animation: undefined

	methods:
		animateIn: (element) ->
			placeholder = this.$refs.placeholder
			stain = this.$refs.placeholder__stain
			underline = this.$refs.underline

			anime(
				targets: underline
				scaleX: [0, 1]
				elasticity: 20
				duration: 1000
			)

			if this.value.length == 0
				if this.animation
					this.animation.pause()

				this.animation = anime.timeline();

				this.animation.add(
					targets: placeholder
					top: -4
					fontSize: '8px'
					duration: 1000
					elasticity: 400
					begin: ->
						placeholder.classList.add('active')
				).add(
					targets: stain
					width: '100%'
					duration: 1100
					offset: '-=800'
					elasticity: 600
				).add(
					targets: placeholder
					color: '#ffffff'
					offset: '-=1100'
					duration: 1100
				)

		animateOut: (element) ->
			placeholder = this.$refs.placeholder
			stain = this.$refs.placeholder__stain
			underline = this.$refs.underline

			anime(
				targets: underline
				scaleX: [1, 0]
				easing: 'easeOutQuint'
				duration: 900
			)

			if this.value.length == 0
				if this.animation
					this.animation.pause()

				this.animation = anime.timeline();

				this.animation.add(
					targets: stain
					width: 0
					duration: 400
					easing: 'easeInBack'
				).add(
					targets: placeholder
					color: '#bcbcbc'
					offset: '-=150'
					duration: 300
					easing: 'easeOutQuad'
				).add(
					targets: placeholder
					top: 14
					fontSize: '12px'
					duration: 800
					offset: '-=150'
					elasticity: 400
					begin: ->
						placeholder.classList.remove('active')
				)

	created: ->
		component = this
		component.placeholder = this.$slots.default[0].text
# import vue
import vue from 'vue'
import reliantButton from '../reliant-button.vue'

# component registration
vue.component 'reliant-button', reliantButton

# initialization vue
new vue ({
	el: '.content'
})

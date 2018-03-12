# import vue
import vue from 'vue'
import component from '../reliant-input.vue'

# component registration
vue.component 'reliant-input', component

# initialization vue
new vue ({
	el: '.content'
})

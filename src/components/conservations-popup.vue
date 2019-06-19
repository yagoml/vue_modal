<template>
	<window-popup
		ref="windowPop"
		@windowAction="windowAction"
		@windowCancel="windowCancel"
		width="540px"
		:title="popupTitle"
		:buttonsTexts="{ close: 'Cancelar', action: 'Salvar' }"
	>
		<div class="conservations-popup">
			<div class="search-box">
				<img src="/src/images/_2727928215600@2x.png" class="search">
				<input
					type="text"
					placeholder="Search here..."
					class="form-control"
					title="Search by number, code or description"
					v-on:keyup="search"
					v-model="searchText"
				>
			</div>

			<ul v-if="conservationStates.length">
				<li
					v-for="cs in conservationStates"
					v-bind:key="cs.id"
					v-bind:class="{ selected: isSelected(cs.id) }"
					@click="select(cs.id)"
				>
					<span>{{ cs.id }} - {{ cs.code }}</span> <span class="cs-desc color-grey">{{ cs.desc }}</span>
				</li>
			</ul>
			<div v-else style="padding: 0 32px;" class="color-grey">
				Nenhum resultado encontrado.
			</div>
		</div>
	</window-popup>
</template>

<script>
	import WindowPopup from './window-popup'

	export default {
		components: {
			WindowPopup
		},
		props: {
			selectedID: {
				default: 0,
				type: Number
			}
		},
		created() {

		},
		data() {
			return {
				mutatedSelectedID: 0,
				selected: null,
				searchText: ''
			}
		},
		methods: {
			open() {
				this.$store.dispatch('load-conservation-states', {})
				this.searchText = ''
				this.mutatedSelectedID = this.selectedID
				this.$refs.windowPop.open()
			},
			windowAction() {
				this.selected = this.conservationStates.find((cs) => {
					return cs.id == this.mutatedSelectedID
				})

				this.$emit('conservation-selected', this.selected)
			},
			search(event) {
				this.$store.dispatch('load-conservation-states')
				let text = event.target.value

				if(text.length) {
					this.$store.commit('set-conservation-states', this.filterConservations(text))
				}
			},
			select(id) {
				if(this.isSelected(id)) {
					this.mutatedSelectedID = 0
				} else {
					this.mutatedSelectedID = id
				}
			},
			isSelected(id) {
				return this.mutatedSelectedID == id
			},
			filterConservations(key) {
				return this.conservationStates.filter((cs) => {
					return cs.id == parseInt(key) ||
						cs.code.toLowerCase().match(key.toLowerCase()) ||
						cs.desc.toLowerCase().match(key.toLowerCase())
				})
			},
			windowCancel() {}
		},
		watch: {
			conservationStates: (newValue, oldValue) => {
				this.conservationStates = newValue
			}
		},
		computed: {
			popupTitle() {
				return 'Conservação'
			},
			conservationStates: {
				get: function () {
					return this.$store.getters.conservationStates
				}
			}
		}
	}
</script>

<style lang="less">
	.conservations-popup {
		ul {
			list-style-type: none;
			padding: 10px 30px;
			font-family: 'Open Sans';
			font-size: 14px;
			border-top: 1px solid #F5F5F5;
			border-bottom: 1px solid #F5F5F5;

			li {
				cursor: pointer;
				border-bottom: 1px solid #F5F5F5;
				padding: 7px 0;

				&.selected {
					background:#eee;
				}
			}
		}

		.search-box {
			padding: 0 25px;

			input {
				display: inline-block;
				width: ~"calc(100% - 42px)";
				margin-bottom: 10px;
			}

			.search {
				width: 32px;
				height: 32px;
			}
		}
		
		.cs-desc {
			float: right;
		}
	}
</style>
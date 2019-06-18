<template>
	<window-popup
		ref="windowPop"
		@windowAction="windowAction"
		@orderCancel="orderCancel()"
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
					v-on:keyup="search"
					v-model="searchText"
					class="form-control"
					title="Search by number, code or description"
				>
			</div>

			<ul v-if="conservationStates.length">
				<li
					v-for="cs in conservationStates"
					v-bind:key="cs.id"
					@click="select(cs.id)"
					v-bind:class="{ selected: isSelected(cs.id) }"
				>
					<span>{{ cs.id }} - {{ cs.code }}</span> <span class="cs-desc">{{ cs.desc }}</span>
				</li>
			</ul>
			<div v-else style="padding: 0 32px;">
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
		props: ['selectedID'],
		created() {

		},
		data() {
			return {
				selectedConservationID: 0,
				selectedConservation: null,
				searchText: ''
			}
		},
		methods: {
			open() {
				this.$store.dispatch('load-conservation-states', {})
				this.searchText = ''
				this.$refs.windowPop.open()

				if(this.selectedID) {
					this.selectedConservationID = this.selectedID
				} else {
					this.selectedConservationID = 0
				}
			},
			windowAction() {
				this.selectedConservation = this.conservationStates.find((cs) => {
					return cs.id == this.selectedConservationID
				})

				this.$emit('conservation-selected', this.selectedConservation)
			},
			orderCancel() {
				
			},
			search(event) {
				let text = event.target.value

				this.$store.dispatch('load-conservation-states', {})

				if(text.length) {
					let conservationStates = this.conservationStates.filter((cs) => {
						return cs.id == parseInt(text) || cs.code.toLowerCase().match(text.toLowerCase()) || cs.desc.toLowerCase().match(text.toLowerCase())
					})

					this.$store.commit('set-conservation-states', conservationStates)
				}
			},
			select(id) {
				if(this.isSelected(id)) {
					this.selectedConservationID = 0
				} else {
					this.selectedConservationID = id
				}
			},
			isSelected(id) {
				return this.selectedConservationID == id
			}
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
				},
				set: function (newValue) {

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
				padding: 3px 0;

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
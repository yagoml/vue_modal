<template>
	<div class="row new-user">
		<div class="container">
			<h3>Estado de Conservação</h3>

			<div class="row">
				<div class="col-xs-12" style="margin-bottom: 16px;">
					<button class="btn btn-default" @click="openPopup">Selecionar</button>
					<conservations-popup
						ref="ConservationsPopup"
						v-on:conservation-selected="conservationSelected"
						:selectedID="selectedID"
					></conservations-popup>
				</div>

				<div
					class="col-xs-12"
					id="selectedConservation"
				>
					<span
						v-if="selectedConservation"
						class="selected-alert alert-success"
					>
						{{ selectedConservation.id }}: {{ selectedConservation.code }} - {{ selectedConservation.desc }}

						<img src="/src/images/_2420899821792@2x.png" class="removeSelected" @click="removeSelected">
					</span>
					<span v-else>
						Nenhum Selecionado
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ConservationsPopup from './conservations-popup'

	export default {
		components: {
			ConservationsPopup
		},
		created() {

		},
		data() {
			return {
				selectedConservation: null
			}
		},
		methods: {
			openPopup() {
				this.$refs.ConservationsPopup.open()
			},
			conservationSelected(selectedConservation) {
				this.selectedConservation = selectedConservation
				if(selectedConservation) {
					this.selectedID = selectedConservation.id
				} else {
					this.selectedID = 0
				}
			},
			removeSelected() {
				this.selectedConservation = null
				this.selectedID = 0
			}
		},
		watch: {
			
		},
		computed: {
			
		}
	}
</script>

<style lang='less'>
	.selected-alert {
		padding: 5px;
		border-radius: 5px;
	}

	.removeSelected {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
</style>
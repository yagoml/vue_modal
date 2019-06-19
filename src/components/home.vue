<template>
	<div class="container home">
		<div class="row info">
			<span>Conservação:</span>
			<span v-if="selected">
				<span class="label label-success">
					{{ selected.id }}: {{ selected.code }} - {{ selected.desc }}
				</span>
				<img
					src="/src/images/_2420899821792@2x.png"
					class="removeSelected"
					@click="removeSelected"
					title="Remover Conservação selecionada"
				>
			</span>
			<span v-else class="label label-danger">
				Nenhuma Selecionada
			</span>
		</div>

		<div class="row">
			<button
				class="btn btn-primary"
				@click="openPopup"
				title="Abrir popup de seleção de Conservação"
			>{{ btnText }}</button>
		</div>

		<conservations-popup
			ref="ConservationsPopup"
			v-on:conservation-selected="conservationSelected"
			:selectedID="selectedID"
		></conservations-popup>

		<div class="row" style="margin-top: 30px;">
			<a href="https://github.com/yagoml/vue_modal/blob/master/README.md" target="blank">Documentação</a>
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
				selectedID: 0,
				selected: null,
				btnText: 'Selecionar'
			}
		},
		methods: {
			openPopup() {
				this.$refs.ConservationsPopup.open()
			},
			conservationSelected(selected) {
				if(selected) {
					this.selectConservation(selected)
				} else {
					this.removeSelected()
				}
			},
			removeSelected() {
				this.selected = null
				this.selectedID = 0
				this.btnText = 'Selecionar'
			},
			selectConservation(selected) {
				this.selected = selected
				this.selectedID = selected.id
				this.btnText = 'Alterar'
			}
		},
		watch: {
			
		},
		computed: {
			
		}
	}
</script>

<style lang='less'>
.home {
	.removeSelected {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}

	.info {
		margin-top: 30px;
		margin-bottom: 15px;
		font-size: 17px;
	}
}
</style>
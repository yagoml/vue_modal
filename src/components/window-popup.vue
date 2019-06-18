<template>
	<div class="window-popup" v-bind:style="visible">
		<div 
			id="windowContainer"
			v-bind:style="windowWidth"
		>
			<img src="/src/images/_2420899821792@2x.png" class="closeWindow" @click="close">
			<div id="windowTitle">{{ title }}</div>
			<div id="windowContent">
				<slot></slot>
			</div>
			<div id="windowButtons" v-if="!extraButtons.length">
				<a href="#" id="close" @click="close">{{ buttonsTexts.close }}</a>
				<button id="action" @click="action" class="btn-salvar">{{ buttonsTexts.action }}</button>
			</div>
			<div id="windowButtons" v-else>
				<button v-for="extraButtom in extraButtons"
					:key="extraButtom.text"
					:class="extraButtom.class"
					@click="extraBtnAction(extraButtom.trigger)"
				>{{ extraButtom.text }}</button>

				<a href="#" id="close" @click="close">{{ buttonsTexts.close }}</a>
				<button id="action" @click="action" class="btn btn-salvar">{{ buttonsTexts.action }}</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			width: {
				default: '50%',
				type: String
			},
			title: {
				default: '',
				type: String
			},
			extraButtons: {
				default() {
					return []
				},
				type: Array
			},
			buttonsTexts: {
				default() {
					return {
						close: 'Fechar',
						action: 'Confirmar'
					}
				},
				type: Object
			}
		},
		created() {

		},
		data() {
			return {
				visible: {
					display: 'none'
				},
				windowWidth: {
					width: 'auto'
				}
			}
		},
		methods: {
			open() {
				this.visible.display = 'flex'
				this.windowWidth.width = this.width
			},
			close() {
				this.visible.display = 'none'
				this.$emit('windowClosed')
			},
			action() {
				this.$emit('windowAction')
				this.close()
			},
			extraBtnAction(trigger) {
				this.$emit(trigger)
				this.close()
			}
		},
		computed: {
			
		}
	}
</script>

<style lang="less">
	.window-popup {
		display: none; /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		justify-content: center; /* horizontal center */
		align-items: center;     /* vertical center */
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: hidden; /* Enable scroll if needed */
		background-color: rgb(0,0,0); /* Fallback color */
		background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
		top: 0;
		left: 0;

		textarea {
			resize: vertical;
		}

		#windowContainer {
			background: #fff;
			height: auto;
			border: 1px solid #888;
			vertical-align: middle;
			width: fit-content;
			position: relative;
			border-radius: 10px;

			#windowTitle {
				padding: 10px 30px 0 30px;
				font-family: Ubuntu;
				font-size: 22px;
				margin-bottom: 10px;
			}

			#windowContent {
				margin-bottom: 15px;
			}

			/* The Close Button */
			.closeWindow {
				color: rgba(119, 119, 119, .7);
				float: right;
				font-weight: bold;
				opacity: 1;
				cursor: pointer;
				width: 28px;
				height: 28px;
				margin: 10px 25px 0 0;
			}

			#windowButtons {
				text-align: right;
				margin: 0 30px 20px 0;
				font-size: 14px;

				.btn-salvar {
					background-image: linear-gradient(to right, #F0424E , #F66B59);
					color: white;
					border-radius: 40px;
					padding: 2px 30px;
					border-color: transparent;
				}

				a {
					color: #8C8F94;
				}

				button {
					margin: 0 5px;
					
					&:nth-last-child(1) {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
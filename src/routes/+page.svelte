<script lang="ts">
	import { onMount } from "svelte";
	import Scene from "$lib/Scene";
		
	let canvas: HTMLCanvasElement;
	let value = $state('test');
	let scene: Scene;

	onMount(() => {
		resizeWindow();
		const gl = canvas.getContext('webgl2');
		if (!gl) {
			console.error('No WebGL2');
			return;
		}
		scene = new Scene(canvas, gl);
		scene.load().then(() => scene.render());
	});

	function resizeWindow() {
		const rect = document.querySelector('body')?.getBoundingClientRect();
		const panelWidth = document.querySelector('.controller')?.getBoundingClientRect().width || 0;

		if (rect !== undefined) {
			canvas.width = rect.width - panelWidth;
			canvas.height = rect.height;
			if (scene) scene.render();
		}
	}
</script>

<svelte:window onresize={resizeWindow} />

<div class="wrap">
	<canvas bind:this={canvas}></canvas>
	<div class="controller">
		<input type="text" bind:value={value} />
	</div>
</div>


<style>
	.wrap {
		display: flex;
	}
	canvas {
		flex: 1;
		display: block;
		padding: 0;
		margin: 0;
	}
	.controller {
		width: 280px;
		white-space: nowrap;
		padding: 16px;
		background-color: #1a1a1a;
	}
</style>
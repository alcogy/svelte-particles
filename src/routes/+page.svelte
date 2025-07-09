<script lang="ts">
	import { onMount } from "svelte";
	import Scene from "$lib/Scene";
		
	let canvas: HTMLCanvasElement;
	let value = $state('test');
	let scene: Scene;
	let timer: number = 0;
	let frame: number = $state(1);

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

	function startAnimation() {
		timer = setInterval(() => {
			scene.animation()
			frame++;
		}, 1000 / 30);
	}

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
		<p>Frame: {frame}</p>
		<div>
			<button class="btn" onclick={() => startAnimation()}>Start</button>
			<button class="btn" onclick={() => clearInterval(timer)}>Stop</button>
			<button class="btn" onclick={() => {scene.reset(); frame = 1;}}>Reset</button>
		</div>
		<div>
			<button class="btn" onclick={() => scene.resetCamera()}>ResetCamera</button>
		</div>
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
		padding: 16px;
		background-color: #1a1a1a;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
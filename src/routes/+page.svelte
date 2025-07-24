<script lang="ts">
	import { onMount } from "svelte";
	import Scene from "$lib/Scene";
		
	let canvas: HTMLCanvasElement;
	let emitterPosition = $state({ x: 0, y: 3, z: 0 });
	let scene: Scene;
	let timer: number = $state(0);
	let frame: number = $state(1);
	
	onMount(() => {
		resizeWindow();
		const gl = canvas.getContext('webgl2');
		if (!gl) {
			console.error('No WebGL2');
			return;
		}
		scene = new Scene(canvas, gl);
		scene.updateEmitter(emitterPosition);
		scene.reset();
		scene.load();
		// scene.load().then(() => scene.render());
	});

	function startAnimation() {
		if (timer !== 0) return;
		timer = setInterval(() => {
			scene.animation();
			frame++;
		}, 1000 / 30);
	}

	function stopAnimatioon() {
		clearInterval(timer);
		timer = 0;
	}

	function resetAnimation() {
		scene.reset();
		frame = 1;
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
		<h3>Emitter</h3>
		<div class="emitter">
			<div class="item">
				<span>x</span>
				<input
					type="number"
					bind:value={emitterPosition.x}
					onchange={() => scene.updateEmitter(emitterPosition)}
				 />
			</div>
			<div class="item">
				<span>y</span>
				<input
					type="number"
					bind:value={emitterPosition.y}
					onchange={() => scene.updateEmitter(emitterPosition)}
				 />
			</div>
			<div class="item">
				<span>z</span>
				<input
					type="number"
					bind:value={emitterPosition.z}
					onchange={() => scene.updateEmitter(emitterPosition)}
				 />
			</div>
		</div>
		<h3>Animation</h3>
		<div>Frame: {frame}</div>
		<div>
			<button class="btn" onclick={() => startAnimation()}>Start</button>
			<button class="btn" onclick={() => stopAnimatioon()}>Stop</button>
			<button class="btn" onclick={() => resetAnimation()}>Reset</button>
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
	.emitter {
		display: flex;
		gap: 12px;
	}
	.emitter .item {
		display: flex;
		gap: 4px;
	}
	h3 {
		margin-bottom: 4px;
	}
</style>
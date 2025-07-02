<script lang="ts">
	import { onMount } from "svelte";
	import { render } from "$lib/webgl";
		
	let canvas: HTMLCanvasElement;
	let gl: WebGL2RenderingContext | null;
	let screen: { width: number, height: number } = $state({ width: 0, height: 0 });

	$effect(() => {
		if (screen.width === 0 || screen.width === 0) return;
		
		gl = canvas.getContext('webgl2');
		if (!gl) {
			console.error('No WebGL2');
			return;
		}
		render(gl);
	});
	
	onMount(()=> {
		resizeWindow();
	});

	function resizeWindow() {
		const rect = document.querySelector('body')?.getBoundingClientRect();
		if (rect !== undefined) {
			screen.width = rect.width;
			screen.height = rect.height;
		}
	}
</script>

<svelte:window onresize={resizeWindow} />

<canvas
	width={screen.width}
	height={screen.height}
	bind:this={canvas}
></canvas>

<style>
	canvas {
		display: block;
		padding: 0;
		margin: 0;
	}
</style>
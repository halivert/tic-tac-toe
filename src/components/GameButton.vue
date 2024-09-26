<script setup lang="ts">
import { X, O, type Cell } from "@/types";

defineProps<{
	cell: Cell;
	turn: Exclude<Cell, "">;
	status?: "active" | "winning";
}>();
</script>

<template>
	<button
		:class="[
			'text-4xl aspect-square h-[25dvw] max-h-[25dvh] text-center',
			'rounded-lg dark:text-white',
			{ 'accent-red-500': cell === X },
			{ 'accent-teal-500': cell === O },
			{
				'bg-red-300 dark:bg-red-900': cell === X && status === 'active',
			},
			{
				'bg-teal-300 dark:bg-teal-900': cell === O && status === 'active',
			},
			{ 'bg-red-300 dark:bg-red-900': cell === X && status === 'winning' },
			{ 'bg-teal-300 dark:bg-red-900': cell === O && status === 'winning' },
			{
				'focus:bg-red-300 hover:bg-red-300 accent-red-800 dark:focus:bg-red-800 dark:hover:bg-red-800':
					turn === X && !cell,
			},
			{
				'focus:bg-teal-300 hover:bg-teal-300 accent-teal-800 dark:focus:bg-teal-800 dark:hover:bg-teal-800':
					turn === O && !cell,
			},
			{ 'bg-zinc-200 dark:bg-zinc-700': !cell || status === undefined },
		]"
		:disabled="Boolean(cell)"
	>
		{{ cell }}
	</button>
</template>

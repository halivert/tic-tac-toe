<script setup lang="ts">
import { ref, computed } from "vue";
import { winnerCoordinates } from "@/winnerCoordinates";
import GameButton from "./components/GameButton.vue";
import { X, O, type Cell } from "@/types";

const board = ref<Cell[][]>([
	["", "", ""],
	["", "", ""],
	["", "", ""],
]);

const turns = computed(() =>
	board.value.reduce(
		(current, row) =>
			current +
			row.reduce((current, cell) => current + (Boolean(cell) ? 1 : 0), 0),
		0
	)
);

const turn = computed(() => (turns.value % 2 ? O : X));

const winningCoordinates = computed(() => {
	if (turns.value < 5) return null;

	for (
		let winningCase = 0;
		winningCase < winnerCoordinates.length;
		winningCase++
	) {
		const [a, b, c] = winnerCoordinates[winningCase];

		const [a0, a1] = a;
		const [b0, b1] = b;
		const [c0, c1] = c;

		if (
			board.value[a0][a1] === board.value[b0][b1] &&
			board.value[b0][b1] === board.value[c0][c1] &&
			Boolean(board.value[a0][a1])
		) {
			return winnerCoordinates[winningCase];
		}
	}

	return null;
});

const winner = computed(() => {
	if (!winningCoordinates.value) return "";

	const coordinates = winningCoordinates.value[0];

	return board.value[coordinates[0]][coordinates[1]];
});

const draw = computed(() => !winner.value && turns.value === 9);

function update(i: number, j: number, turn: Cell) {
	if (winner.value || !turn || board.value[i][j]) return;

	board.value[i][j] = turn;
}

function restart() {
	board.value = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
}

function partOfWinningCoordinates(i: number, j: number): boolean {
	if (!winningCoordinates.value) return false;

	return winningCoordinates.value.some(([a, b]) => a === i && b === j);
}
</script>

<template>
	<div class="h-dvh w-prose max-w-full mx-auto py-3 grid dark:bg-zinc-900">
		<section class="place-self-center flex flex-col gap-3 relative">
			<div
				v-if="winner || draw"
				class="absolute inset-3 bg-white/50 dark:bg-zinc-800/40 rounded grid place-items-center"
			>
				<div
					class="bg-white dark:bg-zinc-900 dark:text-white py-4 px-8 rounded-sm flex gap-4 flex-col"
				>
					<p v-if="winner" class="text-4xl text-center">
						Ganador! <br />
						<strong>
							{{ winner }}
						</strong>
					</p>
					<p v-else-if="draw" class="text-4xl text-center">Tablas</p>

					<button
						class="px-2 py-1 bg-zinc-700 rounded text-white dark:text-black dark:bg-zinc-300"
						@click="restart"
					>
						Reiniciar
					</button>
				</div>
			</div>

			<div class="flex gap-3" v-for="(row, i) in board" :key="i">
				<GameButton
					v-for="(cell, j) in row"
					:key="`${i},${j}`"
					@click="update(i, j, turn)"
					:turn="turn"
					:cell="cell"
					:status="
						!winner
							? 'active'
							: partOfWinningCoordinates(i, j)
								? 'winning'
								: undefined
					"
				/>
			</div>
		</section>
	</div>
</template>

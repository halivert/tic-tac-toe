<script setup lang="ts">
import { ref, computed } from 'vue'
import { winnerCoordinates } from '@/winnerCoordinates'

const X = 'X'
const O = 'O'

const board = ref([
	['', '', ''],
	['', '', ''],
	['', '', '']
])

const turns = computed(() =>
	board.value.reduce(
		(current, row) => current + row.reduce((current, cell) => current + (Boolean(cell) ? 1 : 0), 0),
		0
	)
)

const turn = computed(() => (turns.value % 2 ? O : X))

const winningCoordinates = computed(() => {
	if (turns.value < 5) return null

	for (let winningCase = 0; winningCase < winnerCoordinates.length; winningCase++) {
		const [a, b, c] = winnerCoordinates[winningCase]

		const [a0, a1] = a
		const [b0, b1] = b
		const [c0, c1] = c

		if (
			board.value[a0][a1] === board.value[b0][b1] &&
			board.value[b0][b1] === board.value[c0][c1] &&
			Boolean(board.value[a0][a1])
		) {
			return winnerCoordinates[winningCase]
		}
	}

	return null
})

const winner = computed(() => {
	if (!winningCoordinates.value) return ''

	const coordinates = winningCoordinates.value[0]

	return board.value[coordinates[0]][coordinates[1]]
})

const draw = computed(() => !winner.value && turns.value === 9)

function update(i: number, j: number, turn: string) {
	if (winner.value) return

	board.value[i][j] = turn
}

function restart() {
	board.value = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	]
}

function partOfWinningCoordinates(i: number, j: number): boolean {
	if (!winningCoordinates.value) return false

	return winningCoordinates.value.some(([a, b]) => a === i && b === j)
}
</script>

<template>
	<div class="h-dvh w-prose max-w-full mx-auto py-3 grid">
		<section class="place-self-center flex flex-col gap-3 relative">
			<div
				v-if="winner || draw"
				class="absolute inset-3 bg-zinc-800/40 rounded grid place-items-center"
			>
				<div class="bg-white py-4 px-8 rounded-sm flex gap-4 flex-col">
					<p v-if="winner" class="text-4xl text-center">
						Ganador! <br />
						<strong>
							{{ winner }}
						</strong>
					</p>
					<p v-else-if="draw" class="text-4xl text-center">Tablas</p>

					<button class="px-2 py-1 bg-zinc-700 rounded text-white" @click="restart">
						Reiniciar
					</button>
				</div>
			</div>

			<div class="flex gap-3" v-for="(row, i) in board" :key="i">
				<button
					:class="[
						'text-4xl aspect-square h-[25dvw] max-h-[25dvh] text-center',
						'rounded-lg',
						{ 'bg-zinc-200': !cell },
						{ 'accent-red-500': cell === X },
						{ 'accent-teal-500': cell === O },
						{ 'bg-red-200': cell === X && !winner },
						{ 'bg-teal-200': cell === O && !winner },
						{ 'bg-red-600 text-white': cell === X && partOfWinningCoordinates(i, j) },
						{ 'bg-teal-600 text-white': cell === O && partOfWinningCoordinates(i, j) },
						{ 'focus:bg-red-50 hover:bg-red-50 accent-red-800': turn === X && !cell },
						{ 'focus:bg-teal-50 hover:bg-teal-50 accent-teal-800': turn === O && !cell }
					]"
					v-for="(cell, j) in row"
					:key="`${i},${j}`"
					@click="update(i, j, turn)"
				>
					{{ cell }}
				</button>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	const minLength = 4;
	const maxLength = 40;
	const genericServerError = 'server error: something went wrong. please try again in a moment.';

	let length = 12;
	let uppercase = true;
	let lowercase = true;
	let numbers = true;
	let symbols = true;

	let password = '';
	let errorMessage = '';
	let isGenerating = false;
	let copyMessage = '';
	let copyResetTimer: ReturnType<typeof setTimeout> | undefined;

	const hasSelectedOption = () => uppercase || lowercase || numbers || symbols;

	const normalizeLength = () => {
		if (Number.isNaN(length)) {
			length = minLength;
			return;
		}

		length = Math.max(minLength, Math.min(maxLength, Math.floor(length)));
	};

	const generatePassword = async () => {
		copyMessage = '';

		normalizeLength();

		if (!hasSelectedOption()) {
			errorMessage = 'select at least one character set.';
			return;
		}

		isGenerating = true;

		try {
			const response = await fetch('/api/generator', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					length,
					uppercase,
					lowercase,
					numbers,
					symbols
				})
			});

			if (!response.ok) {
				if (response.status >= 500) {
					errorMessage = genericServerError;
					return;
				}

				errorMessage = await response.text();
				return;
			}

			errorMessage = '';
			password = await response.text();
		} catch {
			errorMessage = 'Could not reach API. Make sure backend is running.';
		} finally {
			isGenerating = false;
		}
	};

	const copyPassword = async () => {
		if (!password) {
			return;
		}

		try {
			await navigator.clipboard.writeText(password);
			copyMessage = 'copied';
		} catch {
			copyMessage = 'clipboard blocked';
		}

		if (copyResetTimer) {
			clearTimeout(copyResetTimer);
		}

		copyResetTimer = setTimeout(() => {
			copyMessage = '';
		}, 1600);
	};
</script>

<main>
	<section class="terminal">
		<div class="terminal-bar">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="title">passgen@local</span>
			<a
				class="github-link"
				href="https://github.com/camescasse/passgen"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="View source on GitHub"
			>
				<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
					<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
						0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
						-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2
						-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.63
						7.63 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
						2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0
						1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
				</svg>
			</a>
		</div>

		<div class="terminal-body">
			<h1>Passgen</h1>
			<p class="subtitle">Generate secure passwords.</p>

			<form on:submit|preventDefault={generatePassword}>
				<label>
					length: {length} ({minLength}-{maxLength})
					<input
						type="range"
						bind:value={length}
						min={minLength}
						max={maxLength}
						step="1"
						on:change={normalizeLength}
					/>
				</label>

				<div class="toggles">
					<label><input type="checkbox" bind:checked={lowercase} /> lowercase</label>
					<label><input type="checkbox" bind:checked={uppercase} /> uppercase</label>
					<label><input type="checkbox" bind:checked={numbers} /> numbers</label>
					<label><input type="checkbox" bind:checked={symbols} /> symbols</label>
				</div>

				<button type="submit" disabled={isGenerating}>
					{isGenerating ? 'generating...' : 'generate password'}
				</button>
			</form>

			{#if errorMessage}
				<p class="response error">error: {errorMessage}</p>
			{:else if password}
				<button
					class="response password-output"
					class:copied={copyMessage === 'copied'}
					class:blocked={copyMessage === 'clipboard blocked'}
					type="button"
					on:click={copyPassword}
				>
					<span>$ {password}</span>
				</button>
			{/if}
		</div>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
		background: radial-gradient(circle at top left, #152b18 0%, #0a100b 45%, #060906 100%);
		color: #d4fbd7;
		font-family: 'Berkeley Mono', 'IBM Plex Mono', 'SFMono-Regular', Consolas, 'Liberation Mono',
			Menlo, monospace;
	}

	main {
		display: grid;
		place-items: center;
		min-height: 100vh;
		padding: 1.5rem;
	}

	.terminal {
		width: min(100%, 44rem);
		border: 1px solid #2b5b31;
		background: #050a05;
		box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55);
	}

	.terminal-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: #0d160f;
		border-bottom: 1px solid #2b5b31;
	}

	.dot {
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 50%;
		background: #2b5b31;
	}

	.title {
		margin-left: 0.5rem;
		font-size: 0.8rem;
		opacity: 0.75;
	}

	.github-link {
		margin-left: auto;
		color: #d4fbd7;
		opacity: 0.5;
		transition: opacity 150ms ease;
		display: flex;
		align-items: center;
	}

	.github-link:hover {
		opacity: 0.9;
	}

	.terminal-body {
		display: grid;
		gap: 1rem;
		padding: 1.25rem;
	}

	h1 {
		margin: 0;
		font-size: 1.2rem;
	}

	.subtitle {
		margin: 0;
		opacity: 0.8;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	label {
		display: grid;
		gap: 0.5rem;
	}

	input[type='range'] {
		width: 100%;
		accent-color: #7bcf83;
	}

	.toggles {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.6rem;
	}

	.toggles label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	input[type='checkbox'] {
		accent-color: #7bcf83;
	}

	button {
		padding: 0.7rem 0.9rem;
		border: 1px solid #7bcf83;
		background: transparent;
		color: #d4fbd7;
		font: inherit;
		cursor: pointer;
		text-transform: lowercase;
	}

	button:hover:enabled {
		background: #15311a;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.response {
		margin: 0;
		padding: 0.75rem;
		border: 1px solid #2b5b31;
		background: #020502;
		overflow-wrap: anywhere;
	}

	.password-output {
		position: relative;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;
		padding-bottom: 1.45rem;
		text-align: left;
		cursor: copy;
		text-transform: none;
	}

	.password-output::after {
		content: 'copy to clipboard';
		position: absolute;
		left: 0.75rem;
		bottom: 0.4rem;
		font-size: 0.75rem;
		opacity: 0.55;
		transition: opacity 120ms ease-in-out;
	}

	.password-output:hover::after,
	.password-output:focus-visible::after,
	.password-output.copied::after,
	.password-output.blocked::after {
		opacity: 0.75;
	}

	.password-output.copied::after {
		content: 'copied';
	}

	.password-output.blocked::after {
		content: 'clipboard blocked';
	}

	@media (hover: none) {
		.password-output::after {
			opacity: 0.8;
		}
	}

	.error {
		color: #f7afaf;
		border-color: #8d4a4a;
	}

	@media (max-width: 35rem) {
		.toggles {
			grid-template-columns: 1fr;
		}
	}
</style>

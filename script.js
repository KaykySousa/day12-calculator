const display = document.getElementById("display")
let calcRealized = false
let error = false

function input(value) {
	if ((value.match(/[^÷x+-]/g) && calcRealized) || error) {
		reset()
	}

	if (value.match(/[÷x+]/g) && !display.value) return

	if (display.value) {
		if (
			display.value.length >= 2 &&
			display.value[display.value.length - 2].match(/[÷x]/g) &&
			display.value[display.value.length - 1].match(/[-+]/g) &&
			value.match(/[÷x]/g)
		) {
			backspace()
		}

		if (
			(display.value[display.value.length - 1].match(/[÷x]/g) &&
				value.match(/[÷x]/g)) ||
			(display.value[display.value.length - 1].match(/[-+]/g) &&
				value.match(/[-+x÷]/g))
		) {
			backspace()
		}
	}

	if (value === ".") {
		const splittedExpression = display.value.split(/[÷x+-]/g)

		if (
			splittedExpression[splittedExpression.length - 1].indexOf(".") !==
			-1
		)
			return
	}

	calcRealized = false
	error = false

	display.value += value
}

function reset() {
	display.value = null
}

function backspace() {
	display.value = display.value.substring(0, display.value.length - 1)
}

function calc() {
	if (!display.value) return

	try {
		const expression = display.value.replace(
			/[÷x]/g,
			(char) => ({ "÷": "/", x: "*" }[char])
		)
		const result = parseFloat(eval(expression).toFixed(9))
		if (!Number.isFinite(result) || Number.isNaN(result)) {
			throw new Error("Error")
		}
		display.value = result
		calcRealized = true
	} catch (err) {
		error = true
		console.error(err)
		display.value = "ERROR"
	}
}

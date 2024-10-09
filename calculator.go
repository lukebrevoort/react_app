package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	fmt.Println(eval("2 + 3 * 4"))
	fmt.Println(eval("10 / 2 - 3"))
	fmt.Println(eval("5.5 + 4.5"))
}

func eval(expression string) string {
	tokens := tokenize(expression)
	result := evaluate(tokens)
	return fmt.Sprintf("%.2f", result)
}

func tokenize(expression string) []string {
	//iterates through each character in the expression and appends it into an array
	expression = strings.ReplaceAll(expression, " ", "")
	var tokens []string
	var current string
	for _, char := range expression {
		if char >= '0' && char <= '9' || char == '.' {
			current += string(char)
		} else {
			if current != "" {
				tokens = append(tokens, current)
				current = ""
			}
			tokens = append(tokens, string(char))
		}
	}
	if current != "" {
		tokens = append(tokens, current)
	}
	return tokens
}

func evaluate(tokens []string) float64 {
	// Takes in the token array and assigns them to numbers or operaters
	var numbers []float64
	var operators []string

	for _, token := range tokens {
		if num, err := strconv.ParseFloat(token, 64); err == nil {
			numbers = append(numbers, num)
		} else {
			for len(operators) > 0 && precedence(operators[len(operators)-1]) >= precedence(token) {
				//loops through each operator and number applying the operation from left to right
				applyOperation(&numbers, operators[len(operators)-1])
				operators = operators[:len(operators)-1]
			}
			operators = append(operators, token)
		}
	}
	//ensures it is left to right and there are now leftover operators
	for len(operators) > 0 {
		applyOperation(&numbers, operators[len(operators)-1])
		operators = operators[:len(operators)-1]
	}

	return numbers[0]
}

func precedence(op string) int {
	//makes sure multiply and divide go over plus and minus
	switch op {
	case "+", "-":
		return 1
	case "*", "/":
		return 2
	}
	return 0
}

func applyOperation(numbers *[]float64, op string) {
	//applies operation based on what is bettween them, assigning the numbers through a slice to a and b
	b, a := (*numbers)[len(*numbers)-1], (*numbers)[len(*numbers)-2]
	*numbers = (*numbers)[:len(*numbers)-2]
	switch op {
	case "+":
		*numbers = append(*numbers, a+b)
	case "-":
		*numbers = append(*numbers, a-b)
	case "*":
		*numbers = append(*numbers, a*b)
	case "/":
		*numbers = append(*numbers, a/b)
	}
}

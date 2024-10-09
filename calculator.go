package main

import (
	"fmt"
	"strconv"
	"strings"
)

func eval(expression string) string {
	tokens := tokenize(expression)
	result := evaluate(tokens)
	return fmt.Sprintf("%.2f", result)
}

func tokenize(expression string) []string {
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
	var numbers []float64
	var operators []string

	for _, token := range tokens {
		if num, err := strconv.ParseFloat(token, 64); err == nil {
			numbers = append(numbers, num)
		} else {
			for len(operators) > 0 && precedence(operators[len(operators)-1]) >= precedence(token) {
				applyOperation(&numbers, operators[len(operators)-1])
				operators = operators[:len(operators)-1]
			}
			operators = append(operators, token)
		}
	}

	for len(operators) > 0 {
		applyOperation(&numbers, operators[len(operators)-1])
		operators = operators[:len(operators)-1]
	}

	return numbers[0]
}

func precedence(op string) int {
	switch op {
	case "+", "-":
		return 1
	case "*", "/":
		return 2
	}
	return 0
}

func applyOperation(numbers *[]float64, op string) {
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

func main() {
	fmt.Println(eval("2 + 3 * 4"))  // Should print 14.00
	fmt.Println(eval("10 / 2 - 3")) // Should print 2.00
	fmt.Println(eval("5.5 + 4.5"))  // Should print 10.00
}

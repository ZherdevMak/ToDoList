import {ActionType, div, mul, numberReduser, sub, sum} from './Tasks'
test('sum of two numbers', () => {
    const a = 10
    const  b = 20
    const result = sum(a,b)
    expect(result).toBe(30)
})
test('substract of two numbers', () => {
    const a = 10
    const  b = 20
    const result = sub(a,b)
    expect(result).toBe(-10)
})
test('multiply of two numbers', () => {
    const a = 10
    const  b = 2
    const result = mul(a,b)
    expect(result).toBe(20)
})
test('divide of two numbers', () => {
    const a = 10
    const  b = 2
    const result = div(a,b)
    expect(result).toBe(5)
})
test('sum with numberRedusers', () => {
    const a:number = 1000
    const  action:ActionType = {
        type: 'SUM',
        num:300
    }
    const result = numberReduser(a,action)
    expect(result).toBe(1300)
})
test('sub with numberRedusers', () => {
    const a:number = 1000
    const  action:ActionType = {
        type: 'SUB',
        num:300
    }
    const result = numberReduser(a,action)
    expect(result).toBe(700)
})
test('mult with numberRedusers', () => {
    const a:number = 1000
    const  action:ActionType = {
        type: 'MULT',
        num:2
    }
    const result = numberReduser(a,action)
    expect(result).toBe(2000)
})
test('div with numberRedusers', () => {
    const a:number = 1000
    const  action:ActionType = {
        type: 'DIV',
        num:2
    }
    const result = numberReduser(a,action)
    expect(result).toBe(500)
})

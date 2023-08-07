import React from  'react'
import { userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age: 20, name: 'Bob', childrenCount: 2}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment children count', () => {
    const startState = {age: 20, name: 'Bob', childrenCount: 2}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
})
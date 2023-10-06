import uuid from 'react-uuid'

export function taskGenerator() {
   return uuid();
}

export const taskId = taskGenerator();
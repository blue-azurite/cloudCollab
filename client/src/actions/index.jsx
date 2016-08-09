export const FETCH_TEXT_INPUT = 'FETCH_TEXT_INPUT';

export function updateText(data) {
  return {
    type: FETCH_TEXT_INPUT,
    payload: data
  };
} 
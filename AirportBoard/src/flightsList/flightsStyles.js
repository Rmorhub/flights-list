export const terminalStyles = terminal => {
  const greenStyle = { color: '#63c745', border: '1px solid #63c745' };
  const blueStyle = { color: '#1eb7ee', border: '1px solid #1eb7ee' };
  if (terminal === 'A') return greenStyle;
  if (terminal === 'B') return greenStyle;
  if (terminal === 'D') return blueStyle;
};

export const btnActivities = {
  depAct: { dep: 'active', arr: 'disabled' },
  arrAct: { dep: 'disabled', arr: 'active' },
};

const fallbackCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  // eslint-disable-next-line functional/immutable-data
  textArea.style.top = '0';
  // eslint-disable-next-line functional/immutable-data
  textArea.style.left = '0';
  // eslint-disable-next-line functional/immutable-data
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textArea);
  }
};

export const copyToClipboard = async (text: string): Promise<void> => {
  if (!navigator.clipboard) {
    return fallbackCopyToClipboard(text);
  }

  return navigator.clipboard.writeText(text);
};

export default copyToClipboard;

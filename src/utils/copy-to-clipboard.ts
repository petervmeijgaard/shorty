const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
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

export const copyToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }

  await navigator.clipboard.writeText(text);
};

export default copyToClipboard;

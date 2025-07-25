module.exports = function detectIntent(message) {
  const text = message.toLowerCase();
  if (text.includes('apply') && text.includes('vendor')) {
    return 'vendor_application';
  }
  return 'general';
};

const escapeMsg = (msg) => msg
  .replace(/_/g, "\\_")
  .replace(/`/g, "\\`")
  .replace(/\./g, "\\.");

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

const abbreviateNumber = (number) => {
  number = parseInt(number) / Math.pow(10, 18); // Math.pow(10, 18) for handle strange response numbers
  const tier = Math.log10(number) / 3 | 0;

  if (tier === 0) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}

module.exports = {
  escapeMsg: escapeMsg,
  abbreviateNumber: abbreviateNumber
}
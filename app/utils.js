const escapeMsg = (msg) => msg
  .replace("_", "\\_")
  .replace("*", "\\*")
  .replace("`", "\\`")
  .replace(".", "\\.");

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

function abbreviateNumber(number){
  number = parseInt(number);
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
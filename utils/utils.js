export function validateAddress (addr) {
  if (addr.startsWith('cosmos1')) { return addr.length === 45 }
  if (addr.startsWith('like1')) { return addr.length === 43 }
  return false
}

export function getIscnPrefix (iscn) {
  return iscn.replace(/\/\d+$/g, '')
}

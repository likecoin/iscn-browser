export function validateAddress (addr) {
  console.log(addr)
  if (addr.startsWith('cosmos1')) { return addr.length === 45 }
  if (addr.startsWith('like1')) { return addr.length === 43 }
  return false
}

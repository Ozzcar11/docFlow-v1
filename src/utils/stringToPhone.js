export default (string) => {
  if (string && string.length > 6) {
    let phoneFormat = '## (###) ###-##-##'
    for (let i of string.split('')) {
      phoneFormat = phoneFormat.replace('#', i)
    }
    return phoneFormat
  } else return string
}
